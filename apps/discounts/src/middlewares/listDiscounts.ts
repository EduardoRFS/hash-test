import { app } from '..';
import { process } from '../rules/DiscountRule';

app.use('listDiscounts', async ctx => {
  // TODO: batch incoming data if needed
  for await (const request of ctx.req) {
    const [discount] = await process([request]);
    ctx.res.write(discount);
  }
  ctx.res.end();
});
