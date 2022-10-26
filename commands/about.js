const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var about_embed = new EmbedBuilder()
.setColor(0x0099FF)
.setAuthor({ name : `About me`})
.setDescription(`Hey, I'm quoter discord bot\nI was made by <@!780330532550606868>\nVersion = BETA 0.3.4`)
.setTimestamp()
.setFooter({ text: `Join the support server too!`});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('About the bot'),
	async execute(interaction) {
		await interaction.reply({ embeds: [about_embed] });
	},
};