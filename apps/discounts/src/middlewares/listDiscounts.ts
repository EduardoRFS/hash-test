import { app } from '..';
import executeRequest from '../rules/executeRequest';

app.use('listDiscounts', async ctx => {
  // TODO: batch incoming data if needed
  for await (const request of ctx.req) {
    const [discount] = await executeRequest([request]);
    ctx.res.write(discount);
  }
  ctx.res.end();
});
