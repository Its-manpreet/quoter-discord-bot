const { SlashCommandBuilder, Client, GatewayIntentBits } = require('discord.js');
const fetch = require("node-fetch")
module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Gives a random quote!'),
	async execute(interaction) {
        fetch('https://api.quotable.io/random')
        .then(res => res.json())
        .then(data => obj = data.content)
        .then(() => interaction.reply(obj))
	},
};