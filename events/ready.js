const fs = require("fs")
var num
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		num = fs.readFileSync("./logs/lognum.txt")
		numint = parseInt(num)
		fs.writeFileSync("./logs/lognum.txt", `${numint + 1}`)
		newnum = fs.readFileSync("./logs/lognum.txt")
		fs.writeFileSync(`./logs/logs${newnum}.txt`,`Ready! Logged in as ${client.user.tag}\n`)
	}
}