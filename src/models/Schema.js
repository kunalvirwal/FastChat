const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type : String, required: true},
    email:{type : String, required: true},
    password:{type : String, required: true},
    chats:{ type : [String], required: true }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);  // collection users

const chatSchema = new Schema({
    name:{type : String, required: true},

    admin:{ type : {
        uuid: { type: String, required: true },
        name: { type: String, required: true }
        }, required: true },

    password:{type : String, required: true},

    actives:{ type : [{
        uuid: { type: String, required: true },
        name: { type: String, required: true }
        }], required: true },

    messages:{ type : [{
        sender: { type: String, required: true },
        content: { type: String, required: true },
        sentAt: { type: String, required: true }
        }], required: true }    
})

const Chat = mongoose.model("Chat", chatSchema);  // collection chats

module.exports={
    User,
    Chat
}