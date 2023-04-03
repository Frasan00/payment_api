import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Response, Request } from "express";
import nodemailer from "nodemailer";
import Stripe from "stripe";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const hostEmail = process.env.EMAIL_HOST;
const hostPassword = process.env.EMAIL_PASSWORD;
if(!PORT || !hostEmail || !hostPassword) console.log("Some env variables are missing");

app.use(cors());
app.use(express.json());

// routes

/*
* body: cardNumber, expireDate, cvc, price
*/
app.post("/payment", (req: Request, res: Response) => {

})

/*
* body: email, item, price
*/
app.post("/email", (req: Request, res: Response) => {
    const { email, item, price } = req.body;
    console.log(email, item, price);
    if(!email || !item || !price) return res.status(400).send("Body params are missing");
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: hostEmail,
            pass: hostPassword
        }
    })

    const mailOptions = {
        from: hostEmail,
        to: email,
        subject: 'Payment status',
        text: 
        `Thank you for buying from us!
         Your order for ${item} at a price of $${price} has been sent succesfully!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error.message);
            res.status(400).send("Error while sending the email");
        }
        else return res.status(200).send("Email sent succesfully");
    });
    
})

app.get("/", (req: Request, res: Response) => {
    res.send("payment node.js api")
})

app.get("*", (req: Request, res: Response) => {
    res.status(404).send("Error 404: resource not found!")
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));