const fs = require('fs');
const colour = require('colour');
const mysql = require('mysql');
const conf = require('../conf');
const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const bot = new Client({
	intents: new Intents(32767),
	presence: {
		status: "dnd",
		activities: [{
			name: 'In Dev...',
			type: 'PLAYING'
		}]
	}
});
const handlers = fs.readdirSync('./src/handlers').filter(file => file.endsWith('.js'));
const events = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const commands = fs.readdirSync('./src/commands');

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

const randomColor = () => {
	let color = '#';
	for (let i = 0; i < 6; i++){
		const random = Math.random();
		const bit = (random * 16) | 0;
		color += (bit).toString(16);
	};
	return color;
}

bot.commands = new Collection();
bot.games = [];
bot.games.parties = [];
bot.games.invitations = [];
let g;

bot.errorEmbed = (content) => {
	let errorEmbed = new MessageEmbed() 
		.setColor(conf.embeds.colors.red)
		.setDescription(`**❌ | ${content}**`);
	return errorEmbed;
}

require('dotenv').config();

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', reason.stack || reason)
});

bot.on("ready", () => {
	bot.guilds.cache.get(conf.general.guild).channels.cache.get('897847096881872977').send('Bot now online !')
	g = bot.guilds.cache.get(conf.general.guild);
});

(async () => {
	for (handler of handlers) require(`./handlers/${handler}`)(bot)

	bot.handleEvents(events, './src/events');
	bot.handleCommands(commands, './src/commands');
	bot.login(process.env.TOKEN);
})();

/**
 * APRIL FOOL CODE
 */

bot.on("messageCreate", message => {
	if(message.author.bot) return;
	message.react("april_fool:959214780898500618")
	if(g.members.cache.find(m => m.user.id == message.author.id).roles.cache.find(r => r.name == "Classe")){
		let role = g.roles.cache.find(r => r.name == g.members.cache.find(m => m.user.id == message.author.id).id);
		if(role) role.edit({color: randomColor()});
	}
});

setTimeout(() => {
	g.members.cache.forEach(async m => {
		if(m.roles.cache.find(r => r.name == "Classe")){
			let role = g.roles.cache.find(r => r.name == m.id);
			if(role){
				setInterval(() => {
					role.edit({color: randomColor()})
				}, 61000)
			} else {
				console.log(`Create april fool role for ${m.user.tag}`.yellow.italic)
				g.roles.create({name: m.id, color: randomColor(), reason: "April fool"})
					.then(newR => m.roles.add(newR));
			}
		}
	})
}, 2500);