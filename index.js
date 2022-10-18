// Require the necessary discord.js and node classes
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Collection is a class that extends JavaScript's native Map class
client.commands = new Collection();

// Get the path to the directory that stores your command files.
const commandsPath = path.join(__dirname, 'commands');
// Read file into commandsPath, only .js extension
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Commands handler
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	logger.log(`Command ${commandsPath} are loading!`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// Is triggered when a command is launched
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
    catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Get the path to the directory that stores your event files.
const eventPath = path.join(__dirname, 'events');
// Read file into eventPath, only .js extension
const eventFiles = fs.readdirSync(eventPath).filter(file => file.endsWith('.js'));

// Event handler
for (const file of eventFiles) {
	const filePath = path.join(eventPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
    else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Login to Discord with your client's token
client.login(token);
