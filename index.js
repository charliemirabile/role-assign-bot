const Discord = require('discord.js');
const http = require('http');

const Database = require('@replit/database');
const db = new Database();

require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const command_prefix = "!";
const admin_channel = process.env.ADMIN_CHANNEL;

client.on('message', async message => {
  //ignore other bots
  if(message.author.bot)
    return;
  
  //ignore any message that does not start with our prefix
  if (!message.content.startsWith(command_prefix))
    return;

  //separate our "command" name, and our "arguments" for the command
  const args = message.content.slice(command_prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "role") {
    if(args.length < 1)
      return message.reply("You need to specify a role");

    role_name = args.join(' ');

    target_role = message.guild.roles.cache.find(role => role.name === role_name);

    if(!target_role)
      return message.reply("That isn't a valid role");

    if(await db.get(role_name) !== "ok")
      return message.reply(`Your aren't allowed to self assign ${role_name}`);

    const requester = message.member;

    await requester.roles.add(target_role)
      .then(res => message.reply(`gave ${requester.user.tag} the role ${role_name}`))
      .catch(error => message.reply(`Sorry ${requester.user.tag} I couldn't give you ${role_name} due to ${error}`));
  }

  else if(command === "unrole") {
    if(args.length < 1)
      return message.reply("You need to specify a role");

    role_name = args.join(' ');

    target_role = message.guild.roles.cache.find(role => role.name === role_name);

    if(!target_role)
      return message.reply(`${role_name} isn't a valid role`);

    if(await db.get(role_name) !== "ok")
      return message.reply(`Your aren't allowed to self assign ${role_name}`);

    const requester = message.member;

    await requester.roles.remove(target_role)
      .then(res => message.reply(`removed role from ${requester.user.tag}`))
      .catch(error => message.reply(`Sorry ${requester.user.tag} I couldn't remove ${role_name} due to  ${error}`));
  }

  else if(command === "self") {
    if(message.channel.id !== admin_channel)
      return message.reply("You aren't allowed to do that here");

    if(args.length < 1)
      return message.reply("You need to specify a role");

    role_name = args.join(' ');

    target_role = message.guild.roles.cache.find(role => role.name === role_name);

    if(!target_role)
      return message.reply(`${role_name} isn't a valid role`);

    await db.set(role_name,"ok");

    return message.reply(`the role ${role_name} has been enabled for self assign`);
  }

  else if(command === "unself") {
    if(message.channel.id !== admin_channel)
      return message.reply("You aren't allowed to do that here");

    if(args.length < 1)
      return message.reply("You need to specify a role");

    role_name = args.join(' ');

    target_role = message.guild.roles.cache.find(role => role.name === role_name);

    if(!target_role)
      return message.reply(`${role_name} isn't a valid role`);

    await db.delete(role_name);

    return message.reply(`the role ${role_name} has been disabled for self assign`);
  }

  else if(command === "help") {
    return message.reply(
        `Hello, I am role bot. Display this menu with \`${command_prefix}help\`.
        You can check tham I am online with \`${command_prefix}ping\`
        people can self assign roles with \`${command_prefix}role <role name>\`
        people can self remove roles with \`${command_prefix}unrole <role name>\`
        admins can enable self assigning with \`${command_prefix}self <role name>\`
        admins can disable self assigning with \`${command_prefix}unself <role name>\``);
  }

  else if(command === "ping") {
    return message.reply("pong");
  }

  else {
    return message.reply("I dont recognize that command");
  }
});

client.login()
.then(res => http.createServer((req, res) => res.writeHead(200).end('ok')).listen(3000))
.catch(error => console.log(`Unable to log in due to ${error}`));
