# guessthegame

A bot that reads the results for guessthegame in a channel. It can assign a winner and post the score and save the score in a google sheet. 
The bot saves a score for everyone playing in the channel. The score can than be queried. You can get the best score for the week, the month, the year and overall.


# Run localy

- Get the .env file from 1password
- If the bot is configured to point to the aws url, remove the enpoint.
    - https://discord.com/developers/applications
- run  `npm start` script is setup to connect