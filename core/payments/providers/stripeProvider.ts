import { PaymentProvider } from "../paymentProvider";
import { PaymentIntent } from "../../domain/paymentIntent";

export const stripeProvider: PaymentProvider = {
  name: "stripe",

  async initializePayment(intent: PaymentIntent) {
    // Stub - real stripe later
    return {
      paymentProviderId: `stripe_${intent.paymentIntentId}`,
      paymentUrl: `/pay/stripe/${intent.paymentIntentId}`,
    };
  },

  async verifyPayment(paymentProviderId: string) {
    return {
      success: true,
      rawStatus: "mock_success",
    };
  },
};
