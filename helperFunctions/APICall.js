const axios = require('axios');
const auth = {
    username: process.env.EMAIL,
    password: process.env.PASSWORD
};

let url = process.env.URL;

module.exports = {
    getTicket: async (url) => {
        try {
            const response = await axios.get(url, {
                auth: auth,
                params: {
                    per_page: 25
                }
            });
            return response.data
        } catch (err) { 
            console.log(err.stack);
            console.log(err.message);
        }
    }
}