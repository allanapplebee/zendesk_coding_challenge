// Require packages
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

//server consts
const port = process.env.PORT || 3000;
const IP = process.env.IP;

//initialise express
const app = express();

//set ejs as templating engine
app.set('view engine', 'ejs');

//set up body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/listall', async (req, res) => {
    try {
        const ticketList = await axios.get(process.env.URL, {
            auth: {
                username: process.env.EMAIL,
                password: process.env.PASSWORD
            },
            params: {
                per_page: 25
            }
        });
        console.log(ticketList.data)
        res.render('listAllTickets', {ticketList: ticketList});
    } catch (err) {
        console.log(err);
    }
});

app.post('/showticket', async (req, res) => {
    try {
        let id = req.body.id
        let url = `https://allanapplebee.zendesk.com/api/v2/tickets/${id}.json`;
        const ticket = await axios.get(url, {
            auth: {
                username: process.env.EMAIL,
                password: process.env.PASSWORD
            }
        })
        console.log(id)
        res.render('showTicket', {ticket: ticket})
    } catch(err){
        console.log(err)
    }
})

app.post('/listall/next', async (req, res) => {
    try {
        let url = req.body.url;
        const nextPage = await axios.get(url, {
            auth: {
                username: process.env.EMAIL,
                password: process.env.PASSWORD
            },
            params: {
                per_page: 25
            }
        })
        // console.log(id)
        res.render('listAllTickets', {ticketList: nextPage})
    } catch(err){
        console.log(err)
    }
})
// listAllTickets();

app.listen(port, IP, () => {
    console.log("Server Has Started...");
 });