import app from '../app';
import { process } from '../components/DiscountComponent';

app.use('getDiscount', async ctx => {
  const [discount] = await process([ctx.req]);
  ctx.res = discount;
});
app.use('listDiscounts', async ctx => {
  // TODO: batch incoming data if needed
  // eslint-disable-next-line no-restricted-syntax
  for await (const request of ctx.req) {
    const [discount] = await process([request]);
    ctx.res.write(discount);
  }
  ctx.res.end();
});
