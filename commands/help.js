const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');
var help_embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setAuthor({ name : `Help menu`})
	.setDescription(`
	Execute \`/about\` for info about bot
	Execute \`/help\` for this menu
	Execute \`/invite\` for invite link
	Execute \`/ping\` for bot's ping
	Execute \`/quote\` for a random quote
	Execute \`/vote\` for bot's Top.gg vote link
	`)
	.setTimestamp()
	.setFooter({ text: "more commands coming soon!"});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('List of all commands'),
	async execute(interaction) {
		await interaction.reply({ embeds: [help_embed] });
	},
	async msgexe(Message) {
		await Message.reply({ embeds: [help_embed] });
	},
};
