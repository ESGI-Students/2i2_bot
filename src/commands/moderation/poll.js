const conf = require('../../../conf');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Céer un sondage')
		.addStringOption(option => option.setName('question').setDescription('Question du sondage').setRequired(true))
		.addStringOption(option => option.setName('response').setDescription('Réponse au sondage').setRequired(true)),
	async execute(interaction, bot) {

		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({embeds: [bot.errorEmbed(`Vous n'avez pas la permission de faire cela !`)]});

		let ask = interaction.options.getString('question');
        
		if (!ask) return interaction.reply({embeds: [bot.errorEmbed(`Vous devez poser une question pour le sondage.`)]});

		let choice = interaction.options.getString('response');
        
		if (!choice) return interaction.reply({embeds: [bot.errorEmbed(`Le sondage doit comporter au moins un choix.`)]});

		const reactions = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸"];

		const [question, ...choices] = interaction.join(" ").split(" | ");

		if (choices.length > 20) return interaction.reply({embeds: [bot.errorEmbed(`Il ne peut pas y avoir plus de 20 choix.`)]});
		
		let emb = new MessageEmbed()
			.setTitle(question)
			.setDescription(choices.map((choice, i) => `${reactions[i]} ${choice}`).join("\n\n"))
			.addField('Auteur', `**\`${interaction.member.user.tag}\`**`, true)
			.setTimestamp()
			.setColor(conf.embeds.colors.green);

		let msg = await interaction.channel.send({embeds: [emb]});
		
		await interaction.reply({embeds: msg});
	}
};