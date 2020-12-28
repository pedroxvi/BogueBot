const Discord = require("discord.js");
const https = require("https");

module.exports.run = async (bot, message, args) => {
	let user_avatar = message.guild.member(message.mentions.users.first());

	// in the case of no mentions
	if (!user_avatar) {
		if (args.join(" ") === 'server') {
			https.get((gifGuildURL), (res) => {
				console.log(`statuscode: ${res.statusCode}`);
				if (res.statusCode != 200)
					return guildAvatar(message, false);
				else return guildAvatar(message, true);
			})
		} else {
			https.get((gifAuthorURL), async (res) => {
				console.log(`statuscode: ${res.statusCode}`)
				if (res.statusCode != 200)
					return authorAvatar(message, false);
				else return authorAvatar(message, true);
			})
		}
	}

	https.get((gifUserURL), (res) => {
		console.log(`statuscode: ${res.statusCode}`)
		if (res.statusCode != 200)
			return userAvatar(message, false, user_avatar)
		else return userAvatar(message, true, user_avatar);
	})
}

function userAvatar(message, validURL, uAvatar) {
	let gifUserURL = uAvatar.user.displayAvatarURL({
		format: 'gif'
	});

	let userEmbed = new Discord.MessageEmbed()
		.setTitle(`Avatar de **${uAvatar.user.username}**`)
		.setColor("#00FF00");
	if (validURL) {
		return message.channel.send(userEmbed.setImage(gifUserURL))
	} else {
		return message.channel.send(userEmbed.setImage(uAvatar.user.displayAvatarURL()))
	}
}

function guildAvatar(message, validURL) {
	let gifGuildURL = message.guild.iconURL({
		format: 'gif'
	});

	let serverEmbed = new Discord.MessageEmbed()
		.setTitle(`Ícone do servidor ${message.guild.name}`)
		.setColor("#00FF00");

	if (validURL) {
		return message.channel.send(serverEmbed.setImage(gifGuildURL));
	} else {
		return message.channel.send(serverEmbed.setImage(message.guild.iconURL()));
	}
}

function authorAvatar(message, validURL) {
	let gifAuthorURL = message.author.displayAvatarURL({
		format: 'gif'
	});

	let authorEmbed = new Discord.MessageEmbed()
		.setTitle(`Avatar de **${message.author.username}**`)
		.setColor("#00FF00");
	if (validURL) {
		return message.channel.send(authorEmbed.setImage(gifAuthorURL));
	} else {
		return message.channel.send(authorEmbed.setImage(message.author.displayAvatarURL()));
	}
}

module.exports.help = {
	name: "avatar",
	descr: 'Mostra o avatar de um usuário.',
	arg: ['membro']
}