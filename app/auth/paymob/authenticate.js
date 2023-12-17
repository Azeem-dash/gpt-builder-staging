import axios from "axios";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

// Set your Paymob API token
const API_TOKEN = 'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T0RnNE1USXhMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuMVFDeFRGTWpaLVA0dG03VTdOSU9aOVpjZ2kxeVhuS2xGOW1Bb190RmhtaFNxZHFQVnotQ1FQVkNLMThkOF9HRTBrbWdDZEtWX3hWRy1lZm1KaUVFN3c=';

const PAYMOB_URL = "https://accept.paymob.com/api/auth/tokens";

// Authenticate with Paymob to get an access token
export async function paymentToken(data) {

  console.log("data", data)
if(data.label=="free trail"){

}else{
  const accessToken = await authenticate();
  console.log("accessToken", accessToken)
  // return accessToken;

  const paymentInfo = {
    "auth_token": accessToken,
    "delivery_needed": "false",
    "amount_cents": data.price * 100,
    "currency": "EGP",
    "items": [],
  }


  axios.post('https://accept.paymob.com/api/ecommerce/orders', paymentInfo, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}` // Your Paymob API key
  }
})
  .then(async response => {
    
    // console.log('Payment orders:', response);

  // return response.data.token;


    
    const paymet_key_obj={
      "auth_token": response.data.token,
      "amount_cents": data.price * 100,
      "expiration": 3600, 
      "order_id": response.data.id,
      "billing_data": {
        "apartment": "803", 
        "email": "claudette09@exa.com", 
        "floor": "42", 
        "first_name": "Clifford", 
        "street": "Ethan Land", 
        "building": "8028", 
        "phone_number": "+86(8)9135210487", 
        "shipping_method": "PKG", 
        "postal_code": "01898", 
        "city": "Jaskolskiburgh", 
        "country": "CR", 
        "last_name": "Nicolas", 
        "state": "Utah"
      }, 
      "currency": "EGP", 
      "integration_id": 1,
    }

   await axios.post('https://accept.paymob.com/api/acceptance/payment_keys', paymet_key_obj, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${response.data.token}` // Your Paymob API key
  }
})
  .then(response => {
    console.log('payment_keys Token:', response);
    // Use this paymentToken in your payment request
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });
    // Use this paymentToken in your payment request
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });

}

  // return accessToken;
}


async function authenticate() {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      api_key: API_TOKEN,
    };
    const response = await axios.post(PAYMOB_URL, data, { headers });
    const accessToken = response.data.token;
    return accessToken;
  } catch (error) {
    console.error("Error authenticating:", error.response.data);
  }
}