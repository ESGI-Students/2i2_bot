module.exports = (bot) => {
	bot.handleEvents = async (eventFiles, path) => {
		for (const file of eventFiles) {
			const event = require(`../events/${file}`);
			if (event.once) {
				bot.once(event.name, (...args) => event.execute(...args, bot));
			} else {
				bot.on(event.name, (...args) => event.execute(...args, bot));
			}
		}
	};
};