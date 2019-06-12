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

//helpers
const auth = {
    username: process.env.EMAIL,
    password: process.env.PASSWORD
};

//Routes
app.get('/', (req, res) => {
    res.render('home', {url: process.env.URL});
});

app.post('/listall', async (req, res) => {
    let url = req.body.url;
    try {
        const tickets = await axios.get(url, {
            auth: auth,
            params: {
                per_page: 25
            }
        });
        res.render('listAllTickets', {ticketList: tickets.data});
    } catch (err) {
        //check to see if there is a response from the API and render relevant error page
        if(err.response) {
            res.render('error', {error: err.response.status});
        } else {
            res.render('serverError')
        }
    }
});

app.post('/showticket', async (req, res) => {
    let id = req.body.id;
    let url = `https://allanapplebee.zendesk.com/api/v2/tickets/${id}.json`;
    try {
        const ticket = await axios.get(url, {
            auth: auth
        });
        res.render('showTicket', {ticket: ticket.data.ticket});
    } catch (err){
        //check to see if there is a response from the API and render relevant error page
        if(err.response) {
            res.render('error', {error: err.response.status});
        } else {
            res.render('serverError')
        }
    }
});

//start server
app.listen(port, IP, () => {
    console.log(`Server Has Started on port ${port}`);
 });

 //export app and axios requests for testing
 module.exports = { app, ticket, tickets };