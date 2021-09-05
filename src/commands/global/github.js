const conf = require('../../../conf');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('github')
		.setDescription(`Obtenir le lien GitHub de cette app`),
	async execute(interaction, bot) {
        let emb = new MessageEmbed() 
            .setColor(conf.embeds.colors.blurple)
            .setDescription(`**🔗 | https://github.com/DynamoRed/2i2**`);
		await interaction.reply({embeds: [emb]});
	}
};