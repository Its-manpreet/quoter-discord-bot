const { SlashCommandBuilder, Client } = require('discord.js');
const client = Client
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply("Pong!")
		//not workng due to client var
		//await interaction.reply(`Pong!\nUptime: ${Math.round(client.uptime / 1000 / 60)} mins\nApi ping: ${Math.round(client.ws.ping)}ms`);
	},
};