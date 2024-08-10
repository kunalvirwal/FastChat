const mongoose = require("mongoose")
const models = require("./Schema")

// only for entering user messages not system messages
async function CreateMsg(sender,chatID,msg){
    let chat = await GetChat(chatID,sender)
    let d = new Date(Date.now())
    let dateNtime = String(d).slice(4, 15)+" "+d.getHours()+":"+d.getMinutes()
    chat.messages.push({
        sender:sender,
        content:msg,
        sentAt:dateNtime
    })
    await chat.save()
}

async function GetChat(chatID,sender){
    if (!mongoose.Types.ObjectId.isValid(chatID)){
        return res.status(404).redirect("/home")
    }
    let result = await models.Chat.find({_id:chatID, actives: { $elemMatch: { uuid: sender } }})
    if (result.length==0){
        return res.status(404).redirect("/home")
    }
    return result[0];

}

module.exports = {
    CreateMsg,
    GetChat,
}