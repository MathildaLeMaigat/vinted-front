import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { useLocation } from "react-router-dom";
import axios from "axios";

import "./css-pages/payment.scss";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      console.log(cardElement);
      const stripeResponse = await stripe.createToken(cardElement);
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: "Le Titre de l'annonce",
          amount: 10,
        }
      );
      console.log(response.data);
      if (response.data.status) {
        console.log("payment completed!");
        setCompleted(true);
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  return (
    <div className="main-payment-container">
      {completed ? (
        <h1>Paiment confirmé! Merci de votre achat 🐥 </h1>
      ) : (
        <div className="payment-container">
          <div className="top-bloc-pay">
            <p>Resumé de la commande</p>
            <p>Commande</p>
            <p>Frais protection acheteurs</p>
            <p>Frais de port</p>
          </div>
          <div className="middle-bloc-pay"></div>
          <form className="form-payment" onSubmit={handleSubmit}>
            <CardElement className="pay" />
            <button className="button-pay" type="submit">
              Pay
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Payment;
