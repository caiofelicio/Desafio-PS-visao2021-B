const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
require("dotenv").config()


const port = process.env.PORT || 3300
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
            to: user,
            replyTo: user,
            subject: "Email de cliente",
            text: `Dados do cliente:\n\nNome: ${data.name}\nEmail: ${data.email}\nTelefone: ${data.telefone}\nMensagem: ${data.mensagem}`,
        })
        .then(() => {
            transporter.sendMail({
                from: user,
                to: data.email,
                replyTo: user,
                subject: "Atendimento Galac",
                text: `Olá ${data.name}, recebemos sua mensagem, em breve entraremos em contato.`,
            })
            res.redirect("/contato.html")
        })
        .catch(() => {
            res.redirect("/failed.html")
        })        
    })

    .listen(port, () => { console.log(`\nServidor iniciado na porta ${port}. http://localhost:${port}`) })