const fs = require("fs")
const { ActivityType } = require("discord.js")
var num
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setPresence({ activities: [{ name: 'motivational quotes' , type: ActivityType.Listening }], status: 'idle' });
		numint = parseInt(num)
		fs.writeFileSync("./logs/lognum.txt", `${numint + 1}`)
		newnum = fs.readFileSync("./logs/lognum.txt")
		fs.writeFileSync(`./logs/logs${newnum}.txt`,`Ready! Logged in as ${client.user.tag}\n`)
	}
}