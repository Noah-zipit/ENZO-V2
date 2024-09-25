const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib05BV3VKMlMzR0tpTm1Tbm1DdTF1eE9ZNS9hMW5QbnUwc2gyNFhCNVdWdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGszRC9SMzZHUGg2MjZvemxXTTJ4b2UrN280SVRjblVUUWcveUR1RElHTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzT0Zockt1TjhEc2d2MkU3UEZ5MG9qanRzMFVKOVhGa3V1Z0ZoYlZpdEdRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtU0k2YXkvWWNDOEFpRkc4S2p4Q3hUWm01NzFVZFpsUFZUWWVSSjV5dzFZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1CUWJFS2FURGZVbW54LzdLTnZ4d3JMZit2SU4wN2FmWkNYRHZkai83SFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkUyTm5kYjNydFlaVFROVThSak5qSDZpTFo5VS9Cc1ZuMGUzNENycit2Rmc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR09EY3ZDL015L3ZpVVlmK3NETUs5RTRRWW1uZ010NWdpWGxxNjdia3NWZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV2pVbE8rdldQQ2dMTHJhczhVTWlhMEZNSW9EblFQWXJYTE43RTNqMjBqRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdYNlNjTjFrSXRjTnJqdEFlbElhS3JxYnRQRmVDdjQ0YlZ4b0hnNE5hbVpvbzl0SWJKOFZlT2R6b2QrN1ZBMkVLUU1oeHlBeHl4aTcyaTZQYmR1WUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTEsImFkdlNlY3JldEtleSI6InR6ZFVMREFDY3hIWlVVSmlVV3NTcGl3VFUxTWNiTXdZc1lYRGIxNVkxYXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImR3V3BwVkk0UmxlRjNDYXF1TkpfclEiLCJwaG9uZUlkIjoiZjNhZjcyZmQtNTk3Ny00Zjg1LTgwOTItODNiZGU3NmJhODkxIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldaY0RoMFV1U1BJcWlKNjNSd05aNUI4cmRWaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3Sy9ZUkdDYXBjbWpQdnp1UGhRZW1qUTcrZzA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNUVRWjFaRkgiLCJtZSI6eyJpZCI6IjI3NjQ5MTc1MDkyOjI4QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNbTRoTDBGRU52KzBMY0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJjSW1KTmxOUVF3dE9MWDNKdjlObmJtc0piNG5PcjgxTEJ5bGtoRkFLZHpjPSIsImFjY291bnRTaWduYXR1cmUiOiJFZWdRdUdQbDZ0bWZFcEJCajZmNjJVZjRtRWd6dFNLYnJzekc3OVkzTjN2VkdML1RzWE5UdmpkOFZFWEFWZmNOVlNMS3U0NUJhS0ZJVlRtYzlVYTVBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoid3RBdm1hS21pMWZWU25vc1kxSWNxWGNUeVByNms2UDFDaWVFeC8zZUl4UHcwY1RKd0pGWk9BRUZnVE43VGsrb0tWRTdySzFseENIWGs3ejg3V0dEQ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzY0OTE3NTA5MjoyOEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYQ0ppVFpUVUVNTFRpMTl5Yi9UWjI1ckNXK0p6cS9OU3djcFpJUlFDbmMzIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3MjgzMDQ4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUlvaSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "NO4H",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "923164413714",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'NOAH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/uqsed6.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
