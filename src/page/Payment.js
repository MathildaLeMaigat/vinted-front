import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  return <div>Paiement</div>;
};

export default Payment;
