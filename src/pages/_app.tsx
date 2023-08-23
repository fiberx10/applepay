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
    
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
