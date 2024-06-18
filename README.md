# Simple Connector Demo

This project creates a very simple demo for the Lissi ID-Wallet Connector.


## Configuration

The app can be configured via environment variables. They can be defined via an .env file which must be created within the root directory:
```
# file: .env

# CONNECTOR DOMAIN
CONNECTOR_DOMAIN=https://simple.demo.connector.lissi.io/api/v1

# OAuth Config
CLIENT_ID=
CLIENT_SECRET=
TOKEN_ENDPOINT=https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token
SCOPE=api://{default_scope}
```

## Develop

```
npm run dev
```

## Run

```
npm start
```

## Usage

Go to http://localhost:3000

## Technologies
- htmx
- ejs
- nodejs
- tailwindcss