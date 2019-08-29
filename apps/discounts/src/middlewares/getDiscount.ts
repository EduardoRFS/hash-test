import { app } from '..';
import { process } from '../rules/DiscountRule';

app.use('getDiscount', async ctx => {
  const [discount] = await process([ctx.req]);
  ctx.res = discount;
});
