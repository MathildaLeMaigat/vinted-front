const Header = () => {
  return (
    <div className="header">
      <p>Vinted</p>
      <div>
        <input type="text" placeholder="Recherche des articles"></input>
      </div>

      <button>S'inscrire</button>
      <button>Se connecter</button>
    </div>
  );
};

export default Header;
