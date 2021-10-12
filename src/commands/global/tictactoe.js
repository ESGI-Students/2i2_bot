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
                bot.games.invitations[interaction.member.id].accepted = true;

                let members = [interaction.member.id, user.id];
                const partiesCount = bot.games.parties.length;
                bot.games.parties[partiesCount] = {
                    players: members,
                    game: 'Morpion',
                    playing: members[0],
                    state: ["↖️","⬆️","↗️","⬅️","⏺️","➡️","↙️","⬇️","↘️"],
                };

                let party = bot.games.parties[partiesCount];

                let emb = new MessageEmbed() 
                    .setColor(conf.embeds.colors.blurple)
                    .setDescription(`_<@${interaction.member.id}> a accepté le défi de <@${user.id}>_`);
                await interaction.reply({embeds: [emb]});
                let emb2 = new MessageEmbed() 
                    .setColor(conf.embeds.colors.green)
                    .setDescription(`**Que le jeu commence !**`);
                await interaction.channel.send({embeds: [emb2]});
                await interaction.channel.send(`----------------------------------------------------------
<@${party.players[0]}> est le premier a jouer !
----------------------------------------------------------`);
                let partyGrid = `⬜⬜⬜\n⬜⬜⬜\n⬜⬜⬜`;
                let embParty = new MessageEmbed() 
                    .setColor(conf.embeds.colors.blurple)
                    .setDescription(`Partie de <@${interaction.member.id}> et <@${user.id}>:
                    C'est a <@${party.playing}> de mettre un ❌\n\n${partyGrid}
                    
                    ❌ : <@${interaction.member.id}>
                    ⭕ : <@${user.id}>`);
                let partyMsg = await interaction.channel.send({embeds: [embParty]});

                for(let i = 0; i < party.state.length; i++){
                    partyMsg.react(party.state[i])
                }

                party.message = partyMsg.id;
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
		let invitMsg = await interaction.reply({content: `<@${user.id}>,`, embeds: [emb]});

        setTimeout(() => {
            if(!bot.games.invitations[user.id]) return;
            if(bot.games.invitations[user.id].accepted) return;

            invitMsg.delete();
            await interaction.reply({content: `<@${interaction.member.id}>, votre demande de defi vers <@${user.id}> a expiré !`});
            bot.games.invitations[user.id] = null;
        }, 5*60*1000)
    }
}