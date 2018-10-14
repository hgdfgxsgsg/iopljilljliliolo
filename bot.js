const Discord = require("discord.js");
const client = new Discord.Client();

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

const prefix = "#";
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
    .addField(`Other`, `[${prefix}مساعده]() > يريك هاذه الرساله[${prefix}الاتصال]() > لمعرفة سرعة استجابة البوت[${prefix} البوت]() > يريك معلومات عن البوت ${prefix}مساعدة]() > سيرفر المساعدة`)
    message.channel.send({ embed: embed });
  }

  if (message.content.toLowerCase().startsWith(prefix + `الاتصال`)) {
    message.channel.send(`Hoold on!`).then(m => {
    m.edit(`:ping_pong: Wew, made it over the ~waves~ ! **Pong!**\nMessage edit time is ` + (m.createdTimestamp - message.createdTimestamp) + `ms, Discord API heartbeat is ` + Math.round(client.ping) + `ms.`);
    });
}

if (message.content.toLowerCase().startsWith(prefix + `بلاغ`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Support")) return message.channel.send(`This server doesn't have a مساعدة role made, so the ticket won't be opened.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`يوجد لديك بلفعل بلاغ.`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "مساعدة");
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
        .addField(`Hey ${message.author.username}!`, `تم فتح التذكره بنجاح سيتم التواصل معك في اقرب وقت`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `اغلاق`)) {
    if (!message.channel.name.startsWith(`بلاغ-`)) return message.channel.send(`لا يمكنك فعل هاذا الا في شات التذكره.`);

    message.channel.send(`هل انت متاكد من اقفال التذكره؟؟ اذا كنت متاكد اكتب / -تاكيد.`)
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



client.on('message', message => {
       if(message.content.startsWith(`${prefix}مساعدة`)){
           if(!message.channel.guild) return message.channel.send("هاذا فقط لسيرفرات!")
           var embed = new Discord.RichEmbed()
           .setTitle("سيرفر المساعدة")
           .setURL("https://discord.gg/pB3dyx4")
           .setTimestamp()
           .setColor('#000000')
           message.channel.send({embed})
       }
   });










client.login(process.env.BOT_TOKEN);
