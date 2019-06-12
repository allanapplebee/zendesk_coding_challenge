// Require and set consts
require('dotenv').config();
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('./helperFunctions/APICall');
const getTicket = helpers.getTicket;

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
    let url = process.env.URL;
    res.render('home', {url});
});

app.post('/listall', async (req, res) => {
    let url = req.body.url;
    try {
        const tickets = await getTicket(url);
        res.render('listAllTickets', {tickets});
    } catch (err) {
        console.log(err.stack);
        res.render('error');
    }
});

app.post('/showticket', async (req, res) => {
    let id = req.body.id;
    let url = `https://allanapplebee.zendesk.com/api/v2/tickets/${id}.json`;
    try {
        const ticket = await getTicket(url);
        res.render('showTicket', {ticket: ticket.ticket});
    } catch (err){
        res.render('error');
    }
});

//start server
app.listen(port, IP, () => {
    console.log(`Server Has Started on port ${port}`);
 });

 //export app for testing
 module.exports = app;