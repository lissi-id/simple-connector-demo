const axios = require('axios');
const qs = require('qs');

class Authenticator {
  constructor() {
    this.accessToken = null;
    this.expiresOn = null;
    this.clientId = process.env.CLIENT_ID;
    this.clientSecret = process.env.CLIENT_SECRET;
    this.tokenEndpoint = `${process.env.TOKEN_ENDPOINT}`;
  }
  
  async getToken() {
    if (this.accessToken && this.expiresOn && this.expiresOn > Date.now()) {
      console.log('Returning cached token');
      return this.accessToken;
    }

    try {
        let data = qs.stringify({
          'client_id': process.env.CLIENT_ID,
          'client_secret': process.env.CLIENT_SECRET,
          'grant_type': 'client_credentials',
          'scope': process.env.SCOPE
        });
            
            let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: this.tokenEndpoint,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
            };
      const response = await axios.request(config);
  
      this.accessToken = response.data.access_token;
      this.expiresOn =  new Date(response.data.expires_on*1000);
      console.log('Access Token:', this.accessToken);
      return this.accessToken;
    } catch (error) {
      console.error('Error fetching token:', error.message || error);
    }
  };

  static getInstance() {
    if (!Authenticator.instance) {
      Authenticator.instance = new Authenticator();
    }
    return Authenticator.instance;
  }
}

module.exports = Authenticator;
