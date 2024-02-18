import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const name = conn.getName(m.sender);
  if (!text) {
    throw `Hi *${name}*, do you want to talk? Respond with *${usedPrefix + command}* (your message)\n\n📌 Example: *${usedPrefix + command}* Hi bot`;
  }
  
  m.react('🗣️');

  const msg = encodeURIComponent(text);
  const uid = encodeURIComponent(m.sender);
  
  const res = await fetch(`http://api.brainshop.ai/get?bid=178542&key=JeCWodCBpk5lxmIa&uid=${uid}&msg=${msg}`);

  const json = await res.json();
  
  let reply = json.cnt;
  m.reply(reply);
};

handler.help = ['bot'];
handler.tags = ['fun'];
handler.command = ['bot2', 'fun'];

export default handler;