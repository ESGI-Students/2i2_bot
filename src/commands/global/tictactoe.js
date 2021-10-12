const conf = require('../../../conf');
const search = require('discord.js-search');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tictactoe')
		.addUserOption(option => option.setName('user').setDescription('Utilisateur a defier').setRequired(true))
		.setDescription(`Defier un membre sur un morpion`),
	async execute(interaction, bot) {
		const user = interaction.options.getUser('user');
		if (!user) return interaction.reply({embeds: [bot.errorEmbed(`Vous devez mentionner un utilisateur valide !`)]});

        for(let i = 0; i < bot.games.parties.length; i++){
            for(let y = 0; y < bot.games.parties[i].players.length; y++){
                if(bot.games.parties[i].players[y] == interaction.member.id) return interaction.reply({embeds: [bot.errorEmbed(`Vous etes déjà en partie`)]});
                if(bot.games.parties[i].players[y] == user.id) return interaction.reply({embeds: [bot.errorEmbed(`Cet utilisateur est déjà en partie`)]});
            }
        }

        if(bot.games.invitations[interaction.member.id]){
            if(bot.games.invitations[interaction.member.id].by == user.id){        
                bot.games.parties.push({
                    players: [interaction.member.id, user.id],
                    game: 'TicTacToe',
                });

                let emb = new MessageEmbed() 
                    .setColor(conf.embeds.colors.green)
                    .setDescription(`<@${interaction.member.id}> a accepter le défi de <@${user.id}>`);
                let emb2 = new MessageEmbed() 
                    .setColor(conf.embeds.colors.green)
                    .setDescription(`**Que le jeu commence !**`);
                await interaction.channel.send({embeds: [emb, emb2]});
                return;
            }
        }

        bot.games.invitations[user.id] = {
            'by': interaction.member.id,
            'for': bot.games.parties.length,
        }

        let emb = new MessageEmbed() 
            .setColor(conf.embeds.colors.blurple)
            .setDescription(`<@${interaction.member.id}> vient de vous defier au jeu du Morpion
            
            __Utilisez:__ '/tictactoe <@${user.id}>' pour accepter son defi`);
		await interaction.channel.send({content: `<@${user.id}>,`, embeds: [emb]});
    }
};