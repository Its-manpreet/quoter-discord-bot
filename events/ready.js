const fs = require("fs")
const { ActivityType } = require("discord.js")
var num

function writelog(numfile, logfolder, content) {
	num = fs.readFileSync(numfile)
	numint = parseInt(num)
	fs.writeFileSync(numfile, `${numint + 1}`)
	newnum = fs.readFileSync(numfile)
	fs.writeFileSync(`${logfolder}/logs${newnum}.txt`, content)
}

function logwriter(logfolder, content){
	if (fs.existsSync(logfolder)){
		if (fs.existsSync(`${logfolder}/lognum.txt`)){
			writelog(`${logfolder}/lognum.txt`, logfolder, content)
		} else {
			fs.writeFileSync(`${logfolder}/lognum.txt`, "0")
			writelog(`${logfolder}/lognum.txt`, logfolder, content)
		}
	} else {
		fs.mkdirSync(logfolder)
		if (fs.existsSync(`${logfolder}/lognum.txt`)){
			writelog(`${logfolder}/lognum.txt`, logfolder, content)
		} else {
			fs.writeFileSync(`${logfolder}/lognum.txt`, "0")
			writelog(`${logfolder}/lognum.txt`, logfolder, content)
		}
	}
}
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.user.setPresence({ activities: [{ name: 'motivational quotes' , type: ActivityType.Listening }], status: 'idle' });

		logwriter("./logs", `Ready! Logged in as ${client.user.tag}\n`)
	}
}