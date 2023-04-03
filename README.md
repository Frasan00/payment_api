# Goals of this project

- The goal of this project is to use stripe and nodemailer
- Making payments and sending emails
- Established the focus of this project, commonly used tecnologies and patterns as user auth and external databases won't be used
- The GUI is very minimal cause it's not the focus of this project

## Payment RestFul api

- This node.js project that can handle payments
- Also the node.js server will send an email to the email address specified from the client

### Gui

- The GUI is a simple items list that can be bought without a user sistem just providing the email and the card details

### Deployment

- This project comes with a kubernetes deployment
- You can also use docker with run.sh to deploy it locally