const conf = require('../../../conf');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('poll')
		.setDescription('Cรฉer un sondage')
		.addStringOption(option => option.setName('question').setDescription('Question du sondage').setRequired(true))
		.addStringOption(option => option.setName('options').setDescription('Options du poll. Sรฉparรฉes par des | ').setRequired(true)),
	async execute(interaction, bot) {

		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({embeds: [bot.errorEmbed(`Vous n'avez pas la permission de faire cela !`)]});

		let question = interaction.options.getString('question');
        
		if (!question) return interaction.reply({embeds: [bot.errorEmbed(`Vous devez poser une question pour le sondage.`)]});

		let options = interaction.options.getString('options').split(" | ");
        
		if (options.length < 2) return interaction.reply({embeds: [bot.errorEmbed(`Le sondage doit comporter au deux un choix.`)]});

		if (options.length > 20) return interaction.reply({embeds: [bot.errorEmbed(`Il ne peut pas y avoir plus de 20 choix.`)]});

		let reactions = ["๐ฆ", "๐ง", "๐จ", "๐ฉ", "๐ช", "๐ซ", "๐ฌ", "๐ญ", "๐ฎ", "๐ฏ", "๐ฐ", "๐ฑ", "๐ฒ", "๐ณ", "๐ด", "๐ต", "๐ถ", "๐ท", "๐ธ", "T"];
		
		let emb = new MessageEmbed()
			.setTitle(question)
			.setDescription(options.map((choice, i) => `${reactions[i]} ${choice}`).join("\n\n"))
			.addField('Auteur', `**\`${interaction.member.user.tag}\`**`, true)
			.setTimestamp()
			.setColor(conf.embeds.colors.blurple);

		await interaction.reply(`Nouveau sondage !`);

		let msg = await interaction.channel.send({embeds: [emb]});

		for (i = 0; i < options.length; i++){
			msg.react(reactions[i]);
		}

		return;
	}
};