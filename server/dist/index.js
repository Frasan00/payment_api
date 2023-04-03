"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT;
const hostEmail = process.env.EMAIL_HOST;
const hostPassword = process.env.EMAIL_PASSWORD;
if (!PORT || !hostEmail || !hostPassword)
    console.log("Some env variables are missing");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes
/*
* body: cardInfo, price
*/
app.post("/payment", (req, res) => {
});
/*
* body: email, item, price
*/
app.post("/email", (req, res) => {
    const { email, item, price } = req.body;
    console.log(email, item, price);
    if (!email || !item || !price)
        return res.status(400).send("Body params are missing");
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: hostEmail,
            pass: hostPassword
        }
    });
    const mailOptions = {
        from: hostEmail,
        to: email,
        subject: 'Payment status',
        text: `Thank you for buying from us!
         Your order for ${item} at a price of $${price} has been sent succesfully!`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error.message);
            res.status(400).send("Error while sending the email");
        }
        else
            return res.status(200).send("Email sent succesfully");
    });
});
app.get("/", (req, res) => {
    res.send("payment node.js api");
});
app.get("*", (req, res) => {
    res.status(404).send("Error 404: resource not found!");
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
