import { REST, Routes } from 'discord.js';

const { TOKEN, APPLICATION_ID } = process.env;

const commands = [
  {
    name: 'get-winner',
    description: 'Replies with winner current winner for the day.',
  },
];

export async function startServer() {

    const rest = new REST({ version: '10' }).setToken(TOKEN);
    
    try {
        console.log('Started refreshing application (/) commands.');
        
        await rest.put(Routes.applicationCommands(APPLICATION_ID), { body: commands });
        
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}