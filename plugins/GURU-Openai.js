import fetch from 'node-fetch';

const brainId = '178542';
const apiKey = 'JeCWodCBpk5lxmIa';

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text && !(m.quoted && m.quoted.text)) {
    throw `Please provide some text or quote a message to get a response.`;
  }

  if (!text && m.quoted && m.quoted.text) {
    text = m.quoted.text;
  }

  try {
    m.react(rwait)
    const { key } = await conn.sendMessage(m.chat, {
      image: { url: 'https://telegra.ph/file/c3f9e4124de1f31c1c6ae.jpg' },
      caption: 'Thinking....'
    }, {quoted: m})
    conn.sendPresenceUpdate('composing', m.chat);
    const prompt = encodeURIComponent(text);

    const brainshopEndpoint = `https://api.brainshop.ai/get?bid=${brainId}&key=${apiKey}&uid=${m.sender}&msg=${prompt}`;

    try {
      let response = await fetch(brainshopEndpoint);
      let data = await response.json();
      let result = data.cnt;

      if (!result) {
        throw new Error('No valid response from the BrainShop API');
      }

      await conn.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
            imageMessage: { caption: result }
          }
        }
      }, {});
      m.react(done);
    } catch (error) {
      console.error('Error from the BrainShop API:', error);

      const model = 'llama';
      const senderNumber = m.sender.replace(/[^0-9]/g, ''); 
      const session = `GURU_BOT_${senderNumber}`;
      const guru2 = `https://ultimetron.guruapi.tech/gpt3?prompt=${prompt}`;

      let response = await fetch(guru2);
      let data = await response.json();
      let result = data.completion;

      await conn.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
            imageMessage: { caption: result }
          }
        }
      }, {});
      m.react(done);
    }

  } catch (error) {
    console.error('Error:', error);
    throw `*ERROR*`;
  }
};

handler.help = ['chatgpt'];
handler.tags = ['AI'];
handler.command = ['bro', 'ai', 'brainbot'];

export default handler;
