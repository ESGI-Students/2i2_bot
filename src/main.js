const fs = require('fs');
const colour = require('colour');
const mysql = require('mysql');
const conf = require('../conf');
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
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

bot.errorEmbed = (content) => {
	let errorEmbed = new MessageEmbed() 
		.setColor(conf.embeds.colors.red)
		.setDescription(`**❌ | ${content}**`);
	return errorEmbed;
}

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
