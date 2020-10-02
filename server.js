
const Koa = require('koa');
const cors = require('@koa/cors');
const axios = require('axios');
const router = require('koa-router')();
const http = require('https');
const app = new Koa();
const bodyParser = require('body-parser');

const baseURL =
  'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL&animal_status=OPEN';

async function baseInstance(params, ctx, next) {
  console.log('params', params)
  try {
    const { data } = await axios.get(baseURL + `${encodeURI(params)}`)
    if (data) {
      ctx.body = data
      return (ctx.status = 200)
    }
    return (ctx.status = 404)
  } catch (err) {
    err.status = err.statusCode || err.status || 500
    throw err
  }
};

router.get('/', async (ctx, next) => {
  ctx.body = 'conneting'
});

router.get('/info/:param', async (ctx, next) => {
  return await baseInstance(ctx.params.param, ctx, next)
});

router.get('/search/:param', async (ctx, next) => {
  return await baseInstance(ctx.params.param, ctx, next)
});

app.use(router.routes());
app.use(bodyParser.text())
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3001;
app.listen(PORT)
// http.createServer(app.callback()).listen(PORT, () => {
//   console.log(`env: ${process.env.PORT}`)
//   console.log(`Server is listening on port ${PORT}`);
// })
