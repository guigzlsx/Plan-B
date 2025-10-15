# 🤖 Plan B - Discord Bot

**Plan B** est un bot Discord spécialisé dans les relations sociales, conçu pour t'aider à décliner poliment des invitations avec des excuses crédibles et adaptées au contexte.

## 📋 Description

Ce bot utilise l'API OpenAI (GPT-4) pour générer des excuses personnalisées en fonction de la nature de l'invitation (date, dîner, soirée, réunion) et du contexte relationnel. Avec un ton familier, taquin et drôle, Plan B se comporte comme un ami proche qui te sort d'affaire.

## ✨ Fonctionnalités

- 💬 **Conversation contextuelle** : Le bot maintient un historique des 10 derniers messages pour des réponses cohérentes
- 🎭 **Génération d'excuses crédibles** : Utilise GPT-4 pour créer des excuses adaptées à chaque situation
- 🚫 **Filtres de sécurité** : Évite tout contenu lié à la mort ou aux maladies graves
- 📝 **Réponses personnalisées** : Adapte le ton et le style selon le contexte de l'invitation
- 🔄 **Support multi-canaux** : Fonctionne en messages privés (DM) et sur les serveurs Discord

## 🛠️ Technologies utilisées

- **Node.js** : Environnement d'exécution JavaScript
- **Discord.js v14** : Bibliothèque pour interagir avec l'API Discord
- **OpenAI API (GPT-4)** : Génération intelligente de réponses
- **Axios** : Requêtes HTTP vers l'API OpenAI
- **dotenv** : Gestion des variables d'environnement

## 📦 Installation

### Prérequis

- Node.js (v18 ou supérieur)
- Un compte Discord avec accès au Developer Portal
- Une clé API OpenAI

### Étapes d'installation

1. **Clone le dépôt**
   ```bash
   git clone <url-du-repo>
   cd bot_discord
   ```

2. **Installe les dépendances**
   ```bash
   npm install
   ```

3. **Configure les variables d'environnement**
   
   Crée un fichier `.env` à la racine du projet :
   ```env
   DISCORD_TOKEN=ton_token_discord_ici
   OPENAI_API_KEY=ta_clé_openai_ici
   ```

4. **Obtenir les clés nécessaires**
   
   - **Discord Token** : 
     - Va sur [Discord Developer Portal](https://discord.com/developers/applications)
     - Crée une nouvelle application
     - Dans l'onglet "Bot", copie le token
   
   - **OpenAI API Key** :
     - Va sur [OpenAI Platform](https://platform.openai.com/)
     - Crée une clé API dans les paramètres

## 🚀 Utilisation

### Démarrer le bot

```bash
node bot.js
```

Tu devrais voir dans la console :
```
DISCORD_TOKEN: Loaded
OPENAI_API_KEY: Loaded
Loaded responses from database.
Bot is online! Logged in as Plan B#1234
```

### Inviter le bot sur ton serveur

1. Va sur le [Discord Developer Portal](https://discord.com/developers/applications)
2. Sélectionne ton application
3. Dans "OAuth2" > "URL Generator" :
   - Coche `bot`
   - Sélectionne les permissions nécessaires :
     - `Send Messages`
     - `Read Messages/View Channels`
     - `Read Message History`
4. Copie l'URL générée et ouvre-la dans ton navigateur

### Interagir avec le bot

Envoie un message au bot (en DM ou sur un serveur) :

```
Salut Plan B, j'ai besoin d'une excuse pour annuler un dîner avec mon ex
```

Le bot te demandera des détails sur le contexte et générera une excuse crédible et adaptée.

## 📁 Structure du projet

```
bot_discord/
├── bot.js              # Fichier principal du bot
├── responses.json      # Base de données de réponses prédéfinies
├── package.json        # Dépendances et configuration npm
├── package-lock.json   # Verrouillage des versions
├── .env                # Variables d'environnement (non versionné)
├── .gitignore          # Fichiers à ignorer par Git
└── README.md           # Documentation du projet
```

## ⚙️ Configuration

### Personnaliser le système de prompt

Dans `bot.js`, tu peux modifier le prompt système pour ajuster le comportement du bot :

```javascript
{ 
    role: 'system', 
    content: `Tu es "Plan B", le pote spécialisé dans les relations sociales.
    // Modifie les instructions ici
    `
}
```

### Ajouter des réponses prédéfinies

Édite `responses.json` pour ajouter des réponses rapides :

```json
[
  { "context": "bonjour", "message": "Salut, comment puis-je vous aider ?" },
  { "context": "aide", "message": "Je suis là pour t'aider à décliner des invitations !" }
]
```

## 🔒 Sécurité

- ⚠️ **Ne partage jamais** tes tokens Discord ou clés API
- 🔐 Le fichier `.env` est dans `.gitignore` pour éviter de commit des secrets
- 🛡️ Le bot filtre automatiquement les contenus inappropriés

## 🐛 Dépannage

### Le bot ne répond pas

- Vérifie que les tokens dans `.env` sont corrects
- Assure-toi que le bot a les permissions nécessaires sur le serveur
- Regarde les logs dans la console pour identifier l'erreur

### Erreur avec OpenAI API

- Vérifie que ta clé API est valide
- Assure-toi d'avoir des crédits sur ton compte OpenAI
- Le modèle `gpt-4o` doit être accessible avec ton compte

### Messages non reçus

- Vérifie les intents dans le code (déjà configurés)
- Assure-toi que le bot est bien en ligne

## 📝 Licence

ISC

## 👤 Auteur

Projet créé pour simplifier les interactions sociales avec une touche d'humour !

---

**Note** : Ce bot est conçu pour un usage personnel et léger. Pour un déploiement en production, considère l'ajout de fonctionnalités comme la gestion d'erreurs avancée, le rate limiting, et l'hébergement sur un serveur dédié.