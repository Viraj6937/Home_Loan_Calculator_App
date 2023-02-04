
let loan_amount = 0
let rate_of_interest = 0
let tenure = 0

let selectoption = ''

async function showamount(){
  const value = document.getElementById('myRange').value;
  loan_amount = Number(value);
   document.getElementById('myValue').innerText = '₹ '+ loan_amount.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
}

async function showtenure(){
  const period  = document.getElementById('tenureId').value
  tenure = Number(period);
  document.getElementById('tenureVal').innerText = period + ' Years';
}

async function calculator(){
  let months = tenure * 12;
  let interest = parseFloat(rate_of_interest) / 12 / 100;
  let emi = (loan_amount*interest* Math.pow((1+interest),months)) / (Math.pow((1+interest),months)-1);
  let total_interest = Math.round((emi * months) - loan_amount);
  let totalpay = Math.round(emi * months);
  if(loan_amount !== 0 && rate_of_interest !== 0 && tenure !== 0){
    document.getElementById('montly_emi').style.color = '#2A3990';
    document.getElementById('montly_emi').innerText = '₹ ' + Math.round(emi).toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
    document.getElementById('principal_amount').innerText = '₹ ' + loan_amount.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
    document.getElementById('total_interest').innerText = '₹ '+total_interest.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,'); 
    document.getElementById('total_pay').style.color = '#2A3990';
    document.getElementById('total_pay').innerText = '₹ '+totalpay.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,');
  }
  else{
    document.getElementById('montly_emi').innerText = '0';
    document.getElementById('principal_amount').innerText = '0';
    document.getElementById('total_interest').innerText = '0'; 
    document.getElementById('total_pay').innerText = '0';
  }
}

async function showChange(){
    const endpoint = "https://home-loan-interest-app.onrender.com/home-loan-calculator/v1/banks/";
    selectoption = document.getElementById("selectedOption").value;
    const api = endpoint+selectoption;
    console.log(selectoption)   
    if(selectoption){
fetch(api,{
  method: 'GET', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => {
    let value  = document.getElementById('roi').innerHTML = data.rateofinterest;
    rate_of_interest = Number(value);
    widget(selectoption);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  }
}

async function widget(selectoption){

  if(selectoption !== ''){
    document.getElementById('widgetTitle').style.visibility='visible'
    document.getElementById('widgetTitle').style.backgroundColor='#2A3990'
    document.getElementById('widgetTitle').style.margin='18px 19px'
    document.getElementById('widgetTitle').style.padding='38px'
    document.getElementById('widgetTitle').style.color='#E5E0FF'
    document.getElementById('widgetTitle').style.height='20vh'
  
    var d = document.createElement("h3").innerHTML='Know More from '
    document.getElementById('widgetTitle').innerHTML= 'To Know More from '+selectoption.toUpperCase()+' Officials <br>'+'<button id="ctaButton" style="width:30%; border-style:none; height:7vh; padding:5px; cursor:pointer; margin-top:15px;" type="submit" onClick='+"ctaCall(selectoption)"+'>Click Here</button>'
  }
  else{
    document.getElementById('widgetTitle').style.visibility='hidden';
  }
}

async function ctaCall(selectoption){

  var url = ''; 
  const ctacall = "https://home-loan-interest-app.onrender.com/home-loan-calculator/v1/banks/"+selectoption;
  fetch(ctacall,{
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {

  switch(selectoption) {
    case 'HDFC Home Loan':
      document.getElementById('ctaButton').setAttribute('href',data.url);
      window.location.href = data.url;
      break;  
    case 'Kotak Mahindra':
      document.getElementById('ctaButton').setAttribute('href',data.url);
      window.location.href = data.url;
      break;
    
    case 'Axis':
      document.getElementById('ctaButton').setAttribute('href',data.url);
      window.location.href = data.url;
      break;
    
    default:
      console.log('broken link');
    }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}



