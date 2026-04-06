const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');
const taglist = require('../data/tags.json')

var tags = []
for (const tag of taglist) {
		tags.push(tag['name']);
}

var tags_embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setAuthor({ name : `Tags menu`})
	.setDescription("Format:\n`love` for a quote with love tag\n`love,friendship` for a quote with love AND friendship tag")
	.addFields({ name: 'Page 1', value: tags.slice(0, Math.ceil(tags.length / 3)).join('\n'), inline: true},
						 { name: 'Page 2', value: tags.slice(Math.ceil(tags.length / 3), Math.ceil(tags.length * (2 / 3))).join('\n'), inline: true},
						 { name: 'Page 3', value: tags.slice(Math.ceil(tags.length * (2 / 3)), Math.ceil(tags.length)).join('\n'), inline: true},)
	.setTimestamp()
	.setFooter({ text: "Use with \"/quote\" command"});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tags')
		.setDescription('List of all Tags'),
	async execute(interaction) {
		await interaction.reply({ embeds: [tags_embed] });
	},
};
