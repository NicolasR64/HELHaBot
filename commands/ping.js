const { SlashCommandBuilder } = require('@discordjs/builders');

// Simply response by Pong!
module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!').setDMPermission(true),
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};