

module.exports = function test1(){
    
const banklist = [];
const interest = [];

    url = 'https://home-loan-interest-app.onrender.com/banks'
const request = https.request(url, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });
  
    response.on('end', () => {
        const body = JSON.parse(data);
        body.forEach(function(el) {
            banklist.push(el.bankname);
            interest.push(el.rateofinterest);
        });
    });
})

request.on('error', (error) => {
    console.log('An error', error);
});
  
request.end(); 

return banklist;

}

