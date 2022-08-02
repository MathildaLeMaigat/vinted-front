import "./css-pages/publish.scss";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  console.log(token);
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(null);

  const [data, setData] = useState(null);
  const [isPictureSending, setIsPictureSending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsPictureSending(true);
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      setIsPictureSending(false);
      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <div className="bloc-publish">
      <form onSubmit={handleSubmit}>
        <div className="div-h2">
          <h2>Vends ton article</h2>
        </div>
        <div className="publish-img">
          <input
            onChange={(event) => {
              console.log(event.target.files[0]);
              setPicture(event.target.files[0]);
            }}
            type="file"
          ></input>

          {isPictureSending === true ? (
            <p>Image en cours de chargement</p>
          ) : (
            data && (
              <img
                src={data.product_image.secure_url}
                style={{ width: "200px" }}
                alt="picture1"
              />
            )
          )}
        </div>
        <div className="bloc-2">
          <div className="bloc-2-input">
            <div>
              <span>Title</span>
              <input
                type="text"
                placeholder="ex: title..."
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div>
              <span>Brand</span>
              <input
                type="text"
                placeholder="ex: brand..."
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              />
            </div>
            <div>
              <span>Description</span>{" "}
              <input
                type="text"
                placeholder="ex: description..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div>
              <span>Size</span>
              <input
                type="text"
                placeholder="ex: size..."
                value={size}
                onChange={(event) => setSize(event.target.value)}
              />
            </div>
            <div>
              <span>Color</span>
              <input
                type="text"
                placeholder="ex: color..."
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />
            </div>
            <div>
              <span>Condition</span>{" "}
              <input
                type="text"
                placeholder="ex: condition..."
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
              />
            </div>
            <div>
              <span>City</span>
              <input
                type="text"
                placeholder="ex: city..."
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div>
              <span>Price</span>
              <input
                type="text"
                placeholder="ex: price..."
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
          </div>
          <div className="add-button">
            <button>Ajouter</button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
