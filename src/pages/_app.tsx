import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import Script from "next/script";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      
      <Script id="paypal-script" src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD&buyer-country=US&merchant-id=${process.env.NEXT_PUBLIC_PAYPAL_MERCHANT_ID}&components=applepay`}>
      </Script>
      <Script id="apple-script" src="https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js"></Script>
      <Script strategy="lazyOnload" id="applepay-script">
        {
          `
          
          if (!window.ApplePaySession) {
            console.error('This device does not support Apple Pay');
          }
         
          if (!ApplePaySession.canMakePayments()) {
            console.error('This device is not capable of making Apple Pay payments');
          }
        
          const applepay = paypal.Applepay();
          applepay.config()
            .then(applepayConfig => {
              if (applepayConfig.isEligible) {
                document.getElementById("applepay-container").innerHTML = '<apple-pay-button id="btn-appl" buttonstyle="black" type="buy" locale="en">';
              }
            })
            .catch(applepayConfigError => {
              console.error('Error while fetching Apple Pay configuration.');
            });
          `
        }
      </Script>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
