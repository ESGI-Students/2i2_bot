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

        if (user.id == interaction.member.id) return interaction.reply({embeds: [bot.errorEmbed(`Vous ne pouvez pas vous defier vous meme !`)]});

        for(let i = 0; i < bot.games.parties.length; i++){
            for(let y = 0; y < bot.games.parties[i].players.length; y++){
                if(bot.games.parties[i].players[y] == interaction.member.id) return interaction.reply({embeds: [bot.errorEmbed(`Vous etes déjà en partie`)]});
                if(bot.games.parties[i].players[y] == user.id) return interaction.reply({embeds: [bot.errorEmbed(`Cet utilisateur est déjà en partie`)]});
            }
        }

        if(bot.games.invitations[user.id]){
            if(bot.games.invitations[user.id].by == interaction.member.id) {
                return interaction.reply({embeds: [bot.errorEmbed(`Vous avez déjà defier cet utilisateur`)]});
            }
        }

        if(bot.games.invitations[interaction.member.id]){ 
            if(bot.games.invitations[interaction.member.id].by == user.id){     
                let players = [interaction.member.id, user.id];
                let party = bot.games.parties.push({
                    players: players,
                    game: 'Morpion',
                    playing: players[Math.random()],
                    state: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
                });

                let emb = new MessageEmbed() 
                    .setColor(conf.embeds.colors.blurple)
                    .setDescription(`_<@${interaction.member.id}> a accepter le défi de <@${user.id}>_`);
                await interaction.reply({embeds: [emb]});
                let emb2 = new MessageEmbed() 
                    .setColor(conf.embeds.colors.green)
                    .setDescription(`**Que le jeu commence !**`);
                await interaction.channel.send({embeds: [emb2]});
                await interaction.channel.send(`<@${party.playing}> est le premier a jouer !`);
                let embParty = new MessageEmbed() 
                    .setColor(conf.embeds.colors.blurple)
                    .setDescription(`❌: <@${interaction.member.id}>
                    ⭕: <@${user.id}>`);
                let partyGrid = ``;
                let partyMsg = await interaction.channel.send({content: `Partie de <@${interaction.member.id}> et <@${user.id}>:

                ${partyGrid}`, embeds: [embParty]});

                for(let i = 0; i < party.state.length; i++){
                    partyMsg.react(`:regional_indicator_${party.state[i].toLowerCase()}`)
                }
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
            
            __Utilisez:__ '**/tictactoe <@${interaction.member.id}>**' pour accepter son defi`);
		await interaction.reply({content: `<@${user.id}>,`, embeds: [emb]});
    }
};