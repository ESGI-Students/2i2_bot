const conf = require('../../../conf');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('candidates')
		.addStringOption(option => option.setName('action').setDescription('add/remove').setRequired(true))
		.addUserOption(option => option.setName('user').setDescription('Membre sur lequel agir').setRequired(true))
		.setDescription(`Agir sur les candidats des elections`),
	async execute(interaction, bot) {

        if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({embeds: [bot.errorEmbed(`Vous n'avez pas la permission de faire cela !`)]});

        const user = interaction.options.getUser('user');
		let action = interaction.options.getString('action');
        
		if (!user) return interaction.reply({embeds: [bot.errorEmbed(`Vous devez mentionner un utilisateur valide !`)]});
		if (!action || action != ('add'||'remove')) return interaction.reply({embeds: [bot.errorEmbed(`Vous devez definir une action valide (add/remove) !`)]});

		switch(action) {
            case 'add': {
                break;
            }
            case 'remove': {
                break;
            }
            default: {break;}
        }
	}
};