import "./css-pages/signup.scss";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      // console.log(response.data);
      handleToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  return (
    <div className="signup">
      <h1>S'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="top"
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <input
          className="top"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
        <input
          className="top"
          type="password"
          placeholder="Mot de Passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <div className="newsletter">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          ></input>
          <span>S'inscrire à notre newsletter</span>
        </div>

        <button>S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;
