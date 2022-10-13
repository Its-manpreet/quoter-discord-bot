const fs = require("fs")
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        var datern = new Date();
        datern.toString()
        let logs = `"${interaction.user.tag}" (id = "${interaction.user.id}") in "#${interaction.channel.name}" (id = "${interaction.channel.id}") channel of "${interaction.guild.name}" (id = "${interaction.guild.id}") server triggered "${interaction.commandName}" (id ="${interaction.id}") interaction on ${datern}.`
		console.log(logs);
        num = fs.readFileSync("./logs/lognum.txt")
        fs.writeFileSync(`./logs/logs${num}.txt`,`${logs}\n` , { flag: "a"})
    },
};
