import { useLocation, Navigate } from "react-router-dom";

// Stipe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckOutForm from "../components/CheckOutForm";

import "./css-pages/payment.scss";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token }) => {
  const location = useLocation();
  const { title, price } = location.state;

  return token ? (
    <div className="main-payment-container">
      <div className="payment-container">
        <div className="top-bloc-pay">
          <p>Resumé de la commande</p>
          <div>
            <span>Commande:</span>
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
          <span className="total">Total</span>
          <span>
            <span className="bold">{price}</span>{" "}
          </span>
          <p>
            Il ne vous reste plus q'une etape pour vous offrir
            <span className="bold">{title}</span>.
          </p>
          <p>
            Vous allez payer <span className="bold">{price}</span> euros (frais
            de protection et frais de port inclus).
          </p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckOutForm title={title} price={price} />
        </Elements>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
