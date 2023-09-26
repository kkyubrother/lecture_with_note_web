import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import UrlInputPage from "./pages/UrlInputPage";
import YoutubeLecturePage from "./pages/Lecture/YoutubeLecturePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/url-input" element={<UrlInputPage />} />
        <Route path="/lectures/youtube" element={<YoutubeLecturePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
