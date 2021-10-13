const conf = require('../../../conf');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ball')
		.addStringOption(option => option.setName('question').setDescription('Question').setRequired(true))
		.setDescription(`Pose une question et j'y répondrai 😉`),
	async execute(interaction) {
		let question = interaction.options.getString('question');
        
        if (!question) return interaction.reply({embeds: [bot.errorEmbed(`Vous devez poser une question.`)]});
		
        const replies = ["Oui !", "Non.", "Peut être...", "Evidemment !"];

        let emb = new MessageEmbed() 
            .setColor(conf.embeds.colors.blurple)
			.setTitle(question)
            .setDescription(replies[Math.floor(Math.random() * replies.length)]);
		await interaction.reply({embeds: [emb]});
	}
};