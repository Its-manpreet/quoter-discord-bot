const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const interaction = require('../events/interaction');
var vote_embed

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('vote link'),
	async execute(interaction, client, api) {
		voted = await api.hasVoted(interaction.user.id)
		if(voted === true ){
			vote_embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Click me!')
			.setURL('https://top.gg/bot/1027165461407858710')
			.setAuthor({ name: 'Vote me!', url: 'https://top.gg/bot/1027165461407858710' })
			.setDescription('^^^ click the link to head over to Top.gg to vote me\nNOTE: you have already voted me in the past 12 hours\nThanks for voting me')
			.setTimestamp()
			.setFooter({ text: "You can vote me every 12 hours"});
			await interaction.reply({ embeds: [vote_embed] })
		}
		else{
			vote_embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Click me!')
			.setURL('https://top.gg/bot/1027165461407858710')
			.setAuthor({ name: 'Vote me!', url: 'https://top.gg/bot/1027165461407858710' })
			.setDescription('^^^ click the link to head over to Top.gg to vote me')
			.setTimestamp()
			.setFooter({ text: "You can vote me every 12 hours"});
			await interaction.reply({ embeds: [vote_embed] })
		}
	},
	async msgexe(Message, client, api) {
		voted = await api.hasVoted(Message.author.id)
		if(voted === true ){
			vote_embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Click me!')
			.setURL('https://top.gg/bot/1027165461407858710')
			.setAuthor({ name: 'Vote me!', url: 'https://top.gg/bot/1027165461407858710' })
			.setDescription('^^^ click the link to head over to Top.gg to vote me\nNOTE: you have already voted me in the past 12 hours\nThanks for voting me')
			.setTimestamp()
			.setFooter({ text: "You can vote me every 12 hours"});
			await Message.reply({ embeds: [vote_embed] })
		}
		else{
			vote_embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Click me!')
			.setURL('https://top.gg/bot/1027165461407858710')
			.setAuthor({ name: 'Vote me!', url: 'https://top.gg/bot/1027165461407858710' })
			.setDescription('^^^ click the link to head over to Top.gg to vote me')
			.setTimestamp()
			.setFooter({ text: "You can vote me every 12 hours"});
			await Message.reply({ embeds: [vote_embed] })
		}
	}
};