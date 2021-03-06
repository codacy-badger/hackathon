    
const { greyscale } = require("discord.js-canvas");
const { createCanvas, loadImage } = require("canvas");
const request = require("node-superfetch");
const Discord = require("discord.js");

module.exports.run = async (bot, message) => {

    let image = message.mentions.members.first() ? message.mentions.users.first().displayAvatarURL({format: 'png', size: 512}) : message.author.displayAvatarURL({format: 'png', size: 512});


    try {
        const { body } = await request.get(image);
        const data = await loadImage(body);
        const canvas = createCanvas(data.width, data.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(data, 0, 0);
		greyscale(ctx, 0, 0, data.width, data.height);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'greyscale.png');

        message.reply(attachment);
    } catch (err) {
        message.reply("Something went wrong please try again!!");
       // eslint-disable-next-line no-undef
       console.log(err);
    }
};

module.exports.help = {
    name: "greyscale",
		category: "Colour",
		description: "Shows contrast sepia correction"
};