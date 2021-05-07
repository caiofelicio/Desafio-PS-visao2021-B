const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
require("dotenv").config()

const user = process.env.user
const pass = process.env.pass

const app = express()

app.use(express.static("public"))
    
    .use(express.static("src/views"))

    .use(bodyParser.urlencoded({extended: false}))

    .use(bodyParser.json())

    
    .get("/", (req, res) => {
        return res.render("index.html")
    })

    .post("/", (req, res) => {
        const data = {
            name: req.body.name,
            email: req.body.email,
            telefone: req.body.telefone,
            mensagem: req.body.mensagem,
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            auth: {
            user,
            pass
         }
        })

        transporter.sendMail({
            from: user,
            to: data.email,
            replyTo: user,
            subject: "Atendimento Galac",
            text: `Olá ${data.name}, recebemos sua mensagem, em breve entraremos em contato.`
        })

        // res.render("sucess.html")

        .then(info => {
            console.log("enviado")
            res.redirect("/sucess.html")
            // return res.render("sucess.html")
        }).catch(error => {
            console.log("nao enviado")
            res.redirect("/")
        })
    })

    .listen(3300, () => { console.log("\nServidor iniciado na porta 3300. http://localhost:3300") })