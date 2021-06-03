## Simple Discord bot that just does role self assign with no bells and whistles
I wanted practice with node and with making discord bots and so when I wanted a simple bot I could use on a server to let people assign their own roles I made this. There are tons of other bots that can do as much, but often they are real swiss army knife tools with too many features and too much complexity. This bot has a simple interface—there are two pairs of commands. One for users and one for admins.

Users can add and remove roles with `!role <name>` and `!unrole <name>`, admins can choose which roles are able to be self assigned using `!self <name>` and `!unself <name>`. Access control for those commands is facilited by them only being available in a single channel (which presumably you would only allow admins to access).

This repl can be cloned to host it for your own server. Just add your discord bot token as an environment variable called `DISCORD_TOKEN` and add the channel id where admins can adjust which roles are assignable in an environment variable called `ADMIN_CHANNEL`. The prefix for the commands is also just a single variable `const command_prefix = "!";` on line 15 that you can change if using `!` for a prefix conflicts with another bot. See https://anidiots.guide/hosting/repl for more info about how to host a permanant bot for free on replit and see https://youtu.be/ibtXXoMxaho for more info about how to get a bot token and add your own bot to your server.