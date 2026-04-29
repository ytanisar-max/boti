const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => { res.send('Bot is active and moving!'); });
const PORT = process.env.PORT || 3000;
app.listen(PORT);

const botArgs = {
  host: 'in4-1.shulker.in', // Apnar server IP ekhane din
  port: 2843,
  username: 'Zyqorinx_Pro', 
  version: '1.21.1' 
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('Bot spawned! High activity mode ON.');
    startHighActivityAFK();
  });

  bot.on('end', () => {
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log(err));
}

function startHighActivityAFK() {
  // Movement Loop: Chola ebong Lafano
  setInterval(() => {
    if (!bot || !bot.entity) return;

    const actions = ['forward', 'back', 'left', 'right'];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];

    // 1. Chola suru korbe
    bot.setControlState(randomAction, true);
    
    // 2. Cholche obosthay majhe majhe lafabe
    if (Math.random() > 0.5) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
    }

    // 3. 4 second cholar por 1.5 second thambe (apnar requested timing)
    setTimeout(() => {
      bot.clearControlStates();
    }, 4000); 

  }, 5500); // Prottek cycle pray 5.5 second-er

  // Natural Chat Messages (English)
  setInterval(() => {
    if (!bot || !bot.entity) return;
    const gameMessages = [
      "This world is huge!",
      "I should build a base somewhere.",
      "Is anyone mining diamonds?",
      "Need to find some food soon.",
      "The view from here is great!",
      "Does this server have a shop?"
    ];
    bot.chat(gameMessages[Math.floor(Math.random() * gameMessages.length)]);
  }, 300000); // Every 5 minutes
}

createBot();
