const auth = require("./auth/authRoutes");
const onboarding = require("./onboarding/onboardingRoutes");
const space = require("./space/spaceRoutes");
const user = require("./user/userRoutes");
const billing = require("./billing/billingRoutes");


module.exports = {
  auth,
  onboarding,
  space,
  user,
  billing
};
