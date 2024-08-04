const { Client, GatewayIntentBits } = require('discord.js');
const fetchDetails = require('./fetchDetails');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'animeinfo') {
        const input = options.getString('anime');
        try {
            const data = await fetchDetails(input);
            console.log(data);
            await interaction.reply(data);
        } catch (error) {
            console.error('Error fetching anime details:', error);
            await interaction.reply('There was an error fetching anime details.');
        }
    } else if (commandName === 'random') {
        const randomArray = [
            "I hate attracting attention but I hate owing someone even more.",
            "Good grief. Ordinary people sure are a pain.",
            "There’s no such thing as a person without thoughts.",
            "Well, don’t let it get you down. There are as many girls as there are stars in the sky. Although stars are always out of reach.",
            "Even when you were so depressed and emotionally unstable, the taste of your coffee jelly stayed the same. This is undeniably the work of a pro and that’s why the customers will return on their own even without using ESP.",
            "No matter how big an accident is, it’s triggered by a minor thing, so a minor change can avoid it entirely.",
            "I am the world’s unhappiest man who has had everything snatched away since the moment of my birth."
        ];

        const randomIndex = Math.floor(Math.random() * randomArray.length);
        const emoji = process.env.EMOJI_NAME && process.env.EMOJI_ID
            ? `<:${process.env.EMOJI_NAME}:${process.env.EMOJI_ID}>`
            : '';

        await interaction.reply(
            `"${randomArray[randomIndex]} ${emoji}"`
        );
    }
});

client.login(process.env.TOKEN);
