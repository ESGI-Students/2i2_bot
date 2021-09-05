const conf = require('../../../conf');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.addUserOption(option => option.setName('user').setDescription('Utilisateur a bannir').setRequired(true))
		.addStringOption(option => option.setName('reason').setDescription('Raison du bannissement').setRequired(true))
		.addIntegerOption(option => option.setName('days').setDescription('Durée en jours du bannissement').setRequired(true))
		.setDescription('Bannir un membre du serveur'),
	async execute(interaction, bot) {

		if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({embeds: [bot.errorEmbed(`Vous n'avez pas la permission de faire cela !`)]});

		const user = interaction.options.getUser('user');
		let reason = interaction.options.getString('reason');
		let days = interaction.options.getInteger('days');
        
		if (!user) return interaction.reply({embeds: [bot.errorEmbed(`Vous devez mentionner un utilisateur valide !`)]});
		if (!reason) reason = 'Aucun raison.';
		if (!days) days = 0;

		let findMem = await search.searchMember(interaction, user.tag);
		if (!findMem.bannable) return interaction.reply({embeds: [bot.errorEmbed(`Ce membre ne peut pas être banni !`)]});

		let emb = new MessageEmbed()
			.setTitle(`Bannissement de ${user.tag}`)
			.addField('Modérateur', `**\`${interaction.member.user.tag}\`**`, true)
			.addField('Utilisateur', `**\`${user.tag}\`**`, true)
			.addField('Raison', `**\`${reason}\`**`, false)
			.setThumbnail(user.displayAvatarURL())
			.setTimestamp()
			.setFooter(conf.embeds.footer)
			.setColor(conf.embeds.colors.blurple);

		try {
			findMem.ban({days: days, reason: reason});
		} catch (e) {
			return interaction.reply({embeds: [bot.errorEmbed(`Je n'ai pas les permissions necessaires a cela !`)]});
		}

		await interaction.reply({embeds: [emb]});
	}
};