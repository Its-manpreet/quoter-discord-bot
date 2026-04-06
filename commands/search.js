const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Fuse = require('fuse.js')
const quotes = require('../data/quotes.json');
const authors = require('../data/authors.json');

const tagIndex = new Map();
for (const quote of quotes) {
    for (let tag of quote.tags) {
				tag = tag.toLowerCase(); // Normalize tags to lowercase for case-insensitive matching
        if (!tagIndex.has(tag)) tagIndex.set(tag, []);
        tagIndex.get(tag).push(quote);
    }
}

const tagfuse = new Fuse(Array.from(tagIndex.keys()), { threshold: 0.3, includeScore: true, });
const authorfuse = new Fuse(authors, {keys: ['name'], threshold: 0.3, includeScore: true, });
const textfuse = new Fuse(quotes, {useTokenSearch: true, keys: ['content'], threshold: 0.4, includeScore: true, });

function getTaggedPool(pool, tags) {
    const tagList = tags.split(',').map(t => t.trim().toLowerCase());
    let ctags = [];
    for (const tag of tagList) {
        const correctTag = tagfuse.search(tag);
        if (correctTag.length === 0) return []; // Return empty array if no matching tag found
        ctags.push(correctTag[0].item);
        const taggedQuotes = tagIndex.get(correctTag[0].item);
        if (!taggedQuotes) return []; // Return empty array if any tag is not found
        pool = pool.filter(quote => taggedQuotes.includes(quote));
    }
    return [pool, ctags];
}

function getAuthorPool(pool, author) {
    const correctAuthor = authorfuse.search(author);
    if (correctAuthor.length === 0) return [], null; // Return empty array if no matching author found
    const authorQuotes = pool.filter(quote => quote.author === correctAuthor[0].item.name);
    return [authorQuotes, correctAuthor[0].item.name];
}

function getTextPool(pool, text) {
    const textResults = textfuse.search(text);
    if (textResults.length === 0) return []; // Return empty array if no matching text found
    const textQuotes = textResults.map(result => result.item);
    return textQuotes;
}

function getQuotePool(tags, author, text) {
    let ctags = [];
    let cauthor = null;
    let pool = quotes;
    if (text) {
        pool = getTextPool(pool, text);
    }
    if (tags) {
        [pool, ctags] = getTaggedPool(pool, tags);
    }
    if (author) {
        [pool, cauthor] = getAuthorPool(pool, author);
    }

    if (!text && !tags && !author) {
        pool = []; // If no search parameters provided, return empty array to avoid returning all quotes
    }
    return [pool, ctags, cauthor];
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search for quotes by tag!')
        .addStringOption(option =>
            option.setName('tags')
            .setDescription('The quote tags'))
        .addStringOption(option =>
            option.setName('author')
            .setDescription('The quote author'))
        .addStringOption(option =>
            option.setName('text')
            .setDescription('The quote text to search for')),

    async execute(interaction) {
        await interaction.deferReply();

        const tag = interaction.options.getString('tags');
        const author = interaction.options.getString('author');
        const text = interaction.options.getString('text');

        try {
            // Pick pool based on whether tag was provided
            const [pool, ctags, cauthor] = getQuotePool(tag, author, text);

            if (!pool || pool.length === 0) {
                const errorEmbed = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setAuthor({ name: `ERROR: No result found` })
                    .setDescription(`No quotes found for: Tags: **${tag}** Author: **${author}** Text: **${text}**`)
                    .setTimestamp()
                    .setFooter({ text: `Try checking spelling` });

                return await interaction.editReply({ embeds: [errorEmbed] });
            }
            
            function quotesToField(quotes) {
                const fields = [];
                for (const quote of quotes) {
                    fields.push({ name: `Author: ${quote.author} | Tags: ${quote.tags.join(', ')} | ID: ${quote._id}`, value: `${quote.content}` });
                }
                return fields;
            }

            const quoteEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: `Search Results` })
                .setTitle(`Searched for: Tags: "${ctags.join(', ')}" Author: "${cauthor}" Text: "${text}"`)
                // .setDescription(`Found ${pool.length} quote(s).`)
                .addFields(quotesToField(pool).slice(0, 25)) // Discord has a limit of 25 fields per embed
                .setTimestamp()
                .setFooter({ text: `Found ${pool.length} quote(s).` });

            await interaction.editReply({ embeds: [quoteEmbed] });

        } catch (error) {
            console.error(error);
            await interaction.editReply('Something went wrong while fetching the quote.');
        }
    }
};
