require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType } = require('discord.js');
const axios = require('axios');
const fs = require('fs');

// Ajout de logs pour vérifier les clés
console.log('DISCORD_TOKEN:', process.env.DISCORD_TOKEN ? 'Loaded' : 'Missing');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Loaded' : 'Missing');

// Load responses from JSON database
let responses = [];
try {
    const data = fs.readFileSync('./responses.json', 'utf8');
    responses = JSON.parse(data);
    console.log('Loaded responses from database.');
} catch (error) {
    console.error('Error loading responses from database:', error);
}

const userConversations = {};

// Create a new Discord client
const client = new Client({ intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
] });

// Log when the bot is ready
client.once('clientReady', () => {
    console.log(`Bot is online! Logged in as ${client.user.tag}`);
});

// Add logging to debug message reception
console.log('Intents configured:', client.options.intents);

client.on('raw', (packet) => {
    console.log('Received raw event:', packet.t);
});

// Remplacement de l'événement `ready` par `clientReady`
client.once('clientReady', () => {
    console.log('Bot successfully connected to Discord.');
});

client.on('clientReady', () => {
    console.log('Bot is ready and connected to Discord.');
});

// Annulation des modifications récentes pour revenir à l'état précédent
client.on('messageCreate', async (message) => {
    console.log(`Received message: ${message.content} from ${message.author.tag}`);

    // Ignore messages from bots
    if (message.author.bot) {
        console.log('Message ignored: sent by a bot.');
        return;
    }

    // Log the type of channel
    console.log(`Channel type: ${message.channel.type}`);

    // Vérification supplémentaire pour les types de canaux
    if (message.channel.type !== ChannelType.DM && message.channel.type !== ChannelType.GuildText) {
        console.log('Message ignored: unsupported channel type.');
        return;
    }

      // ✅ AJOUT : Initialiser l'historique si nécessaire
      if (!userConversations[message.author.id]) {
        userConversations[message.author.id] = [];
    }

    // ✅ AJOUT : Ajouter le message de l'utilisateur à l'historique
    userConversations[message.author.id].push({ role: 'user', content: message.content });

    // ✅ AJOUT : Limiter l'historique pour les 10 derniers messages
    if (userConversations[message.author.id].length > 10) {
        userConversations[message.author.id].shift();
    }

    // Vérification des réponses dans responses.json
    const userMessage = message.content.toLowerCase();
    if (userMessage === 'bonjour') {
        const response = responses.find(r => userMessage.includes(r.context));
        if (response) {
            console.log(`Found a matching response for context: ${response.context}`);
            await message.reply(response.message);
            return;
        }
    } else {
        // Si le message est différent de "bonjour", utiliser l'API OpenAI
        try {
            console.log('Calling OpenAI API to generate a response...');
            const gptResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: 'gpt-4o',
                messages: [
                    { 
                        role: 'system', 
                        content: `Tu es "Plan B", le pote spécialisé dans les relations sociales.
                      Ta mission est d’aider les utilisateurs à décliner une invitation (date, dîner, soirée, réunion).
                      Tu génères toujours des excuses crédibles, adaptées au contexte.

                      Avant tout, demande la nature de l'invitation (date, dîner, soirée, réunion) et le contexte (relation avec la personne, lieu, etc.), a cahque fois, sauf si l'utilisateur l'a déjà précisé.
                      
                      Règles :
                      - Sois toujours respectueux et compréhensif.
                      - Donne directement le message à envoyer.
                      - Évite tout contenu lié à la mort, à la maladie grave.
                      - Tu peux utiliser touts types d'excuses (travail, famille, santé, etc.) mais elles doivent rester crédibles.
                      - Tout excuse est bonne à prendre, du moment qu'elle est crédible.
                      - Ton ton est familier, taquin, drôle, comme un ami proche.
                      - Pas de format formel : tu parles comme une vraie personne, avec un ton léger.
                      - Oublie pas que tu ne sers qu'aider à décliner des invitations, rien d'autre.
                      - Ne dis jamais que tu es une IA.
                      

                      
                    `
                      },                    
                      ...userConversations[message.author.id]
                ],
                max_tokens: 150
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                }
            });

            const gptData = gptResponse.data.choices[0].message.content.trim();
            console.log(`Generated GPT response: ${gptData}`);

            // Répondre à l'utilisateur avec la réponse générée
            await message.reply(gptData);

            userConversations[message.author.id].push({ role: 'assistant', content: gptData });

        } catch (error) {
            console.error('Error with OpenAI API:', error);
            await message.reply('Désolé, je ne peux pas répondre pour le moment.');
        }
    }
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN).then(() => {
    console.log('Plan B is online and ready to assist!');
}).catch(console.error);