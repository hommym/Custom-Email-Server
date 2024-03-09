const simpleParser = require("mailparser").simpleParser;


const parseMail= async (messageBuffer)=>{
return await simpleParser(messageBuffer)

}



module.exports= {
    parseMail
}