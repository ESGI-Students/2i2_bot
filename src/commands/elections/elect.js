const conf = require('../../../conf');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('elect')
		.addUserOption(option => option.setName('user1').setDescription('1ere personne pour qui vous votez').setRequired(true))
		.addUserOption(option => option.setName('user2').setDescription('2eme personne pour qui vous votez').setRequired(true))
		.setDescription(`Voter pour deux candidats`),
	async execute(interaction, bot) {

        if (true) return interaction.reply({embeds: [bot.errorEmbed(`Temporairement desactivée !`)]});

        const user1 = interaction.options.getUser('user1');
        const user2 = interaction.options.getUser('user2');
        
		if (!user1 || !user2) return interaction.reply({embeds: [bot.errorEmbed(`Vous devez mentionner un utilisateur valide !`)]});
		if (user1 == user2) return interaction.reply({embeds: [bot.errorEmbed(`Vous ne pouvez pas voter 2 fois pour la meme personne !`)]});
	}
};