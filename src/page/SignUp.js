import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const SignUp = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchInfo = async () => {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup"
        );
        console.log(response.data);
      };
      fetchInfo();
    } catch (error) {
      console.log({ error: error.message });
    }
  }, []);

  return (
    <div className="signup">
      <p>S'inscrire</p>
      <input type="text" placeholder="Nom d'utilisateur"></input>
      <input type="email" placeholder="Email"></input>
      <input type="password" placeholder="Mot de Passe"></input>
      <button>Subscribe</button>
    </div>
  );
};

export default SignUp;
