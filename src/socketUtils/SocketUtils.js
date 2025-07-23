const dbFuncs = require("../models/dbFunctions")

function socketHandler (io){
    io.on("connection",(socket) => {
        
        socket.on("join-chat", (chatId) => {
            socket.join(chatId);
        });

        socket.on('msg', async (chatDetails) => {
            if (chatDetails.msg.trim() != ""){
                dbFuncs.CreateMsg(chatDetails.sender,chatDetails.chatID,chatDetails.msg)
                let chat = await dbFuncs.GetChat(chatDetails.chatID,chatDetails.sender)
                let name
                for (let i = 0; i < chat.actives.length; i++) {
                    if (chat.actives[i].uuid == chatDetails.sender){
                        name = chat.actives[i].name
                    }
                }
                io.to(chatDetails.chatID).emit('updateChat',{
                    msg: chatDetails.msg, 
                    chatID:chatDetails.chatID,
                    sender:chatDetails.sender,
                    name: name
                });
            }

        });
        
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    
    })
}

module.exports={
    socketHandler,
}