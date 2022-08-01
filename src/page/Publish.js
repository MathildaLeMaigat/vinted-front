import { useState } from "react";
import axios from "axios";

const Publish = () => {
  const [picture, setPicture] = useState(null);
  const [data, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("picture", picture);

    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/offer/publish"
    );
    console.log(response.data);
    setData(response.data);
  };

  return (
    <div>
      <h1>Vend ton article</h1>
      <form onSubmit={handleSubmit}>
        <input type="file"></input>
        <input type="submit" value="Ajouter une image"></input>
      </form>
    </div>
  );
};

export default Publish;
