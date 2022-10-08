const fs = require("fs")
module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
        var datern = new Date();
        datern.toString()
        let logs = `${interaction.user.tag} (id = ${interaction.user.id}) in #${interaction.channel.name} (id = ${interaction.channel.id}) channel of ${interaction.guild.name} (id = ${interaction.guild.id}) server triggered "${interaction.name}" interaction on ${datern}.`
		console.log(logs);
        fs.writeFileSync("./logs.txt",`${logs}\n` , { flag: "a"})
    },
};
