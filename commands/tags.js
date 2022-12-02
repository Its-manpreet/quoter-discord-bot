const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js');
var tags_embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setAuthor({ name : `Tags menu`})
	.setDescription("Format:\n`love` for a quote with love tag\n`love|friendship` for a quote with love OR friendship tag\n`love,friendship` for a quote with love AND friendship tag")
	.addFields(
	{ name: 'Page 1', value: `
athletics
business
change
character
competition
conservative
courage
education
faith
family
famous-quotes
film
freedom
friendship
future
`, inline: true },
	{ name: 'Page 2', value: `
happiness
history
honor
humor
humorou
inspirational
leadership
life
literature
love
motivational
nature
pain
philosophy
politics
`, inline: true },
	{ name: 'Page 3', value: `
power-quotes
religion
science
self
self-help
social-justice
spirituality
sports
success
technology
time
truth
virtue
war
wisdom
`, inline: true },
	)
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
