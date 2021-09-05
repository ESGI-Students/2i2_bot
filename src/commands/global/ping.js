const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription(`Tester la latence du client et la latence de l'API en ms`),
	async execute(interaction, bot) {
		await interaction.reply(`⏲️ **Latences**:\n\nClient: **\`${Date.now() - interaction.createdTimestamp}ms\`**\nAPI: **\`${Math.round(bot.ws.ping)}ms\`**`);
	}
};