const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');
var help_embed

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('List of all commands'),
	async execute(interaction, client) {
		help_embed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setAuthor({ name : `Help menu`})
		.setDescription("Execute `/help` for this menu\nExecute `/quote` for a random quote\nExecute `/about` for info about bot\nExecute `/ping` for bot's ping")
		.setTimestamp()
		.setFooter({ text: `bots's ping - ${client.ws.ping}ms`});
		await interaction.reply({ embeds: [help_embed] });
	},
};
