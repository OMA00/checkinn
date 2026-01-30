import { PaymentProvider } from "./paymentProvider";
import { stripeProvider } from "./providers/stripeProvider";
import { paystackProvider } from "./providers/paystackProvider";

export function getPaymentProvider(
  provider: PaymentProvider["name"],
): PaymentProvider {
  switch (provider) {
    case "stripe":
      return stripeProvider;
    case "paystack":
      return paystackProvider;
    default:
      throw new Error("Unsupported Payment Provider");
  }
}
