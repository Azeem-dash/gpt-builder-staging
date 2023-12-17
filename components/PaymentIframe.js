// PaymentIframe.js
import Head from 'next/head';

const PaymentIframe = ({ paymentToken, iframeId }) => {
  console.log("paymentToken in frame  ",paymentToken)
  return (
    <div>
      <Head>
        <script
          src={`https://accept.paymobsolutions.com/api/acceptance/iframes/${iframeId}?payment_token=${paymentToken}`}
          type="text/javascript"
        />
      </Head>
      <iframe src="" width="100%" height="600" title="Payment iFrame" />
    </div>
  );
};

export default PaymentIframe;
