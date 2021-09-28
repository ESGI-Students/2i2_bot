const conf = require('../../../conf');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aurelien')
		.setDescription(`Try it bitches :)`),
	async execute(interaction, bot) {
		await interaction.reply(`eyeheheyeheye ! Tu me brules les yeux tellement t moche gros`);
	}
};