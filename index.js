const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Web Server for UptimeRobot
app.get('/', (req, res) => { res.send('AFK Bot with Auto-Auth (anisarkar) is online!'); });
const PORT = process.env.PORT || 3000;
app.listen(PORT);

const botArgs = {
  host: 'in4-1.shulker.in', // Replace with your server IP
  port: 2843,
  username: 'Zyqorinx_Pro', 
  version: '1.21.11' 
};

// --- CONFIGURATION ---
const PASSWORD = 'anisarkar'; 
// ---------------------

let bot;
let lastMessageTime = 0;

function createBot() {
  if (bot) bot.quit();
  bot = mineflayer.createBot(botArgs);

  // --- AUTO LOGIN / REGISTER LOGIC ---
  bot.on('messagestr', (message) => {
    const msg = message.toLowerCase();
    
    if (msg.includes('/register')) {
      bot.chat(`/register ${PASSWORD} ${PASSWORD}`);
      console.log('[AUTH]: Registered successfully.');
    } 
    else if (msg.includes('/login')) {
      bot.chat(`/login ${PASSWORD}`);
      console.log('[AUTH]: Logged in successfully.');
    }
  });

  bot.on('spawn', () => {
    console.log('Bot spawned successfully!');
  });

  // --- HIGH ACTIVITY MOVEMENT ---
  setInterval(() => {
    if (!bot || !bot.entity) return;
    const actions = ['forward', 'back', 'left', 'right'];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];

    bot.setControlState(randomAction, true);
    if (Math.random() > 0.5) {
        bot.setControlState('jump', true);
        setTimeout(() => { if (bot.setControlState) bot.setControlState('jump', false); }, 500);
    }
    setTimeout(() => { if (bot.clearControlStates) bot.clearControlStates(); }, 4000); 
  }, 5500);

  // --- 5-MINUTE CHAT LOGIC ---
  setInterval(() => {
    const currentTime = Date.now();
    if (!bot || !bot.entity || (currentTime - lastMessageTime < 300000)) return;

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
    lastMessageTime = currentTime;
    console.log(`[CHAT]: ${randomMsg}`);
  }, 10000);

  // --- AUTO RECONNECT ---
  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Error:', err));
}

createBot();

