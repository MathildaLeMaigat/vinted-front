import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import des pages
import Home from "./routes/Home";
import Offer from "./routes/Offer";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
