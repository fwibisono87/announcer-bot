require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = process.env.prefix;
const seperator = process.env.seperator;

let announcementChannel = "・announcements";
let promotionChannel = "promote-yourself";

function parseArgs(message) {
  return message.split(seperator);
}

function sanitizeMsg(message) {
  return message.content.slice(prefix.length).trim();
}

function announce(message, args) {
  if (message.channels.name === "bot-commands") {
    const greeting = args[1];
    const streamTitle = args[2];
    const twitchURL = args[3];
    const ytURL = args[4];
    const streamTime = "<t:" + Math.floor(Date.parse(args[5]) / 1000) + ":R>";
    const schedMessage = `${greeting} ${streamTime}, with ${streamTitle} \nTwitch URL: ${twitchURL} \nYoutube URL: ${ytURL}`;
    try {
      message.guild.channels.cache
        .find((i) => i.name === announcementChannel)
        .send(schedMessage);
      message.reply("Announced!");
    } catch (error) {
      message.reply(
        "Some error occured!, have you run the config yet? Tell the owner to check the bloody logs!"
      );
      console.log(error);
    }
  } else {
    message.reply("You can only use this command in the bot-commands channel!");
  }
}

function setAnnouncementChannel(channelName) {
    if (message.channels.name === "bot-commands") {
  announcementChannel = channelName;
    } else {
        message.reply("You can only use this command in the bot-commands channel!");
    }
}

function setPromotionChannel(channelName) {
    if (message.channels.name === "bot-commands") {
  promotionChannel = channelName;
    } else {
        message.reply("You can only use this command in the bot-commands channel!");
    }
}

function promote(message, args) {
  const greeting = args[1];
  const URL = args[2];
  const streamTime = "<t:" + Math.floor(Date.parse(args[3]) / 1000) + ":R>";
  const schedMessage = `${greeting} ${streamTime} at ${URL}`;
  try {
    message.reply("Promoted!");
    message.guild.channels.cache
      .find((i) => i.name === promotionChannel)
      .send(schedMessage);
  } catch (error) {
    console.log(error);
    message.reply(
        "Some error occured!, have you run the config yet? Tell the owner to check the bloody logs!"
      );
  }
}

client.on("messageCreate", function (message) {
  if (message.author.bot || !message.content.startsWith(prefix)) return;
  else {
    const cleanMessage = sanitizeMsg(message);
    const args = parseArgs(cleanMessage);
    if (args[0] === "ping") {
      message.reply(`Pong!`);
    } else if (args[0] === "announce") {
      announce(message, args);
    } else if (args[0] === "promote") {
      promote(message, args);
    } else if (args[0] === "Set Announcement Channel") {
      setAnnouncementChannel(args[1]);
      message.guild.channels.cache
        .find((i) => i.name === "bot-commands")
        .send("Announcement Channel Set to " + args[1]);
    } else if (args[0] === "Set Promotion Channel") {
      setPromotionChannel(args[1]);
      message.guild.channels.cache
        .find((i) => i.name === "bot-commands")
        .send("Promotion Channel Set to " + args[1]);
    }
    else{
        message.reply("Invalid Command! Here's a list of commands: \n\n" + '`' + prefix + " <> ping`: Shows that the bot works \n" + '`' + prefix + " announce <> <greeting> <> <stream title> <> <twitch url> <> <youtube url> <> <stream time>`: Server owner exclusive! \n Example: `!Oi announce <> The cat is next live at <> Five Night's at Freddy's Sister Location <> A Twitch Link <> A Youtube Link <> 15 April 2022 11:30:00 PM EDT` \n"+ '`' + prefix + " promote <> <greeting> <> <stream url> <> <stream time>` \n Public announcements! \n Example: `!Oi promote <> [This is a test message] Check out Sonickuso at <> A Link  <> 16 April 2022 12:48:00 EST` \n");
    }
  }
});

console.log("Starting!");
try {
  client.login(process.env.BOT_TOKEN);
  console.log("Login Successful!");
} catch (error) {
  console.log("Login Error!");
  console.log(error);
}
