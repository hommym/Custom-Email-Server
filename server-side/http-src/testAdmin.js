// const bcrypt= require("bcrypt")


// const main=async (p)=>{

//     const hashedPassword= await bcrypt.hash(p,10)
//     console.log(hashedPassword);
// }

// main("Herberth1624")

// hashed password of test admin =$2b$10$wPF4BBiDvizVDI7pRgn2kehYkvhYHMQ8Tv4ZrXxhUgSCjbmIYN0C2
// id for test admin =65dd3f47c54da83b73f21bb5

// passwor for gmail when using nodemailer=xcgf scrz anbg ofxu


// testing smtp server

const nodeMailer=require("nodemailer")


const transporter = nodeMailer.createTransport({
    host: "192.168.72.30",
    port: 587,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: "hommykendrick@gmail.com",
        pass: "Herberth1624",
      }
  })


  const mailOptions = {
    from: "herberth80@hommy.com",
    to: "herbertharthur80@gmail.com",
    subject: "Test Mail",
    text: `Test Mail`,
  }




  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent: ", info.response);
    }
  })
