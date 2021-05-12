const express = require("express")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
require("dotenv").config()


const port = process.env.PORT || 3300
const user = process.env.user
const pass = process.env.pass

const emailStyle = 'font-weight: 700; font-familiy: sans-serif; font-style: italic;'


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
            html: `<h1 style="${emailStyle}"> Dados do cliente: </h1><br>
                    
                    <p style="${emailStyle}">Nome: ${data.name}</p>
                    <p style="${emailStyle}">Email: ${data.email}</p>
                    <p style="${emailStyle}">Telefone: ${data.telefone}</p>
                    <p style="${emailStyle}">Mensagem: ${data.mensagem}</p>`
        })
        .then(() => {
            transporter.sendMail({
                from: user,
                to: data.email,
                replyTo: user,
                subject: "Atendimento Galac",
                html: `<h1 style="${emailStyle}"'>Bem-vindo ao atendimento Galac</h1> 
                        <p style="${emailStyle}">Olá <strong>${data.name}</strong>, agradecemos pelo contato, em breve retornaremos.
                        </p> 
                        <br>
                        <img src='cid:uniqueID@creata.ee' width='200px' height='200px' >`,
                attachments: [{
                     filename: "galac.png",
                     path: "public/assets/galac.png",
                     cid: "uniqueID@creata.ee"
                }],
            })
            res.redirect("/contato.html")
        })
        .catch((err) => {
            res.redirect("/failed.html")
        })        
    })

    .listen(port, () => { console.log(`\nServidor iniciado na porta ${port}. http://localhost:${port}`) })