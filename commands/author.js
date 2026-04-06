const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const Fuse = require('fuse.js')
const authors = require('../data/authors.json');

const authorIndex = new Map();
for (const author of authors) {
    if (!authorIndex.has(author.name)) {
        authorIndex.set(author.name, author);
    }
}
// TODO: make it so that the use can search via BIO/Desc as well, not just name. also make it token based
const fuse = new Fuse(authors, {useTokenSearch: true, keys: ['name', 'bio', 'description'], threshold: 0.3, includeScore: true, }); 

async function getAuthorImage(author) {
    const authorWikiSlug = author.link.split('/').slice(-1)[0]; // Extract slug from URL
    const wikiApiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${authorWikiSlug}&prop=pageimages&format=json`;
    const response = await fetch.default(wikiApiUrl);
    const data = await response.json();
    const pages = data.query.pages;
    const page = Object.values(pages)[0]; // Get the first page object
    const image = page.thumbnail ? page.thumbnail.source : null; // Get thumbnail URL if available
    return image;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('author')
        .setDescription('Gets the information about an author!')
        .addStringOption(option =>
            option.setName('name')
            .setDescription('The author name')),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const authorName = interaction.options.getString('name');
            
            const errorEmbed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setAuthor({ name: `ERROR: Author not found` })
            .setDescription(`No author found with name: **${authorName}**`)
            .setTimestamp()
            .setFooter({ text: `Try checking spelling` });
            
            const rawAuthor = authorIndex.get(authorName);
            let author = rawAuthor;
            if (!rawAuthor) {
                // If exact match not found, try fuzzy search
                const results = fuse.search(authorName);
                if (results.length > 0) {
                  let topScore = 1;
                    for (const result of results) {
                        if (result.score < topScore) {
                            topScore = result.score;
                            author = result.item;
                        }
                    }
                } else {
                    return await interaction.editReply({ embeds: [errorEmbed] });
                }
            }
            let suggest = null;
            if (rawAuthor != author) {
              suggest = `No results for \"${authorName}\". Did you mean: \"${author.name}\"?`;
            }



            const authorEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({name: suggest})
                .setTitle(author.name)
                .setURL(author.link)
                .setDescription(`${author.description}`)
                .setThumbnail(await getAuthorImage(author))
                .addFields({ name: "Biography", value: author.bio })
                .setTimestamp()
                .setFooter({ text: `ID: ${author._id}` });

            await interaction.editReply({ embeds: [authorEmbed] });

        } catch (error) {
            console.error(error);
            await interaction.editReply('Something went wrong while fetching the author information.');
        }
    }
};