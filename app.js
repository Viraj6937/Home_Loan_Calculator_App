const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const cors = require('cors');
const app = express();
app.use(cors());
const user = require('./utils/user.json');

const port = process.env.PORT || 3000;

const banklist = ['Select Bank'];
const interest = [];


const homeloanVal = user.homeloan;
const emiVal = user.emi;
const homeloancalculatorVal = user.home_loan_calculator;
const homeloancalculationbenefitVal = user.home_loan_calculator_benefits;
const formulaVal = user.formula;

app.use(bodyParser.urlencoded({extended:true}));
app.use("/public", express.static('public'))
app.use(bodyParser.json());
app.set('view engine', 'ejs')

url = 'https://home-loan-interest-app.onrender.com/home-loan-calculator/v1/banks'
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


app.get('/',function(req,res){

   res.render('home',{title:'Home Loan Calculator 2023-24',copyrighcontent:'utechkar@2023-24',bankoptions:banklist,homeloan:homeloanVal,emi:emiVal, homeloancalculator:homeloancalculatorVal, homeloancalculationbenefit:homeloancalculationbenefitVal, formula:formulaVal});
})

app.post('/calculate',function(req,res){
    
    loanamount = Number(req.body.range);
    bankname = req.body.banknameOption;
    tenure = Number(req.body.tenure);

    console.log(bankname);
    
    if(bankname !== ''){
        res.redirect('/');
    }
    else{
        res.redirect('/');
    }
})


app.listen(process.env.PORT || port,function(){
    console.log('server is listening on port:'+port)
})