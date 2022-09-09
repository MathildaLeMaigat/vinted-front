import "./css-pages/publish.scss";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  // console.log(token);
  // state for input
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

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
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return token ? (
    <form className="publish-form" onSubmit={handleSubmit}>
      <div className="div-h2">
        <p>Vends ton article</p>
      </div>

      <div className="publish-img">
        <div className="bloc-img">
          <input
            style={{ name: "photo" }}
            type="file"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setPicture(event.target.files[0]);
              setPreview(URL.createObjectURL(event.target.files[0]));
            }}
          ></input>
          <div className="img-container">
            <img
              className="preview"
              src={preview}
              style={{ width: "200px", marginLeft: "20px" }}
              alt="img"
            />
          </div>
        </div>
      </div>
      <div className="bloc-2">
        <div className="bloc-2-input">
          <div className="bloc-3">
            <div>
              <span>Title</span>
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: title..."
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>{" "}
            <div>
              <span>Description</span>{" "}
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: description..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="bloc-4">
            <div>
              <span>Brand</span>
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: brand..."
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              />
            </div>
            <div>
              <span>Size</span>
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: size..."
                value={size}
                onChange={(event) => setSize(event.target.value)}
              />
            </div>
            <div>
              <span>Color</span>
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: color..."
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />
            </div>
            <div>
              <span>Condition</span>{" "}
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: condition..."
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
              />
            </div>
            <div>
              <span>City</span>
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: city..."
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
          </div>

          <div>
            <span>Price</span>
            <input
              style={{ fontSize: "15px" }}
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
  ) : (
    <Navigate to="/login" />
  );
};

// const Publish = ({ token }) => {
//   //variable for every input
//   const [picture, setPicture] = useState(null);
//   const [title, setTitle] = useState("air max 90");
//   const [description, setDescription] = useState("tres bon etat");
//   const [brand, setBrand] = useState("nike");
//   const [city, setCity] = useState("paris");
//   const [size, setSize] = useState("44");
//   const [color, setColor] = useState("blue");
//   const [price, setPrice] = useState("80");
//   const [condition, setCondition] = useState("");
//   const [preview, setPreview] = useState(null);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       const formData = new FormData();
//       formData.append("picture", picture);
//       formData.append("title", title);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("condition", condition);
//       formData.append("city", city);
//       formData.append("brand", brand);
//       formData.append("size", size);
//       formData.append("color", color);

//       const response = await axios.post(
//         "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
//         formData,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       if (response.data._id) {
//         navigate(`/product/${response.data._id}`);
//       }
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className="offerPublish">
//         <h1>Vends ton article</h1>

//         <form className="sell wrapper" onSubmit={handleSubmit}>
//           <div className="sell-image">
//             <div className="sell-image-border">
//               <input
//                 id="files"
//                 type="file"
//                 onChange={(e) => {
//                   setPicture(e.target.files[0]);
//                   setPreview(URL.createObjectURL(e.target.files[0]));
//                 }}
//               ></input>
//               <div className="img-container">
//                 <img
//                   className="preview"
//                   src={preview}
//                   style={{ width: "200px" }}
//                   alt=""
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="sell-home">
//             <div className="sell-home-title">
//               <h3>Titre</h3>
//               <input
//                 className="sell-input"
//                 type="text"
//                 placeholder="ex : Chemise Sézane verte"
//                 value={title}
//                 onChange={(e) => {
//                   setTitle(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="sell-home-description">
//               <h3>Décris ton article</h3>
//               <textarea
//                 className="sell-input"
//                 id="sell-textarea"
//                 type="text"
//                 placeholder="ex : porté quelquefois, taille correctement"
//                 value={description}
//                 onChange={(e) => {
//                   setDescription(e.target.value);
//                 }}
//               />
//             </div>
//           </div>

//           <div className="sell-description">
//             <div className="sell-home-title">
//               <h3>Marque</h3>
//               <input
//                 className="sell-input"
//                 type="text"
//                 placeholder="ex : Chemise Sézane verte"
//                 value={brand}
//                 onChange={(e) => {
//                   setBrand(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="sell-home-title">
//               <h3>Taille</h3>
//               <input
//                 className="sell-input"
//                 type="text"
//                 placeholder="ex : Chemise Sézane verte"
//                 value={size}
//                 onChange={(e) => {
//                   setSize(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="sell-home-title">
//               <h3>Couleur</h3>
//               <input
//                 className="sell-input"
//                 type="text"
//                 placeholder="ex : Chemise Sézane verte"
//                 value={color}
//                 onChange={(e) => {
//                   setColor(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="sell-home-title">
//               <h3>Etat</h3>
//               <input
//                 className="sell-input"
//                 type="text"
//                 placeholder="ex : Chemise Sézane verte"
//                 value={condition}
//                 onChange={(e) => {
//                   setCondition(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="sell-home-title">
//               <h3>Lieu</h3>
//               <input
//                 className="sell-input"
//                 type="text"
//                 placeholder="ex : Chemise Sézane verte"
//                 value={city}
//                 onChange={(e) => {
//                   setCity(e.target.value);
//                 }}
//               />
//             </div>
//           </div>

//           <div className="sell-home">
//             <div className="sell-home-title">
//               <h3>Prix</h3>
//               <input
//                 className="sell-input"
//                 type="text"
//                 placeholder="ex : 0,00 €"
//                 value={price}
//                 onChange={(e) => {
//                   setPrice(e.target.value);
//                 }}
//               />
//             </div>
//             <button className="add-offer" type="submit">
//               Ajouter
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

export default Publish;
