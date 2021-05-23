# Doka 2 Bot

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/590a37f2a664482da8998480f630d014)](https://app.codacy.com/gh/mainarthur/doka2bot?utm_source=github.com&utm_medium=referral&utm_content=mainarthur/doka2bot&utm_campaign=Badge_Grade_Settings)

[Telegram Bot](https://t.me/Doka2Bot) that sends random pictures!

## How to submit documentation

You can contact me on Telegram: [@MasterArthur](https://t.me/MasterArthur) or fork and PR with new documentation.json file in src/documentations directory

## Requirements

1.  [Node.js](https://nodejs.org/en/download/) (tested v16.0.0)
2.  npm (tested v7.12.1)
3.  Redis(tested v6.2.3)

## How to start

Download source code and dependencies:

```bash
git clone git@github.com:mainarthur/doka2bot.git
cd doka2bot
npm i
```

Rename config.template.json to config.json:

```bash
mv config.template.json config.json
```

Edit config.json:

1.  Insert your bot token
2.  Change outher settings as you want

and start with this command:

```bash
npm start
```
