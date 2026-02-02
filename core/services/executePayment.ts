import { PaymentIntent } from "../domain/paymentIntent";
import { getPaymentProvider } from "../payments/getPaymentProvider";

export async function executePaymemnts(params: {
  paymentIntent: PaymentIntent;
  provider: "stripe" | "paystack" | "flutterwave";
}) {
  const providerAdapter = getPaymentProvider(params.provider);
  // Marks processing in memeory for now
  const processingIntent: PaymentIntent = {
    ...params.paymentIntent,
    provider: params.provider,
    status: "PROCESSING",
  };

  // intialize payment with Provider
  const init = await providerAdapter.initializePayment(processingIntent);

  return {
    updatedPaymentIntent: processingIntent,
    providerPaymentId: init.paymentProviderId,
    paymentUrl: init.paymentUrl, // may exist
  };
}
