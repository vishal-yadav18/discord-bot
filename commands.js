const { REST, Routes } = require('discord.js');
require('dotenv').config()

const commands = [
  {
    name: 'animeinfo',
    description: 'Replies with anime info.',
    options: [
        {
            type: 3,
            name: 'anime',
            description: 'anime name',
            required: false
        }
    ]
  },
  {
    name: 'random',
    description: 'random Saiki Kusuo quotes.',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async() => {
    try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}})();