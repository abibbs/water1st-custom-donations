const express = require('express');
const router = express.Router();
const request = require('request-promise');

if (process.env.NODE_ENV === 'staging') {
  require('dotenv').config();
}

const authString = 'apikey:' + process.env.MAILCHIMP_KEY;
const apiKeyBuff = new Buffer.from(authString);
const base64data = apiKeyBuff.toString('base64');
const listId = 'f1aeee8575';

/* POST email to Mailchimp */
router.post('/subscribe', async (req, res, next) => {
  const email = req.body.email;
  try {
    const response = await request({
      uri: `https://us1.api.mailchimp.com/3.0/lists/${listId}/members`,
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        'Authorization': `Basic ${base64data}`,
      },
      body: {
        email_address: email,
        status: 'subscribed',
      },
      json: true
    });
    res.send(response);
  } catch(error) {
    console.log(error.error.title);
    res.status(error.statusCode).send(error.error.title);
  }
});

module.exports = router;
