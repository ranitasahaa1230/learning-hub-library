import "./App.css";
import { useState } from "react";
import { Footer, Header, NotFound } from "./components";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import Mockman from "mockman-js";

function App() {
  const [sidebars, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar((prev) => !prev);

  return (
    <div className="App">
      <Header handleToggleSidebar={handleToggleSidebar} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              sidebars={sidebars}
              handleToggleSidebar={handleToggleSidebar}
            />
          }
        />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <button
        className="button button-floating"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {" "}
        <i className="fas fa-arrow-up"></i>
      </button>
      <Footer />
    </div>
  );
}

export default App;
