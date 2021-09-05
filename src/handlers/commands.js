const fs = require('fs');
const conf = require('../../conf');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = (bot) => {
	const botId = conf.general.id;
	const guildId = conf.general.guild;
	bot.handleCommands = async (commandFolders, path) => {
		bot.commandArray = [];
		for (folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`${path}/${folder}`)
				.filter((file) => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = require(`../commands/${folder}/${file}`);
				bot.commands.set(command.data.name, command);
				bot.commandArray.push(command.data.toJSON());
			}
		}

		const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

		(async () => {
			try {
				console.log(`Rafraichissement des commandes '/' ...`.blue);

				await rest.put(Routes.applicationGuildCommands(botId, guildId), {
					body: bot.commandArray,
				});

				console.log(`Rafraichissement réussi`.green.bold);
			} catch (error) {
				console.log(`${error}`);
			}
		})();
	};
};