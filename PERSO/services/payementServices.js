const axios = require('axios');

exports.validate = async (auth_token, phoneNumber, amount, identifier, network) => {

//exports.validate = async (phoneNumber, amount) => {

    try {
        const response = await axios.post(process.env.API_URL, {
            auth_token, 
            phoneNumber, 
            amount, 
            identifier, 
            network
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erreur API:', error);
        throw error;
    }
};
