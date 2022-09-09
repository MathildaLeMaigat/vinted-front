import { useLocation, Navigate } from "react-router-dom";

// Import Stipe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import ProductSummary from "../components/ProductSummary";
import CheckOutForm from "./CheckOutForm";

import "./css-pages/payment.scss";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ token, name }) => {
  const location = useLocation();

  const { productName, totalPrice, protectionFees, shippingFees, price } =
    location.state;

  return token ? (
    <div className="main-payment-container">
      <div className="payment-container">
        <ProductSummary
          price={price}
          protectionFees={protectionFees}
          shippingFees={shippingFees}
          totalPrice={totalPrice}
        />
        <div className="payment-card">
          <div className="content">
            Il ne vous reste plus qu'un étape pour vous offrir
            <span className="bold"> {productName}</span>. Vous allez payer
            <span className="bold">{totalPrice} €</span> (frais de protection et
            frais de port inclus).
            <div className="divider" />
            <Elements stripe={stripePromise}>
              <CheckOutForm productName={productName} totalPrice={totalPrice} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
