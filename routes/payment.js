if (process.env.NODE_ENV === 'staging') {
  require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const request = require('request-promise');
const md5 = require('md5');
const stripe = require('stripe')(process.env.STRIPE_SECRETKEY);

/* POST Stripe payment. */
router.post('/donate', async function(req, res, next) {
  let chargeObject;
  /*
    Object destructuring
    https://thecodebarbarian.com/an-overview-of-destructuring-assignments-in-node-js
    */
    const { email, donation, tokenId } = req.body;
    const subscriberHash = md5(email);

    // Add 'Donate' tag to subscriber
    if (subscriberHash) addTagToSubscriber(subscriberHash);

    // Send Donation to Stripe
    res.header("Access-Control-Allow-Origin", "*");

    try {
      chargeObject = await createCharge(email, tokenId, donation);
      // Send back success response (and/or chargeObject.id)
      res.send('success');
    } catch(error) {
      res.status(400).send('error') ;
    }
});

/******
 * Helper functions
 ******/
async function addTagToSubscriber(subscriberHash) {
  const authString = 'apikey:' + process.env.MAILCHIMP_KEY;
  const apiKeyBuff = new Buffer.from(authString);
  const base64data = apiKeyBuff.toString('base64');
  const listId = 'f1aeee8575';

  try {
    const response = await request({
      uri: `https://us1.api.mailchimp.com/3.0/lists/${listId}/members/${subscriberHash}/tags`,
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Authorization': `Basic ${base64data}`,
      },
      body: {
        tags: [{name: 'Donated', status: 'active',}]
      },
      json: true
    });
  } catch(error) {
    console.log(error);
  }
}

async function createCharge(receipt_email, token, amount) {
  let response;

  try {
    // creating the charge object
    response = await stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      description: 'Water1st Donation',
      source: token,
      // TODO: need to send name and email address
      receipt_email,
    });
      
    return response;
  } catch(error) {
      console.log('error',error);
      throw new Error(error);
  }
}

module.exports = router;
