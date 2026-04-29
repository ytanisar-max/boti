const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Web Server for UptimeRobot to keep Render alive
app.get('/', (req, res) => {
  res.send('Minecraft AFK Bot is running 24/7');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Web server active on port ${PORT}`);
});

// Minecraft Bot Configuration
const botArgs = {
  host: 'in4-1.shulker.in', // Replace with your server IP
  port: 2843,
  username: 'Zyqorinx_Pro', 
  version: '1.21.11' 
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs);

  bot.on('spawn', () => {
    console.log('Bot successfully spawned in server');
    startAFK();
  });

  // Automatically reconnect if disconnected
  bot.on('end', () => {
    console.log('Connection lost. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Connection Error:', err);
  });
}

function startAFK() {
  // 1. Natural Movement (Walking and Jumping)
  setInterval(() => {
    if (!bot || !bot.entity) return;
    
    const actions = ['forward', 'back', 'left', 'right', 'jump'];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    
    bot.setControlState(randomAction, true);
    
    // Stops moving after 1.5 seconds to avoid falling into holes
    setTimeout(() => {
      bot.clearControlStates();
    }, 1500);
    
  }, 20000); // Moves every 20 seconds

  // 2. English Game-Related Chat Messages
  setInterval(() => {
    if (!bot || !bot.entity) return;
    
    const gameMessages = [
      "Has anyone found diamonds lately?",
      "The spawn area looks amazing!",
      "I need to gather some resources later.",
      "Watch out for Creepers, guys!",
      "Does anyone want to trade some emeralds?",
      "I love the building style on this server.",
      "Just exploring around for a bit.",
      "Minecraft's latest update is so cool!",
      "Going to mine some iron soon.",
      "Is it nighttime already? Better stay safe."
    ];
    
    const randomMsg = gameMessages[Math.floor(Math.random() * gameMessages.length)];
    bot.chat(randomMsg);
    
  }, 420000); // Sends a message every 7 minutes
}

createBot();

