const fs = require("fs")
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		fs.writeFileSync("./logs.txt",`Ready! Logged in as ${client.user.tag}`)
	}
}