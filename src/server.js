import { REST, Routes } from 'discord.js';

const commands = [
  {
    name: 'get-winner',
    description: 'Replies with winner current winner for the day.',
  },
  {
    name: 'ping',
    description: 'Replies with winner current winner for the day.',
  },
];

export async function updateCommands(token, applicationId) {

    const rest = new REST({ version: '10' }).setToken(token);
    
    try {
        console.log('Started refreshing application (/) commands.');
        
        await rest.put(Routes.applicationCommands(applicationId), { body: commands });
        
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}