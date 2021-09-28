const conf = require('../../../conf');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aurelien')
		.setDescription(`Try it bitches :)`),
	async execute(interaction, bot) {
		await interaction.reply(`Bon bah let's go:
		Insta: aurelienkrf
		Twitter: @ducstreamful
		Snap: aurelienkrf2
		Spotify: 4lvjayyixslfa2a5rrsxinz09
		Paypal: paypal.me/aurelienkrf
		OnlyFans: Coming soon
		`);
	}
};
