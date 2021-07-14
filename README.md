# JAMStack Application for Software Engineering Academy Compfest 2021

[![Netlify Status](https://api.netlify.com/api/v1/badges/5ea17e93-0408-4ccf-92ca-543d66bdd85a/deploy-status)](https://app.netlify.com/sites/inspiring-kepler-874b68/deploys)

## About
- By Matthew Christopher Albert
- Built using JAMStack architecture hosted on Netlify
- Access Production Website 👉 [seacf13.matthewcalbert.com](https://seacf13.matthewcalbert.com)

## Note
- Netlify Production Server kinda slow at processing lambda function.
- Please install Netlify CLI to develop.
- No Auto Refetch for getting data, please use refresh button/page.
- You cannot change account info and password once created.

## This project is kinda messy
- React Context only used for auth
- Lacking Form Validation on both front and back-end
- Not using SWR for data fetching

## Frontend Powered Using
- [Next.js v10](https://nextjs.org/) (React) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- SASS
- TailwindCSS 2
- Typescript
- Font Awesome 5
- React Table
- React Datetime Picker
- SweetAlert2
- Momentjs

## Backend Powered Using
- Typescript
- Netlify Functions (Node.js)
- Serverless mysql
- jsonwebtoken

## Current MySQL database deployment
- Deployed on ECS Instance AliCloud.
- Opened Remote SQL just for development purpose. 

## Deployment
- [Netlify Plugin NextJs](https://github.com/netlify/netlify-plugin-nextjs) if using SSR feature as Serverless Function on Netlify
- Deploy using Netlify GUI or using CLI
```bash
# don't forget to install all node_modules dependencies
# production
yarn run deploy

# draft deploy
yarn run deploy:dev
```

## Getting Started
First, install the prerequisites:
```bash
yarn install
npm install -g netlify-cli
```

## Develop
Then, run the development server:

```bash
yarn dev:netlify
```
Open [http://localhost:8888](http://localhost:8888) with your browser to see final the result.

Or, only want to develop the function:
```bash
yarn run dev:lambda
```
Open [http://localhost:9000](http://localhost:9000) with your browser to see lambda result.