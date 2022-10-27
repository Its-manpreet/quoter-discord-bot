const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var invite_embed = new EmbedBuilder()
.setColor(0x0099FF)
.setTitle('Click me!')
.setURL('https://discord.com/oauth2/authorize?client_id=1027165461407858710&scope=bot&permissions=415001606208')
.setAuthor({ name: 'Invite me!', url: 'https://discord.com/oauth2/authorize?client_id=1027165461407858710&scope=bot&permissions=415001606208' })
.setDescription('^^^ click the link to invite me!')
.setTimestamp()
.setFooter({ text: "Don't invite me to servers with less than 20 members please!"});


module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('invite link'),
	async execute(interaction) {
		await interaction.reply({ embeds: [invite_embed] });
	},
};
