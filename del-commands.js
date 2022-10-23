//all the needed packages and variables
const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config/config.json');

const rest = new REST({ version: '10' }).setToken(token);
/*
// for guild-based commands
rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
	.then(() => console.log('Successfully deleted guild command'))
	.catch(console.error);

// for global commands
rest.delete(Routes.applicationCommand(clientId, 'commandId'))
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);
*/

/*
// for guild-based all commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
.then(() => console.log('Successfully deleted all guild commands.'))
.catch(console.error);
*/
/*
// for global all commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
.then(() => console.log('Successfully deleted all application commands.'))
.catch(console.error);
*/