import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CheckOutForm = ({ productName, totalPrice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      //Récupérer les données bancaires
      const cardElement = elements.getElement(CardElement);
      console.log(cardElement);
      //Demander à Stripe si elles sont valables
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      console.log(stripeResponse);

      //Envoyer ce stripeToken à l'api Vinted
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          amount: totalPrice,
          title: productName,
          token: stripeResponse.token.id,
        }
      );

      //   console.log(response.data);

      if (response.data.status === "succeeded") {
        console.log("payment completed!");
        setCompleted(true);
      }
    } catch (error) {
      console.log({ error: error.message }, "failed");
    }
  };

  return completed ? (
    <>
      <p>Merci pour votre achat 🐥</p>
      <Link to="/">
        <p className="accueil"> → Accueil</p>
      </Link>
    </>
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement className="pay" />
        <button className="button-pay" type="submit">
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckOutForm;
