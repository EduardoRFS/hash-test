import app from '../app';
import { process } from '../rules/DiscountRule';

app.use('getDiscount', async ctx => {
  const [discount] = await process([ctx.req]);
  ctx.res = discount;
});
app.use('listDiscounts', async ctx => {
  // TODO: batch incoming data if needed
  for await (const request of ctx.req) {
    const [discount] = await process([request]);
    ctx.res.write(discount);
  }
  ctx.res.end();
});
