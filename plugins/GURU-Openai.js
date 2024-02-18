
import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const name = conn.getName(m.sender);
  if (!text) {
    throw `Hi *${name}*, do you want to talk? Respond with *${usedPrefix + command}* (your message)\n\n📌 Example: *${usedPrefix + command}* Hi bot`;
  }
  
  m.react('🗣️');

  const msg = encodeURIComponent(text);
  const brainId = '178542';
  const apiKey = 'JeCWodCBpk5lxmIa';

  const brainshopEndpoint = `https://api.brainshop.ai/get?bid=${brainId}&key=${apiKey}&uid=${m.sender}&msg=${msg}`;
  
  const res = await fetch(brainshopEndpoint);
  const json = await res.json();
  
  let reply = json.cnt;
  m.reply(reply);
};

handler.help = ['bot'];
handler.tags = ['fun'];
handler.command = ['bot2', 'brainbot'];

export default handler;