import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import GameLevel from "./components/GameLevel/GameLevel";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/:levelId" element={<GameLevel />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
