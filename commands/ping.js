const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")
var uptime
var ping_embed
var unit
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping of the bot'),
  async execute(interaction, client) {
    if (client.uptime < 1000) {
      //milliseconds
      uptime = client.uptime
      unit = "ms"
    }
    else if (client.uptime < 60000) {
      //seconds
      uptime = Math.floor(client.uptime / 1000)
      unit = "sec"
    }
    else if (client.uptime < 3600000) {
      //minutes
      uptime = Math.floor(client.uptime / 60000)
      unit = "mins"
    }
    else if (client.uptime < 86400000) {
      //hours
      uptime = Math.floor(client.uptime / 3600000)
      unit = "hrs"
    }
    else {
      //days
      uptime = Math.floor(client.uptime / 86400000)
      unit = "days"
    };
    ping_embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setAuthor({ name: `Pong!` })
      .setThumbnail('https://cdn.discordapp.com/emojis/1030485830390792232.gif?quality=lossless&size=48')
      .setDescription(`Uptime: ${uptime} ${unit}\nApi ping: ${client.ws.ping}ms`)
      .setTimestamp()
      .setFooter({ text: `Support the project for lower pings` });
    await interaction.reply({ embeds: [ping_embed] });
  },
};