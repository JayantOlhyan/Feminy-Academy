import test from 'node:test';
import assert from 'node:assert/strict';
import { getOfferPricing, priceSchedule, formatCourseFee, formatPriceDeadline } from '../lib/offer-pricing.ts';

const start = Date.parse(priceSchedule.startsAt);
const first = start + priceSchedule.intervalMs;
test('first deadline is 22 Nov 2026 10:30 IST for everyone', () => {
  assert.equal(new Date(first).toISOString(), '2026-11-22T05:00:00.000Z');
  const a = getOfferPricing(start + 5000);
  const b = getOfferPricing(start + 60000);
  assert.equal(a.nextIncreaseAt, b.nextIncreaseAt);
  assert.equal(a.courses['hydra-facial'].price, 3000);
  assert.equal(a.courses['one-day'].price, 1000);
});
test('one millisecond before the deadline retains the old fee', () => {
  assert.equal(getOfferPricing(first - 1).courses['hydra-facial'].price, 3000);
});
test('exact boundary raises both courses by 100 and advances deadline', () => {
  const state = getOfferPricing(first);
  assert.equal(state.courses['hydra-facial'].price, 3100);
  assert.equal(state.courses['hydra-facial'].nextPrice, 3200);
  assert.equal(state.courses['one-day'].price, 1100);
  assert.equal(state.nextIncreaseAt, first + priceSchedule.intervalMs);
});
test('missed cycles catch up without a visit or stored session', () => {
  const state = getOfferPricing(start + 10 * priceSchedule.intervalMs + 1);
  assert.equal(state.cycle, 10);
  assert.equal(state.courses['hydra-facial'].price, 4000);
  assert.equal(state.courses['one-day'].price, 2000);
  assert.ok(state.nextIncreaseAt > state.serverNow);
});
test('pre-launch clock cannot discount below base price', () => {
  assert.equal(getOfferPricing(start - priceSchedule.intervalMs).courses['one-day'].price, 1000);
});
test('fees and deadlines have explicit Indian formatting', () => {
  assert.equal(formatCourseFee(3100), '₹3,100');
  assert.match(formatPriceDeadline(first), /22 Nov/);
  assert.match(formatPriceDeadline(first), /10:30/);
  assert.match(formatPriceDeadline(first), /IST$/);
  assert.throws(() => getOfferPricing(NaN), /Invalid/);
});
