const utils = require("../utils/Utils")
const models = require("../models/Schema")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")


async function newUser(req,res){

    let name = req.body.name.trim();
    let email = req.body.email.trim().toLowerCase();
    let password = req.body.password.trim();
    let result = await models.User.find({email:email})
    if (result.length>0){
        return res.render("signup.ejs",{exists:true});
    }

    if (name != "" && email != "" & password != ""){            
        password = await utils.saltNhash(password)
        let user = new models.User({name:name,email:email,password:password,chats:[]})
        result = await user.save()
        const token = utils.generateJWT(name,email,result["_id"] )
        res.cookie("token", token, { httpOnly: true });
        res.status(201).redirect("/home");
        
    }else{
        res.redirect(303,"/signup")
    }
}

async function login(req,res){
    let email = req.body.email.trim();
    let inp_password = req.body.password.trim();
    let result = await models.User.find({email:email})
    if (result.length==1 && await bcrypt.compare(inp_password, result[0]["password"])){

        const token = utils.generateJWT(result[0]["name"],email,result[0]["_id"] )
        res.cookie("token", token, { httpOnly: true });
        res.status(201).redirect("/home");
    } else {
        return res.render("login");
    }
}


async function dashboard(req,res){
    //////////////////////////////////////////////////////////////////
    let selfID = req.user.uuid
    let search = req.query.search
    let wp = req.query.wp

    let result,result2
    
    result = await models.Chat.find({"admin.uuid":selfID})
    result2 = await models.Chat.find({actives: { $elemMatch: { uuid: selfID } } , "admin.uuid": { $ne : selfID }})

    if (search){
        search = search.trim()    
        result = result.filter((val) => { return val.name.toLowerCase().includes(search.toLowerCase()) })
        result2 = result2.filter((val) => { return val.name.toLowerCase().includes(search.toLowerCase()) })
    } 
        
    result = result.reverse()
    result2 = result2.reverse()
    
    return res.render("home.ejs",{chats: result,otherchats: result2, search: search, wrongPassword:wp, path: req.path});

}
 
async function createChat(req,res){
    const selfID = req.user.uuid
    const selfName = req.user.name

    let chatName = req.body.chatName.trim()
    let chatPassword = req.body.chatPassword
    let result = await models.User.find({_id:req.user.uuid})
    if (result[0]["chats"].length<5){
        let d = new Date(Date.now())
        let dateNtime = String(d).slice(4, 15)+" "+d.getHours()+":"+d.getMinutes()
        let chat = new models.Chat({
            name:chatName,
            admin:{uuid:selfID, name:selfName},
            password:chatPassword,
            actives:[{uuid:selfID , name:selfName}],
            messages:[{sender:"system" , content:(selfName+" created "+chatName) , sentAt:dateNtime}], 
        })
        let newchat = await chat.save()
        let user = result[0]
        user.chats.push(newchat["_id"])
        await user.save()
    }
    
    res.status(201).redirect("/home")

}

async function joinChat(req,res){
    const selfID = req.user.uuid
    const selfName = req.user.name
    let chatID = req.body.chatID
    let inpChatPassword = req.body.chatPassword
    if (!mongoose.Types.ObjectId.isValid(chatID)){
        return res.status(404).redirect("/home?wp=true")
    }
    let result = await models.Chat.find({_id:chatID})
    if (result.length==0){
        return res.status(404).redirect("/home?wp=true")
    }
    let chat = result[0];
    if (chat["password"] != inpChatPassword){
        return res.status(401).redirect("/home?wp=true")
    }
    if (!chat["actives"].includes({uuid:selfID, name: selfName})){
        chat["actives"].push({uuid:selfID, name: selfName})
        let d = new Date(Date.now())
        let dateNtime = String(d).slice(4, 15)+" "+d.getHours()+":"+d.getMinutes()
        chat["messages"].push({sender:"system" , content:(selfName+" joined") , sentAt:dateNtime})
    }
    // TODO : person left messages will requere a seperate socket request

    await chat.save()
    return res.status(202).redirect("/home");
}

async function chat(req,res){
    const selfID = req.user.uuid
    let chatID = req.params.chatID
    if (!mongoose.Types.ObjectId.isValid(chatID)){
        return res.status(400).redirect("/home")
    }
    let result = await models.Chat.find({_id:chatID})
    if (result.length == 0){
        return res.status(404).redirect("/home")
    }

    return res.status(302).render("chat.ejs",{chat:result[0], path:req.path,selfID:selfID});


}

async function deleteChat(req,res){
    // TODO: Check owner
}





module.exports ={
    newUser,
    login,
    dashboard,
    createChat,
    joinChat,
    chat,
}