const stripe = Stripe('pk_live_replaceme');
const elements = stripe.elements();
let email;
let fName;
let lName;
let name;
let donation = '85';

// Create Card Number element
const card = elements.create('cardNumber', {
  'placeholder': '',
});

// Mount Card Number element to 'card-number' id
card.mount('#card-number');

// Create CVC element
const cvc = elements.create('cardCvc', {
  'placeholder': '',
});

// Mount CVC element to 'card-cvc' id
cvc.mount('#card-cvc');

// Create Card Expiry element
const exp = elements.create('cardExpiry', {
  'placeholder': 'MM / YY',
});

// Mount Card Expiry element to 'card-exp' id
exp.mount('#card-exp');

card.addEventListener('change', function(event) {
  const displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Create a token or display an error when the form is submitted.
const form = document.getElementById('donate-btn');
form.addEventListener('click', function(event) {
  name = $('.inputNameOnCard').val();
  event.preventDefault();

  stripe.createToken(card, {name}).then(function(result) {
    if (result.error) {
      // Inform the customer that there was an error
      $('.card-errors').css('display','block')
    } else {
      // Send the token to servers
      $('.card-errors').css('display','none');
      stripeTokenHandler(result.token);
    }
  });
});

async function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  const tokenId = token.id;
  donation = parseInt(donation);

  // Submit the form
  $('.next-btn-pmt').prop('disabled', true);
  $.ajax({
    url: '/payment/donate',
    type: 'POST',
    data: {name, tokenId, email, donation},
    success: function(result) {
      // View next modal
      $('#modal-thankyou').modal('show');
      $('#modal-stripe').modal('hide');
      $('.card-errors').css('display','none');
      $('.next-btn-pmt').prop('disabled', false);
    },
    error: function(xhr, status, error) {
      $('.card-errors').css('display','block');
      $('.next-btn-pmt').prop('disabled', false);
    }
  });
}

$(function() {
  /* Begin Payment flow */
  $('.next-btn-info').on('click', function(e) {
      email = $('.inputEmail').val();
      fName = $('.inputFname').val();
      lName = $('.inputLname').val();
      donation = $('.donationInput').val();
    if (email && emailIsValid(email) && !isNaN(donation) && fName && lName && donation) {
      // Email found to be valid
      $('.inputEmail').removeClass('is-invalid');
      $('.inputEmail').addClass('is-valid');
      
      // First name found to be valid
      $('.inputFname').removeClass('is-invalid');
      $('.inputFname').addClass('is-valid');
      
      // Last name found to be valid
      $('.inputLname').removeClass('is-invalid');
      $('.inputLname').addClass('is-valid');
      
      // Donation found to be valid
      $('.donationInput').removeClass('is-invalid');
      $('.donationInput').addClass('is-valid');
      
      // Submit email to add to Mailchimp
      $('#modal-one').modal('hide');
      $('#modal-stripe').modal('show');
      $('#donation-amt').text('$'+donation);
      $('.next-btn-info').prop('disabled', true);
      submitEmail(email);
    } else {
      // Validate email
      if (!email || !emailIsValid(email)) {
        $('.inputEmail').addClass('is-invalid');
      } else {
        $('.inputEmail').removeClass('is-invalid');
        $('.inputEmail').addClass('is-valid');
      }
      
      // Validate first name
      if (!fName) {
        $('.inputFname').addClass('is-invalid');
      } else {
        $('.inputFname').removeClass('is-invalid');
        $('.inputFname').addClass('is-valid');
      }
      
      // Validate last name
      if (!lName) {
        $('.inputLname').addClass('is-invalid');
      } else {
        $('.inputLname').removeClass('is-invalid');
        $('.inputLname').addClass('is-valid');
      }
      
      // Validate donation
      if (!donation || isNaN(donation)) {
        $('.donationInput').addClass('is-invalid');
      } else {
        $('.donationInput').removeClass('is-invalid');
        $('.donationInput').addClass('is-valid');
      }
    }
  });
});

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function submitEmail(email) {
  $.ajax({
    url: '/email/subscribe',
    type: 'POST',
    data: {email},
    success: function(result) {
      $('.next-btn-info').prop('disabled', false);
    },
    error: function(xhr, status, error) {
      $('.next-btn-info').prop('disabled', false);
    }
  });
}