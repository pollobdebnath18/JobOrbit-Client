import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  'seeker_pro': "price_1ThDKMRt7Ibos74Kgaaiukn1",
  'seeker_premium': "price_1ThPqBRt7Ibos74K2orEDTxe",
  'recruiter_growth': "price_1ThPphRt7Ibos74KlS8fg1jZ",
  'recruiter_enterprise': "price_1ThPqlRt7Ibos74KVSPotCTW",
};
