/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable  @typescript-eslint/restrict-template-expressions */
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { api } from "@/utils/api";
import Script from "next/script";


export default function Home() {


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.ApplePaySession && ApplePaySession.canMakePayments() && paypal) {
      console.log('Apple Pay can make payments');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!window.ApplePaySession) {
        console.error('This device does not support Apple Pay');
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (!ApplePaySession.canMakePayments()) {
        console.error('This device is not capable of making Apple Pay payments');
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const applepay = paypal.Applepay();
      applepay.config()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .then(applepayConfig => {
          if (applepayConfig.isEligible) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.getElementById("applepay-container").innerHTML = '<apple-pay-button id="btn-appl" buttonstyle="black" type="buy" locale="en">';
          }
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .catch(applepayConfigError => {
          console.error('Error while fetching Apple Pay configuration.');
          console.error(applepayConfigError);
        });

    }
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div id="applepay-container"></div>
      </main>
    </>
  );
}

