const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch")

var quote_embed

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Gives a random quote!'),
	async execute(interaction) {
		await interaction.deferReply();

		try {
			const response = await fetch('https://zenquotes.io/api/random');
			const data = await response.json();

			quote_embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setAuthor({ name: `By: ${data[0].a}` })
				.setDescription(`__**${data[0].q}**__`)
				.setTimestamp()
				.setFooter({ text: "Quoter discord bot." });

			await interaction.editReply({ embeds: [quote_embed] });
		} catch (error) {
			console.error(error);
			await interaction.editReply('Something went wrong while fetching the quote.');
		}
	}
};

/* lukePeavey quotable.io implementation 
module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Gives a random quote!')
		// .addStringOption(option =>
		// 	option.setName('tags')
		// 	.setDescription('The quote tags')),
	async execute(interaction) {
		await interaction.deferReply();
	
		const tag = interaction.options.getString('tags');
		let quote_embed;
	
		try {
			const response = await fetch(tag ? `http://api.quotable.io/random?tags=${tag}` : 'http://api.quotable.io/random');
			const data = await response.json();
	
			if (data.statusCode) {
				quote_embed = new EmbedBuilder()
					.setColor(0xFF0000)
					.setAuthor({ name: `ERROR: ${data.statusCode}` })
					.setDescription(`${data.statusMessage}`)
					.setTimestamp()
					.setFooter({ text: `try checking spelling` });
			} else {
				quote_embed = new EmbedBuilder()
					.setColor(0x0099FF)
					.setAuthor({ name: `By: ${data.author}` })
					.setDescription(`__**${data.content}**__`)
					.setTimestamp()
					.setFooter({ text: `ID: ${data._id}` });
			}
	
			await interaction.editReply({ embeds: [quote_embed] });
		} catch (error) {
			console.error(error);
			await interaction.editReply('Something went wrong while fetching the quote.');
		}
	}
};
*/