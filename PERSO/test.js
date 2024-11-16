const axios = require('axios');

// axios.get('http://localhost:3000/api/validate-data', {
//     phoneNumber: String,
//     amount: Int32Array,
// });

axios.post('http://localhost:3000/api/validate-payment', {
    phoneNumber: 92076583, 
    amount: 100,
    auth_token: 123456789,
    identifier: 100, 
    network: 100 
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error(error);
});
