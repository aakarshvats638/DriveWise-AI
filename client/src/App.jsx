import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recommend from "./pages/Recommend";
import Compare from "./pages/Compare";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;