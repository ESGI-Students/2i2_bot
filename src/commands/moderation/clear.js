const conf = require('../../../conf');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.addIntegerOption(option => option.setName('count').setDescription('Nombre de messages a supprimer').setRequired(true))
		.setDescription('Supprimer des messages en masse'),
	async execute(interaction, bot) {

		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({embeds: [bot.errorEmbed(`Vous n'avez pas la permission de faire cela !`)]});

		let count = interaction.options.getInteger('count');
        
		if (!count) return interaction.reply({embeds: [bot.errorEmbed(`Vous devez mentionner un nombre de messages a supprimer valide !`)]});

		let emb = new MessageEmbed()
			.setTitle(`Suppression de ${count} messages`)
			.addField('Modérateur', `**\`${interaction.member.user.tag}\`**`, true)
			.setTimestamp()
			.setFooter('Message auto-supprimé dans 5 SECONDES !')
			.setColor(conf.embeds.colors.green);

        const fetched = await interaction.channel.messages.fetch({limit: count});

		try {
			interaction.channel.bulkDelete(fetched);
		} catch (e) {
			return interaction.reply({embeds: [bot.errorEmbed(`Je n'ai pas les permissions necessaires a cela !`)]}); 
		}

		let msg = await interaction.reply({embeds: [emb]});
		setTimeout(() => {msg.delete()}, 5 * 1000)
		return;
	}
};