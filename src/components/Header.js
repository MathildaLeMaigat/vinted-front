import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <p>Vinted</p>
      <div>
        <input type="text" placeholder="Recherche des articles"></input>
      </div>
      <Link to="/signup">
        <button>S'inscrire</button>
      </Link>
      <Link to="/login">
        <button>Se connecter</button>
      </Link>

      <button>Deconnexion</button>
    </div>
  );
};

export default Header;
