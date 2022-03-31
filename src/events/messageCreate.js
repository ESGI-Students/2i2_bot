module.exports = {
	name: 'messageCreate',
	async execute(message, bot) {
        if(message.author.bot) return;

        message.react("959214780898500618")
	}
};