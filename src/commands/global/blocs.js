const conf = require('../../../conf');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('blocs')
		.setDescription(`Recuperer les blocs de competences de l'année 2021-22`),
	async execute(interaction, bot) {
		await interaction.reply({embeds: [new MessageEmbed().setDescription(`Disponibles ici: [BLOCS COMPETENCES](https://discord.com/channels/884098680704077854/884098681270321275/918587944699301899)`)]});
	}
};