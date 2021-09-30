const conf = require('../../../conf');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('elections')
		.addStringOption(option => option.setName('status').setDescription('allow/deny').setRequired(true))
		.setDescription(`Permettre des elections`),
	async execute(interaction, bot) {

        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({embeds: [bot.errorEmbed(`Vous n'avez pas la permission de faire cela !`)]});

		let status = interaction.options.getString('status');

		if (!status || status != ('allow'||'deny')) return interaction.reply({embeds: [bot.errorEmbed(`Vous devez donner une instruction valide (allow/deny) !`)]});

		switch(status) {
            case 'allow': {
                break;
            }
            case 'deny': {
                break;
            }
            default: {break;}
        }
	}
};