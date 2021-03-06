const Discord = require("discord.js");
const botconfig = require.main.require('./botconfig.json');

module.exports.run = async (bot, message, args) => {
    const report_file = require('./report.js');
    if (!message.guild.member(message.author).hasPermission('MANAGE_ROLES')) {
        return message.channel.send(new Discord.MessageEmbed()
            .setTitle('Você não tem permissões suficientes para isso')
            .setDescription("Ao invés disso, use ``" + `${botconfig.prefix}${report_file.help.name} [${report_file.help.arg.join('] [')}]` + "``"));
    }

    let mute = message.guild.member(message.mentions.users.first());
    if (!mute)
        return message.channel.send(new Discord.MessageEmbed()
            .setTitle("Uso incorreto do comando")
            .setDescription("``" + `${botconfig.prefix}${this.help.name} [${this.help.arg}]` + "``")
            .setColor('#FF0000'));
    else if (mute.hasPermission('ADMINISTRATOR'))
        return message.channel.send(new Discord.MessageEmbed()
            .setTitle('Permissões insuficientes')
            .setDescription("Você não pode silenciar um **administrador**.")
            .setColor("#FF0000"));
    else {
        if (!message.channel.permissionsFor(mute).has('SEND_MESSAGES'))
            return message.channel.send(new Discord.MessageEmbed()
                .setDescription(`**${mute.displayName}** já está silenciado.`)
                .setColor("#FF0000"))
        else
            try {
                message.channel.overwritePermissions([{
                    id: mute.id,
                    deny: ['SEND_MESSAGES']
                }])
            } catch (e) {
                return console.log(e);
            }
    }

    const desmute_file = require('./desmute');
    return message.channel.send(new Discord.MessageEmbed()
        .setTitle(`**${mute.displayName}** foi silenciado.`)
        .setDescription("Use ``" + `${botconfig.prefix}${desmute_file.help.name} @${mute.displayName}` + "`` para desmuta-lo.")
        .setColor("#00FF00"));
}


module.exports.help = {
    name: "mute",
    descr: 'Muta um membro do servidor.',
    arg: ['membro']
}