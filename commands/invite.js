const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('invite link'),
	async execute(interaction) {
		await interaction.reply("https://discord.com/oauth2/authorize?client_id=1027165461407858710&scope=bot&permissions=415001606208");
	},
};
