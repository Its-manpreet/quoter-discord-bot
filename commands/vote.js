const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var vote_embed = new EmbedBuilder()
.setColor(0x0099FF)
.setTitle('Click me!')
.setURL('https://top.gg/bot/1027165461407858710')
.setAuthor({ name: 'Vote me!', url: 'https://top.gg/bot/1027165461407858710' })
.setDescription('^^^ click the link to head over to Top.gg to vote me')
.setTimestamp()
.setFooter({ text: "You can vote me every 12 hours"});


module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('vote link'),
	async execute(interaction) {
		await interaction.reply({ embeds: [vote_embed] })
	},
};