import { useState } from "react";
import axios from "axios";

const SignUp = ({ handleToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

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
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  return (
    <div className="signup">
      <p>S'inscrire</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="Mot de Passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        ></input>
        <div>
          <input
            type="checkbox"
            checked={newsletter}
            onChange={() => {
              setNewsletter(!newsletter);
            }}
          ></input>
          <span>Newsletter</span>
        </div>

        <button>S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;
