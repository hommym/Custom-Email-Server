// imorting  needed modules
const SMTPServer = require("smtp-server").SMTPServer;
const bcrypt= require("bcrypt")



const server = new SMTPServer({
logger:true ,    
onConnect(session, callback) {

console.log(`New user with ip ${session.remoteAddress} has being connected`);
return callback()
},

onData(stream, session, callback) {


    stream.on("data",(data)=>{

       console.log(data);
    })


    stream.on("end",()=>{


        console.log("Message has been fully recieved");
        console.log(session);

        // use nodemailer to send message (not yet implemented)

        callback()
    })

},

async onAuth(auth, session, callback) {

    

    const{password,username}=auth

    // checking if the connected client has an account on the server
    if(!password||!username){
        return callback(new Error("No password or username provided"))
    }

    const hashedPassword= bcrypt.hash(auth.password,10)
    
    // make a network request to http server to authenticate the user on the smtp server(not implemented)

    callback(null, { user: username })


}




})






server.listen(45, '127.0.0.1', () => {
    console.log('SMTP server started on port 45')


})