const fs = require("fs")
const { prefix } = require("../config/config.json")
module.exports = {
	name: 'messageCreate',
	execute(Message, client) {
        if(Message.content.startsWith(prefix)){
            var datern = new Date();
            datern.toString()
            let logs = `"${Message.author.tag}" (id = "${Message.author.id}") in "#${Message.channel.name}" (id = "${Message.channel.id}") channel of "${Message.guild.name}" (id = "${Message.guild.id}") server sent "${Message.content}" (id ="${Message.id}") message on ${datern}.`
            console.log(logs);
            num = fs.readFileSync("./logs/lognum.txt")
            fs.writeFileSync(`./logs/logs${num}.txt`,`${logs}\n` , { flag: "a"})
        }
    },
};