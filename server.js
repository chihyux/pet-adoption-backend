
const Koa = require('koa');
const cors = require('@koa/cors');
const axios = require('axios');
const router = require('koa-router')();
const http = require('https');
const app = new Koa();
const bodyParser = require('body-parser')
const querystring = require('querystring');
const url = require('url');

const baseURL =
  'https://data.coa.gov.tw/Service/OpenData/TransService.aspx';

const AcceptedUrl =
  process.env.NODE_ENV === "production"
    ? "https://jolly-shockley-e9aec7.netlify.app"
    : "http://localhost:3000";

app.use(cors({ origin: AcceptedUrl }));

async function instance(currentURL, query, ctx, next) {
  console.log(query)
  try {
    const result = await axios.get(`${currentURL}?${query}`)
    ctx.body = result.data
  } catch (err) {
    err.status = err.statusCode || err.status || 500
    throw err
  }
};

router.get('/', async (ctx, next) => {
 ctx.body = 'connecting'
});

router.get('/info', async (ctx, next) => {
  return await instance(baseURL, ctx.request.querystring, ctx, next)
});

router.get('/search', async (ctx, next) => {
  return await instance(baseURL, ctx.request.querystring, ctx, next)
});

router.get('/resource', async (ctx, next) => {
  return await instance(baseURL, ctx.request.querystring, ctx, next)
});

app.use(router.routes());
app.use(bodyParser());

const PORT = process.env.PORT || 3001;
app.listen(PORT)
// http.createServer(app.callback()).listen(PORT, () => {
//   console.log(`env: ${process.env.PORT}`)
//   console.log(`Server is listening on port ${PORT}`);
// })
