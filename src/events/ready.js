module.exports = {
	event: 'ready',
	once: true,
	async execute(bot) {
		console.log('Bot online !'.green);
		bot.channels.cache.get('884103274704293899').send('Bot now online !')
	},
};