const { SlashCommandBuilder } = require('discord.js');
var uptime
var unit
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {
		if (client.uptime < 1000) {
			//milliseconds
			uptime = client.uptime
			unit = "ms"
		}
		else if (client.uptime < 60000){
			//seconds
			uptime = Math.floor(client.uptime / 1000)
			unit = "sec"
		}
		else if (client.uptime < 3600000){
			//minutes
			uptime = Math.floor(client.uptime / 60000)
			unit = "mins"
		}
		else if (client.uptime < 86400000){
			//hours
			uptime = Math.floor(client.uptime / 3600000)
			unit = "hrs"
		}
		else {
			//days
			uptime = Math.floor(client.uptime / 86400000)
			unit = "days"
		}
		await interaction.reply(`Pong!\nUptime: ${uptime} ${unit}\nApi ping: ${client.ws.ping}ms`);
	},
};