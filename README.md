# Quoter discord bot
This is the code of the [quoter](https://discord.com/oauth2/authorize?client_id=1027165461407858710&scope=bot&permissions=415001606208) bot made by [Manpreet](https://dsc.gg/chillclubop)

## How to run the bot?
here are the steps on how to run the bot code.

### Intializing
**You can skip this part if you have made a discord bot application and general things like nodeJS and the bot files already installed.**

1. Donload the [nodeJS](https://nodejs.org/en/download/) installer.
    1. Go to the website.
    2. select installer suitable for you.
    3. installer will walk you through the steps.
2. Create a [discord application](https://discord.com/developers/applications).
    1. Login if it asks to.
    2. Click the `new application` button.
    3. Enter a unique name and other things.
    4. Edit the fields you want such as the profile picture and desription/About me/bio
    5. Go to `bot` section and click `add bot` and press `yes, do it!`
    6. Press `reset token` and then `yes, do it!` and enter your 2FA code if it asks.
    7. Click `copy` or copy the token manually also copy the `application id` from general information, we will ned these later. 
    8. invite your bot by going to `https://discord.com/oauth2/authorize?client_id=<YOUR APPLICATION ID>&scope=bot&permissions=415001606208` 
3. Download the bot files.
    * use `git clone` to clone this [repo](https://github.com/Its-manpreet/discord-bot).
    * or download the [zip file](https://github.com/Its-manpreet/discord-bot/archive/refs/heads/main.zip) and unzip it.
    
### Creating the nessary files
1. Navigate into the bot files and create a folder named `logs` .
2. Navigate into the `logs` folder and create a txt file named `lognum.txt`.
3. In the `lognum.txt` file enter a number such as 0 and then save and close it.

### Entering the config items
1. Navigate back into the bot files and go to `config` folder and open `config.json`.
2. Fill the token and application id with the token that you copied earlier
3. Enter guild id and [top.gg](https://top.gg) token if you are a advanced developer
    1. If you don't have a top.gg token go to index.js file
    2. Comment this out by adding `/*` at start and `*/` at the end
    ```javascript
    //top.gg
    const api = new Topgg.Api(topggtoken)

    const ap = AutoPoster(topggtoken, client)

    ap.on('posted', () => {
	console.log('Posted stats to Top.gg!')
    })
    ```
    
### Starting the bot
1. Open your terminal and go to the bot files
    1. Open the Terminal 
    1. Type `<drive name>`of where your bot files are eg : `C:`
    2. Type `cd <directory` of where your bot files are eg: `cd desktop/bot`
2. Type `npm i` and let it install the files
3. Type `node deploy-commands.js` and let it deploy the commands
2. Type `node index.js` or `npm start` to start the bot