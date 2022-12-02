const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch")
const { prefix } = require("../config/config.json")
var quote_embed
module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Gives a random quote!')
		.addStringOption(option =>
			option.setName('tags')
				.setDescription('The quote tags')),
	async execute(interaction) {
		tag = interaction.options.getString('tags');
		if(!tag){
			fetch('https://api.quotable.io/random')
			.then(res => res.json())
			.then(data => {
				quote = data.content
				author = data.author
				ID = data._id })
			.then(() => quote_embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setAuthor({ name : `By: ${author}`})
				.setDescription(`__**${quote}**__`)
				.setTimestamp()
				.setFooter({ text: `ID: ${ID}`})
				)
			.then(() => interaction.reply({ embeds: [quote_embed] }))
		}
		else{
			fetch(`https://api.quotable.io/random?tags=${tag}`)
			.then(res => res.json())
			.then(data => {
				quote = data.content
				author = data.author
				ID = data._id
				error_code = data.statusCode
				error_msg = data.statusMessage
			})
			.then(() => {if(error_code){
			quote_embed = new EmbedBuilder()
				.setColor(0xFF0000)
				.setAuthor({ name : `ERROR: ${error_code}`})
				.setDescription(`${error_msg}`)
				.setTimestamp()
				.setFooter({ text: `try checking spelling`})

			interaction.reply({ embeds: [quote_embed] })}
			else{
				quote_embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setAuthor({ name : `By: ${author}`})
				.setDescription(`__**${quote}**__`)
				.setTimestamp()
				.setFooter({ text: `ID: ${ID}`})

				interaction.reply({ embeds: [quote_embed] })
		}})
	}
},
};