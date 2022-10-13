const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch")
var quote_embed
module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Gives a random quote!'),
	async execute(interaction) {
        fetch('https://api.quotable.io/random')
        .then(res => res.json())
        .then(data => {
			quote = data.content
			author = data.author
			ID = data._id
		})
		.then(() => quote_embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setAuthor({ name: `${quote}`})
			.setDescription(`By: ${author}`)
			.setTimestamp()
			.setFooter({ text: `ID: ${ID}`})
			)
		.then(() => interaction.reply({ embeds: [quote_embed] }))
	},
	
};