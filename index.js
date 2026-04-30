const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => { res.send('Bot is active and moving!'); });
const PORT = process.env.PORT || 3000;
app.listen(PORT);

const botArgs = {
  host: 'in4-1.shulker.in', // Replace with your server IP
  port: 2843,
  username: 'Zyqorinx_Pro', 
  version: '1.21.1' 
};

let bot;
let messageInterval;
let moveInterval;

function createBot() {
  // Purono interval gulo clear kora dorkar jate multiple bot na hoye jay
  clearInterval(messageInterval);
  clearInterval(moveInterval);

  bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('Bot spawned! High activity mode ON.');
    startHighActivityAFK();
  });

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Error:', err));
}

function startHighActivityAFK() {
  // 1. Movement Loop (Active Movement)
  moveInterval = setInterval(() => {
    if (!bot || !bot.entity) return;

    const actions = ['forward', 'back', 'left', 'right'];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];

    bot.setControlState(randomAction, true);
    
    if (Math.random() > 0.5) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
    }

    setTimeout(() => {
      if(bot.clearControlStates) bot.clearControlStates();
    }, 4000); 

  }, 5500); 

  // 2. Optimized Chat Messages (Exactly every 5 minutes)
  messageInterval = setInterval(() => {
    if (!bot || !bot.entity) return;
    
    const gameMessages = [
      "This world is huge!",
      "I should build a base somewhere.",
      "Is anyone mining diamonds?",
      "Need to find some food soon.",
      "The view from here is great!",
      "Does this server have a shop?",
      "I love exploring this map.",
      "Creeper? Aw man!",
      "Does anyone have spare iron?",
      "Working on my skills!"
    ];

    const randomMsg = gameMessages[Math.floor(Math.random() * gameMessages.length)];
    bot.chat(randomMsg);
    console.log('Sent message:', randomMsg); // Console-e check korar jonno
    
  }, 300000); // 300,000 ms = Exactly 5 minutes
}

createBot();

