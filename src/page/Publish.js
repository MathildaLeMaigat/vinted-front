import { useState } from "react";
import axios from "axios";

const Publish = () => {
  const [picture, setPicture] = useState(null);
  const [data, setData] = useState(null);
  const [isPictureSending, setIsPictureSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPictureSending(true);
    const formData = new FormData();
    formData.append("picture", picture);

    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
      formData
    );
    console.log(response.data);
    setData(response.data);
    setIsPictureSending(false);
  };

  return (
    <div>
      <h1>Vend ton article</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(event) => {
            console.log(event.target.files[0]);
            setPicture(event.target.files);
          }}
          type="file"
        ></input>
        <input type="submit" value="Ajouter une image"></input>

        {isPictureSending === true ? (
          <p>Image en cours de chargement</p>
        ) : (
          data && (
            <img
              src={data.secure_url}
              style={{ width: "200px" }}
              alt="picture1"
            />
          )
        )}
      </form>
    </div>
  );
};

export default Publish;
