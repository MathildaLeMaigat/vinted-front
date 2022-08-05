import "../components/header.scss";

import { Link } from "react-router-dom";
import logo from "../assets/download.png";

const Header = ({ handleToken, userToken }) => {
  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>

      <div>
        <input type="text" placeholder="Recherche des articles"></input>
      </div>
      {!userToken ? (
        <>
          <div className="right-bloc-header">
            <Link to="/signup">
              <button className="log">S'inscrire</button>
            </Link>
            <Link to="/login">
              <button className="log">Se connecter</button>
            </Link>
            <Link to="/publish">
              <button className="sell-articles">Vends tes articles</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <button
            className="disconnect"
            onClick={() => {
              handleToken();
            }}
          >
            Deconnexion
          </button>
          <Link to="/publish">
            <button className="sell-articles">Vends tes articles</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
