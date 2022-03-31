module.exports = {
	name: 'messageCreate',
	async execute(message, bot) {
        if(message.author.bot) return;
        console.log("Message react!")
        message.react("april_fool:959214780898500618")
	}
};