module.exports = {
	event: 'ready',
	once: true,
	async execute(bot) {
		console.log('Bot online !'.green);
		bot.guilds.cache.get('884098680704077854').channels.cache.get('884103274704293899').send('Bot now online !')
	},
};