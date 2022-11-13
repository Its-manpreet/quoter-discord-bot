const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch")
var quote_embed
module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Gives a random quote!')
		.addStringOption(option =>
			option.setName('tags_1')
				.setDescription('The quote tags')
				.addChoices(
				{ name: 'athletics', value: 'athletics' },
				{ name: 'business', value: 'business' },
				{ name: 'change', value: 'change' },
				{ name: 'character', value: 'character' },
				{ name: 'competition', value: 'competition' },
				{ name: 'conservative', value: 'conservative' },
				{ name: 'courage', value: 'courage' },
				{ name: 'education', value: 'education' },
				{ name: 'faith', value: 'faith' },
				{ name: 'family', value: 'family' },
				{ name: 'famous-quotes', value: 'famous-quotes' },
				{ name: 'film', value: 'film' },
				{ name: 'freedom', value: 'freedom' },
				{ name: 'friendship', value: 'friendship' },
				{ name: 'future', value: 'future' },
				{ name: 'happiness', value: 'happiness' },
				{ name: 'history', value: 'history' },
				{ name: 'honor', value: 'honor' },
				{ name: 'humor', value: 'humor' },
				{ name: 'humorous', value: 'humorous' },
				{ name: 'inspirational', value: 'inspirational' },
				{ name: 'leadership', value: 'leadership' },
				{ name: 'life', value: 'life' },
				{ name: 'literature', value: 'literature' },
				{ name: 'love', value: 'love' },
		))
		.addStringOption(option2 =>
			option2.setName('tags_2')
				.setDescription('Even more quote tags')
				.addChoices(
				{ name: 'motivational', value: 'motivational' },
				{ name: 'nature', value: 'nature' },
				{ name: 'pain', value: 'pain' },
				{ name: 'philosophy', value: 'philosophy' },
				{ name: 'politics', value: 'politics' },
				{ name: 'power-quotes', value: 'power-quotes' },
				{ name: 'religion', value: 'religion' },
				{ name: 'science', value: 'science' },
				{ name: 'self', value: 'self' },
				{ name: 'self-help', value: 'self-help' },
				{ name: 'social-justice', value: 'social-justice' },
				{ name: 'spirituality', value: 'spirituality' },
				{ name: 'sports', value: 'sports' },
				{ name: 'success', value: 'success' },
				{ name: 'technology', value: 'technology' },
				{ name: 'time', value: 'time' },
				{ name: 'truth', value: 'truth' },
				{ name: 'virtue', value: 'virtue' },
				{ name: 'war', value: 'war' },
				{ name: 'wisdom', value: 'wisdom' },
		)),
	async execute(interaction) {
		tag1 = interaction.options.getString('tags_1');
		tag2 = interaction.options.getString('tags_2');
		if(!tag1){
			if(!tag2){
			fetch('https://api.quotable.io/random')
			.then(res => res.json())
			.then(data => {
				quote = data.content
				author = data.author
				ID = data._id
			})
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
			fetch(`https://api.quotable.io/random?tags=${tag2}`)
			.then(res => res.json())
			.then(data => {
				quote = data.content
				author = data.author
				ID = data._id
			})
			.then(() => quote_embed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setAuthor({ name : `By: ${author}`})
				.setDescription(`__**${quote}**__`)
				.setTimestamp()
				.setFooter({ text: `ID: ${ID}`})
				)
			.then(() => interaction.reply({ embeds: [quote_embed] }))
		}
	}
	else{
		if(tag2){
		quote_embed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setAuthor({ name : "ERROR"})
		.setDescription("Kindly only input one tag, don't select two")
		.setTimestamp()
		.setFooter({ text: "if you belive this is an error kindly report it"})
		await interaction.reply({ embeds: [quote_embed] })
		}
		else{
		fetch(`https://api.quotable.io/random?tags=${tag1}`)
        .then(res => res.json())
        .then(data => {
			quote = data.content
			author = data.author
			ID = data._id
		})
		.then(() => quote_embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setAuthor({ name : `By: ${author}`})
			.setDescription(`__**${quote}**__`)
			.setTimestamp()
			.setFooter({ text: `ID: ${ID}`})
			)
		.then(() => interaction.reply({ embeds: [quote_embed] }))
	}
	}
},
async msgexe(Message){
	fetch(`https://api.quotable.io/random`)
        .then(res => res.json())
        .then(data => {
			quote = data.content
			author = data.author
			ID = data._id
		})
		.then(() => quote_embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setAuthor({ name : `By: ${author}`})
			.setDescription(`__**${quote}**__`)
			.setTimestamp()
			.setFooter({ text: `ID: ${ID}`})
			)
		.then(() => Message.reply({ embeds: [quote_embed] }))
}
};