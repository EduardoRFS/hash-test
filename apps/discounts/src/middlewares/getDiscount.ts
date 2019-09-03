import { app } from '..';
import executeRequest from '../rules/executeRequest';

app.use('getDiscount', async ctx => {
  const [discount] = await executeRequest([ctx.req]);
  ctx.res = discount;
});
