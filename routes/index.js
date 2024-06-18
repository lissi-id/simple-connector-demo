var express = require('express');
const axios = require('axios');
const Authenticator = require('../authenticator');
const { getToken, handleIssuanceSession, handlePresentationSession } = require('../utils/authUtils');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/zukunftsworkshop', function(req, res, next) {
  res.render('zukunftsworkshop', { title: 'Zukunftsworkshop Page' });
});


const apiUrl = `${process.env.CONNECTOR_DOMAIN}`;

const firstNames = ["Max", "John", "Jane", "Alice", "Bob", "Eve", "Charlie", "David", "Frank", "Grace", "Heidi", "Ivy", "Jack", "Karl", "Lily", "Mia", "Nina", "Oliver", "Paul", "Quinn", "Rose", "Sam", "Tom", "Ursula", "Violet", "Wendy", "Xander", "Yvonne", "Zach"];
const lastNames = ["Mustermann", "Doe", "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris"];
const street = ["Main Street", "First Street", "Second Street", "Third Street", "Fourth Street", "Park Street", "Fifth Street", "Maple Street", "Elm Street", "Sixth Street", "Oak Street", "Seventh Street", "Pine Street", "Cedar Street", "Eighth Street", "View Street", "Washington Street", "Ninth Street", "Lake Street", "Hill Street"];

router.get('/credential', async function(req, res, next) {
  let firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  const data = {
    credentialTemplateId: "f66137d4-47ed-472e-90c7-74d9bbffcb4c",
    revocable: true,
    holderBinding: true,
    validFrom: "2024-01-29T15:38:01.569Z",
    validUntil: "2025-01-30T15:38:01.569Z",
    claims: [
        {
            "claimName": "first_name",
            "claimValue": `${firstName}`
        },
        {
            "claimName": "last_name",
            "claimValue":  `${lastName}`
        }
    ]
  }
  await handleIssuanceSession(req, res, next, data,apiUrl);
});

router.get('/presentation', async function(req, res, next) {
  await handlePresentationSession(req, res, next, apiUrl);
});

router.get('/presentation-result', async function(req, res, next) {
  var token = null;
  try {
    const accessToken = await Authenticator.getInstance().getToken();// display access token
    token = accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }

  const id = req.query["id"]
  axios.get(apiUrl+`/presentation-sessions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => {
      console.log('Response:', response.data.presentedCredentials);
      if (response.data.presentedCredentials.length === 0) {
        throw new Error('No credentials presented');
      }
      res.render('presentationResult', { data: response.data.presentedCredentials[0]})
  })
  .catch(error => {
      console.error('Fetch Presentation Session Error:', error.message);
      res.sendStatus(404)
  });
});

module.exports = router;
