const conf = require('../../../conf');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ball')
		.setDescription(`Pose une question et j'y répondrai 😉`),
	async execute(interaction, args) {
        const question = args.join(" ");
        
        if (!question) return interaction.reply({embeds: [bot.errorEmbed(`Vous devez poser une question.`)]});
		
        const replies = ["Oui !", "Non.", "Peut être...", "Evidemment !"];

        let emb = new MessageEmbed() 
            .setColor(conf.embeds.colors.blurple)
			.setTitle(question)
            .setDescription(replies[Math.floor(Math.random() * replies.length)]);
		await interaction.reply({embeds: [emb]});
	}
};