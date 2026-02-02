import { getPaymentProvider } from "../payments/getPaymentProvider";
import { PaymentIntent } from "../domain/paymentIntent";

export async function verifyPayment(params: {
  paymentIntent: PaymentIntent;
  paymentProviderId: string;
}) {
  if (!params.paymentIntent.provider) {
    throw new Error("Payment provider is not set on paymentIntent");
  }

  const provider = getPaymentProvider(params.paymentIntent.provider);
  const verification = await provider.verifyPayment(params.paymentProviderId);

  return {
    verified: verification.success,
    rawStatus: verification.rawStatus,
  };
}
