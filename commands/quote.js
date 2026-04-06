const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const quotes = require('../data/quotes.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Gives a random quote!'),

    async execute(interaction) {
        await interaction.deferReply();

        try {
            const quote = quotes[Math.floor(Math.random() * quotes.length)];

            const quoteEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setAuthor({ name: `By: ${quote.author}` })
                .setDescription(`## ${quote.content}`)
                .setTimestamp()
                .setFooter({ text: `ID: ${quote._id}` });

            await interaction.editReply({ embeds: [quoteEmbed] });

        } catch (error) {
            console.error(error);
            await interaction.editReply('Something went wrong while fetching the quote.');
        }
    }
};