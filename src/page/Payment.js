import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation, Navigate } from "react-router-dom";

import "./css-pages/payment.scss";

const Payment = ({ token }) => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { title, price } = location.state;
  const [basket, setBasket] = useState([]);

  const [completed, setCompleted] = useState(false);

  const getTotal = () => {
    let total = Number({ price });
    // basket.forEach((meal) => {
    //   total += meal.price * meal.quantity;
    // // });
    // for (let i = 0; i < basket.length; i++) {
    //   total += basket[i].price * basket[i].quantity;
    // }
    return total.toFixed(2);
  };

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

  return token ? (
    <div className="main-payment-container">
      {completed ? (
        <h1>Paiment confirmé! Merci de votre achat 🐥 </h1>
      ) : (
        <div className="payment-container">
          <div className="top-bloc-pay">
            <p>Resumé de la commande</p>
            <div>
              <span>Commande:</span>
              <span>{Number({ price } + 0.8 + 0.4)}</span>
            </div>
            <div>
              <span>Frais protection acheteurs:</span>
              <span>0.80€</span>
            </div>
            <div>
              <span>Frais de port</span>
              <span>0.40€</span>
            </div>
          </div>
          <div className="middle-bloc-pay">
            <span>Total</span>
            <span>{Number(getTotal({ price } + 0.8 + 0.4))}</span>
            <p>Il ne vous reste plus q'une etape pour vous offrir{title}.</p>
            <p>
              Vous allez payer {price} euros (frais de protection et frais de
              port inclus).
            </p>
          </div>
          <form className="form-payment" onSubmit={handleSubmit}>
            <CardElement className="pay" />
            <button className="button-pay" type="submit">
              Pay
            </button>
          </form>
        </div>
      )}
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
