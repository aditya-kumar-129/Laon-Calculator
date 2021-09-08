// Listen Fir Submit
document.getElementById('loan-form').addEventListener('submit',function(e){
    //selecting the result and setting it's display property to none
    document.getElementById('result').style.display = 'none';
    //selecting the loading gif and setting it's display property to block
    document.getElementById('loading').style.display = 'block';
    // setting time till which loading image will appear and after that it will collapse and asnwer is available to the screen
    setTimeout(calculateResults,2000);
    e.preventDefault();
});
function calculateResults()
{
    // SHOW gif first and then remove
    document
    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    // We ahve use compound interest concept
    //https://youtu.be/IlgtK7B_l_Q to get to know more about formula used in this code
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/(100*12);
    const calculatedPayments = parseFloat(years.value)*12;

    // Compute Monthly payment
    const x = Math.pow(1+calculatedInterest,calculatedPayments);
    const monthly = (principal*x)/(calculatedPayments);

    if(isFinite(monthly))
    {
        //selecting the loading gif and setting it's display property to block
        document.getElementById('loading').style.display = 'none';
        //selecting the result and setting it's display property to none
        document.getElementById('result').style.display = 'block';
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (principal*x).toFixed(2);
        totalInterest.value = ((principal*x)-principal).toFixed(2);
    }
    else
        showError('Please check your numbers');
}

// Show Error
function showError(error)
{
    //selecting the loading gif and setting it's display property to block
    document.getElementById('loading').style.display = 'none';
    //selecting the result and setting it's display property to none
    document.getElementById('result').style.display = 'none';
    
    // Create a <div></div> tag
    const errorDiv = document.createElement('div');
    // Add class to the div tag
    errorDiv.classList.add('alert','alert-danger');
    // Create Text for Div
    const errorDivText = document.createTextNode(error);
    // Append the text to <div></div> tag
    errorDiv.appendChild(errorDivText);

    // GET THE PARENT ELEMENT IN WHICH THE <div></div> ACT AS A CHILDREN
    const card = document.querySelector('.card');
    // GET THE ELEMENT BEFORE WHICH YOU WANT TO INSERT <div></div> tag
    const heading = document.querySelector('.heading');
    //INSERT THE <div></div> tag before heading
    card.insertBefore(errorDiv,heading);

    // Remove the <div></div> tag after 3sec
    setTimeout(clearError,2000);
}
// clearError after 3sec
function clearError()
{
    document.querySelector('.alert').remove();
}