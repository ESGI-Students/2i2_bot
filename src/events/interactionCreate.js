module.exports = {
	name: 'interactionCreate',
	async execute(interaction, bot) {
		console.log(`~ Nouvelle interaction: ${interaction.user.tag} dans #${interaction.channel.name}`.yellow.italic);
		if (!interaction.isCommand()) return;

		const command = bot.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.execute(interaction, interaction.client);
		} catch (error) {
			console.log(`${error}`);
			await interaction.reply(
				{
					content: `Une erreur est survenue lors de l'utilisation de la commande.`,
					ephmeral: true
				}
			);
		}
	}
};