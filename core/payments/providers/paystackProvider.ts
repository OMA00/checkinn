import { PaymentProvider } from "../paymentProvider";
import { PaymentIntent } from "../../domain/paymentIntent";

export const paystackProvider: PaymentProvider = {
  name: "paystack",

  async initializePayment(intent: PaymentIntent) {
    return {
      paymentProviderId: `paystack_${intent.paymentIntentId}`,
      paymentUrl: `/pay/paystack/${intent.paymentIntentId}`,
    };
  },

  async verifyPayment(PaymentProviderId: string) {
    return {
      success: true,
      rawStatus: "mock_success",
    };
  },
};
