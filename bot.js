const Discord = require("discord.js");
const client = new Discord.Client();

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

const prefix = "-";
const token = "process.env.BOT_TOKEN";

client.on("ready", () => {
  console.log("Vulnix | Logged in! Server count: ${client.guilds.size}");
  client.user.setGame(`Support Magic |${prefix}new`);
});


client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `مساعده`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:mailbox_with_mail: تذكرة Help`)
    .setColor(0xCF40FA)
    .setDescription(`مرحبا! أنا تذكرة ، و دسكورد بوت لأشياء تذكرة دعم أكثر من رائع وأكثر! فيما يلي أوامري:`)
    .addField(`Tickets`, `[${prefix}بلاغ]() > لطلب المساعده في السيرفر[${prefix}اغلاق]() > لاغلاق تذكرتك الحاليه`)
    .addField(`Other`, `[${prefix}مساعده]() > يريك هاذه الرساله[${prefix}الاتصال]() > لمعرفة سرعة استجابة البوت[${prefix}البوت]() > يريك معلومات عن البوت`)
    message.channel.send({ embed: embed });
  }

  if (message.content.toLowerCase().startsWith(prefix + `الاتصال`)) {
    message.channel.send(`Hoold on!`).then(m => {
    m.edit(`:ping_pong: Wew, made it over the ~waves~ ! **Pong!**\nMessage edit time is ` + (m.createdTimestamp - message.createdTimestamp) + `ms, Discord API heartbeat is ` + Math.round(client.ping) + `ms.`);
    });
}

if (message.content.toLowerCase().startsWith(prefix + `بلاغ`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Support");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. Our **Support Team** will be here soon to help.`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `اغلاق`)) {
    if (!message.channel.name.startsWith(`بلاغ-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);

    message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`-تاكيد\`. This will time out in 10 seconds and be cancelled.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-تاكيد', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('تم تقفيلها').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

});

client.on('message', message => {
     if (message.content === (prefix + "البوت")) {
         if(!message.channel.guild) return;
     let embed = new Discord.RichEmbed()//DIAMONDCODES
  .setColor('#000000')
  .addField("** ✅ Servers: **" , client.guilds.size)//DIAMONDCODES
  .addField("** ✅ Users: **" , client.users.size)//DIAMONDCODES
  .addField("** ✅ Channels: **" , client.channels.size)//DIAMONDCODES
    .addField("** 🚀 Ping **" , Date.now() - message.createdTimestamp)//DIAMONDCODES
    .setTimestamp()//DIAMONDCODES
  message.channel.sendEmbed(embed);//DIAMONDCODES
    }
});


client.login(process.env.BOT_TOKEN);
