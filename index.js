// Require the necessary discord.js classes
const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, WebSocketManager, Collection, Message, messageLink } = require('discord.js');
const { token, prefix } = require("./config/config.json");
const interaction = require('./events/interaction');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection()
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
//msg commands
client.on('messageCreate', async Message => {
	if(Message.content.startsWith(prefix)){
		cmmnd = Message.content.slice(prefix.length, Message.content.length)
		const cmmndexe = client.commands.get(cmmnd)
		if (!cmmndexe) return
		try {
			await cmmndexe.execute(Message, client );
		} catch (error) {
			console.error(error);
			await Message.reply('There was an error while executing this command!');
		}
	}
})
//listen for commands
client.on('interactionCreate', async interaction => {
	
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Login to Discord with your client's token
client.login(token);