import { useLocation, Navigate } from "react-router-dom";

// Import Stipe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckOutForm from "../components/checkOutForm";
import "./css-pages/payment.scss";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token, name }) => {
  const location = useLocation();
  const { title, price } = location.state;

  const taxBuy = Number((0.8).toFixed(2));
  const fees = Number((0.4).toFixed(2));

  const totalAmmount = Number((price + taxBuy + fees).toFixed(2));

  return token ? (
    <div className="main-payment-container">
      <div className="payment-container">
        <div className="top-bloc-pay">
          <div>
            <p>Resumé de la commande</p>
          </div>
          <div>
            <p>{title}</p>
            <p>{price.toFixed(2)} € </p>
          </div>
          <div>
            <p>Frais protection acheteurs:</p>
            <p>{taxBuy} €</p>
          </div>
          <div>
            <p>Frais de port</p>
            <p>{fees} €</p>
          </div>
        </div>
        <div className="middle-bloc-pay">
          <div className="total">
            <span>Total</span>
            <span>
              <span className="bold">{totalAmmount} €</span>
            </span>
          </div>
          <p>
            Il ne vous reste plus q'une etape pour vous offrir
            <span className="bold">{title}</span>.
          </p>
          <p>
            Vous allez payer <span className="bold">{totalAmmount}</span> euros
            (frais de protection et frais de port inclus).
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
