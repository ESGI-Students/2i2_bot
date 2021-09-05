const conf = require('../../../conf');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.addUserOption(option => option.setName('user').setDescription('Utilisateur a expulser').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Raison du kick'))
		.setDescription('Ejecter un membre du serveur'),
	async execute(interaction, bot) {

		if (!interaction.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return interaction.reply({embeds: [bot.errorEmbed(`Vous n'avez pas la permission de faire cela !`)]});

		const user = interaction.options.getUser('user');
		let reason = interaction.options.getString('reason');
        
		if (!user) return interaction.reply({embeds: [bot.errorEmbed(`Vous devez mentionner un utilisateur valide !`)]});
		if (!reason) reason = 'Aucun raison.';

		let findMem = await search.searchMember(interaction, user.tag);
		if (!findMem.bannable) return interaction.reply({embeds: [bot.errorEmbed(`Ce membre ne peut pas être banni !`)]});

		let emb = new MessageEmbed()
			.setTitle(`Ejection de ${user.tag}`)
			.addField('Modérateur', `**\`${interaction.member.user.tag}\`**`, true)
			.addField('Utilisateur', `**\`${user.tag}\`**`, true)
			.addField('Raison', `**\`${reason}\`**`, false)
			.setThumbnail(user.displayAvatarURL())
			.setTimestamp()
			.setFooter(conf.embeds.embedFooterText)
			.setColor(conf.embeds.colors.blurple);

		try {
			findMem.kick({reason: reason});
		} catch (e) {
			return interaction.reply({embeds: [bot.errorEmbed(`Je n'ai pas les permissions necessaires a cela !`)]});
		}

		await interaction.reply({embeds: [emb]});
	}
};