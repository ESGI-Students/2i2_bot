const fs = require('fs');
const colour = require('colour');
const mysql = require('mysql');
const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({
	intents:[Intents.FLAGS.GUILDS],
	presence: {
		status: 'online',
		activity: {
			name: 'In Dev...',
			type: 'PLAYING'
		}
	}
});
const handlers = fs.readdirSync('./src/handlers').filter(file => file.endsWith('.js'));
const events = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commands = fs.readdirSync('./src/commands');

bot.commands = new Collection();

require('dotenv').config();

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
});

(async () => {
	for (handler of handlers) require(`./handlers/${handler}`)(bot)

	bot.handleEvents(events, './src/events');
	bot.handleCommands(commands, './src/commands');
	bot.login(process.env.TOKEN);
})();
