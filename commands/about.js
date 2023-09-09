const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var about_embed = new EmbedBuilder()
.setColor(0x0099FF)
.setAuthor({ name : `About me`})
.setDescription(`
Hey, I'm quoter discord bot
I have 7 commands
I have 2k+ quotes
With each quotes having its tags and author
I was made by <@!780330532550606868>
support server discord.gg/9hp4W9YAVu
I was made <t:1664928000:R>
Version = \`release 1.5\`
`)
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