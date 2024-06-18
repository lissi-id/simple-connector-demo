const axios = require('axios');
const qr = require('qrcode');
const Authenticator = require('../authenticator');

async function getToken() {
  try {
    const accessToken = await Authenticator.getInstance().getToken();
    console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function handleIssuanceSession(req, res, next, data, api) {
  const token = await getToken();
  try {
    const response = await axios.post(`${api}/issuance-sessions`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Response:', response.data.credentialOfferDetails.credentialOfferUri);
    const { credentialOfferUri, oneTimePassword } = response.data.credentialOfferDetails;
    
    qr.toDataURL(credentialOfferUri,{ width: 350, height: 350 }, (err, qrUrl) => {
      if (err) {
        console.error('Error generating QR code:', err);
        next(err);
      } else {
        res.render('issuanceResponse', { qrUrl, otp: oneTimePassword }); 
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
    next(error);
  }
}

async function handlePresentationSession(req, res, next, api) {
  let token;
  try {
    token = await getToken();
  } catch (error) {
    console.log(error);
    return next(error);
  }

  try {
    const response = await axios.post(`${api}/presentation-sessions?presentationTemplateId=d49ee616-0e8d-4698-aff5-2a8a2362652d`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Response:', response.data.presentationRequestUri);

    const { presentationRequestUri, presentationSessionId } = response.data;

    qr.toDataURL(presentationRequestUri, { width: 350, height: 350 }, (err, qrUrl) => {
      if (err) {
        console.error('Error generating QR code:', err);
        return next(err);
      } else {
        res.render('presentationResponse', { qrUrl, id: presentationSessionId });
      }
    });
  } catch (error) {
    console.error('Error:', error.message);
    return next(error);
  }
}

async function getToken() {
  try {
    const accessToken = await Authenticator.getInstance().getToken();
    console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getToken() {
  try {
    const accessToken = await Authenticator.getInstance().getToken();
    console.log(accessToken);
    return accessToken;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = { getToken, handleIssuanceSession, handlePresentationSession };
