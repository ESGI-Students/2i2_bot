const conf = require('../../../conf');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('parties')
		.setDescription(`Lister les parties en cours`),
	async execute(interaction, bot) {
        let content = ''
        if(bot.games.parties.length == 0) content = 'Aucune partie en cours !';
        for(let i = 0; i < bot.games.parties.length; i++){
            content += `- <@${bot.games.parties[i].players[0]}> **VS** <@${bot.games.parties[i].players[1]}>: ${bot.games.parties[i].game}\n`;
        }
        let emb = new MessageEmbed() 
            .setColor(conf.embeds.colors.blurple)
            .setTitle('🎮 | Parties en cours')
            .setDescription(`${content}`);
		await interaction.reply({embeds: [emb]});
    }
};