// imorting  needed modules
const SMTPServer = require("smtp-server").SMTPServer;
const bcrypt= require("bcrypt")



const server = new SMTPServer({
logger:true ,    
onConnect(session, callback) {

console.log(`New user with ip ${session.remoteAddress} has being connected`);
return callback()
},

onAuth: async (auth, session, callback)=> {

    
    console.log("Authentication Started..");
    const{password,username}=auth
    

  
       
       try {

          // checking if the connected client has an account on the server
    if(!password||!username){
        return callback(new Error("No password or username provided"))
    }
         

    // make a network request to http server to authenticate the user on the smtp server(not implemented)
    console.log("Checking server for account..");
    const axios = require('axios')
    const response= await axios({
        method: 'get',
        url: 'http://localhost:8000/auth/smtp-auth',
        data: {
          email: username,
          password:password
        }})

   
    if(response.status===200){
        console.log("Account present on server");
        console.log("User authorized..");
       return callback(null, { user: username })
    }

       } catch (error) {
        console.log(error);
        callback(null,false)

       }
   

  
    




}
,

onData(stream, session, callback) {


    stream.on("data",(data)=>{

    //    console.log(data);
    })


    stream.on("end",()=>{


        console.log("Message has been fully recieved");
        // console.log(session);

        // use nodemailer to send message (not yet implemented)

        callback()
    })

},






})






server.listen(45, '127.0.0.1', () => {
    console.log('SMTP server started on port 45')


})