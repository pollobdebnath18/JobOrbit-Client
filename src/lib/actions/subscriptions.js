"use server";

import { serverMutation } from "../core/server";

export const getSubscriptionPlans = async (subInfo) => {
  return serverMutation("api/subscriptions", subInfo);
};
