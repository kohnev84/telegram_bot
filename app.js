const express = require("express");
const app = express();
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');
const token = require("./token")
const { query } = require("express");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('index', req.query);
});

console.log(token)
// replace the value below with the Telegram token you receive from @BotFather


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

const keyboard = [
    [
        {
            text: 'самые мощные видеокарты',
            callback_data: 'powerful_nvideo'
        }
    ],
    [
        {
            text: 'самые дешевые видеокарты',
            callback_data: 'cheap_nvideo'
        }
    ]
];




// Listen for any kind of message.There are different kinds of
// messages.
// bot.on('message', (msg)=> {
//     const chatId = msg.chat.id;


//     bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?', {
//         reply_markup: {
//             inline_keyboard: keyboard
//         }
//     });
// })
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg)
    if (msg.text.toLowerCase() === "видеокарта") {


        var options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'мощная видеокарта', callback_data: '1' }],
                    [{ text: 'дешевая видеокарта', callback_data: '2' }]
                ]
            })
        };
        bot.sendMessage(msg.chat.id, "Привет какую видеокарту ты хочешь посмотреть?", options);
    }
});
bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    const action = callbackQuery.data;
    const msg = callbackQuery.message;
    const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
    };
    let text = ' ';

    if (action === '1') {
        text = "выбор фирмы"
        // text = 'rtx3080ti';
        // bot.sendDocument(msg.chat.id, './img/3080ti.gif');
        var options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'gigabyte', callback_data: 'gigabyte' }],
                    [{ text: 'msi', callback_data: 'msi' }]
                ]
            })
        };
        bot.sendMessage(msg.chat.id, "Какую фирму ты хочешь посмотреть?", options);
    }
    if (action === "gigabyte") {
        var options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'gtx1080', callback_data: 'gtx1080' }],
                    [{ text: 'gtx1070', callback_data: 'gtx1070' }]
                ]
            })
        };
        bot.sendMessage(msg.chat.id, "Какую фирму ты хочешь посмотреть?", options);
    }
    if (action === "gtx1080") {
        bot.sendDocument(msg.chat.id, "./img/gigabyte.gif")
    }
    if (action === "gtx1070") {
        bot.sendDocument(msg.chat.id, "./img/gtx1070.gif")
    }

    if (action === '2') {
        text = "выбор фирмы"
        // text = 'rtx3080ti';
        // bot.sendDocument(msg.chat.id, './img/3080ti.gif');
        var options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'gigabyte', callback_data: 'gigabyte' }],
                    [{ text: 'msi', callback_data: 'msi' }]
                ]
            })
        };
        bot.sendMessage(msg.chat.id, "Какую фирму ты хочешь посмотреть?", options);
    }
    if (action === "msi") {
        var options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{ text: 'gtx960', callback_data: 'gtx960' }],
                    [{ text: 'gtx980', callback_data: 'gtx980' }]
                ]
            })
        };
        bot.sendMessage(msg.chat.id, "Какую фирму ты хочешь посмотреть?", options);
    }
    if (action === "gtx960") {
        bot.sendDocument(msg.chat.id, "./img/gtx960.gif")
    }
    if (action === "gtx980") {
        bot.sendDocument(msg.chat.id, "./img/gtx1050.gif")
    }



    // bot.editMessageText(text, opts);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on " + port));