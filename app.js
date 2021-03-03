//LISTEN FOR SUBMIT
document.getElementById('loan-form').addEventListener('submit', function(e){
  //hide results
  document.getElementById('results').style.display = 'none';

   //show loader
   document.getElementById('loading').style.display = 'block';

   setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//CALCULATE RESULTS
function calculateResults() {
 
  //ui vars
  const amount = document.getElementById('amount');
  const years = document.getElementById('years');
  const interest = document.getElementById('interest');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal*x*calculatedInterest)/(x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly*calculatedPayments) - principal).toFixed(2);

    //show results
    document.getElementById('results').style.display = 'block';

    //hide spinner
    document.getElementById('loading').style.display = 'none';

  } else {
    showError('Please check your numbers');
  }

}

//DISPLAY ERROR

function showError(error) {

  //hide results
  document.getElementById('results').style.display = 'none';

  //hide spinner
  document.getElementById('loading').style.display = 'none';

  //create a div 
  const errorDiv = document.createElement('div');

  //get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  //add class
  errorDiv.className = 'alert alert-danger';
  //create text node and append to div 
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading 
  card.insertBefore(errorDiv, heading);

  //clear error after 3s
  setTimeout(clearError, 3000);

}

//REMOVE ERROR

function clearError() {
  document.querySelector('.alert').remove();
}