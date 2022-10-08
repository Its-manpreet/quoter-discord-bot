const { SlashCommandBuilder, Client, GatewayIntentBits } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply("Pong!")
		//not workng due to client var
		//await interaction.reply(`Pong!\nUptime: ${Math.round(client.uptime / 1000 / 60)} mins\nApi ping: ${Math.round(client.ping)}ms`);
	},
};