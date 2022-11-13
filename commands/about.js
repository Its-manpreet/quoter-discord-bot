const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var about_embed = new EmbedBuilder()
.setColor(0x0099FF)
.setAuthor({ name : `About me`})
.setDescription(`
Hey, I'm quoter discord bot
I was made by <@!780330532550606868>
Version = \`Release 1.3\`
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
	async msgexe(Message) {
		await Message.reply({ embeds: [about_embed] });
	},
};