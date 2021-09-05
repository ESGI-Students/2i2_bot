const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(`Tester la latence du client et la latence de l'API en ms`),
	async execute(interaction, bot) {
		let emb = new MessageEmbed() 
            .setColor(conf.embeds.colors.blurple)
			.setTitle(`**⏲️ | Latences**`)
            .setDescription(`Client: **\`${Date.now() - interaction.createdTimestamp}ms\`**
			API: **\`${Math.round(bot.ws.ping)}ms\`**`);
		await interaction.reply({embeds: [emb]});
	}
};