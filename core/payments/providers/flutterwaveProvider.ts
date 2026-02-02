import { PaymentProvider } from "../paymentProvider";
import { PaymentIntent } from "../../domain/paymentIntent";

export const flutterwaveProvider: PaymentProvider = {
  name: "flutterwave",

  async initializePayment(intent: PaymentIntent) {
    return {
      paymentProviderId: `flutterwave_${intent.paymentIntentId}`,
      paymentUrl: `/pay/flutterwave/${intent.paymentIntentId}`,
    };
  },

  async verifyPayment(providerPaymentId: string) {
    return {
      success: true,
      rawStatus: "mock_success",
    };
  },
};
