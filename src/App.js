import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FloorMapAnalytics from "./floor-map-analytics";

function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        <BrowserRouter basename="/floor">
          <Routes>
            <Route path="/" element={<FloorMapAnalytics />} />
          </Routes>
        </BrowserRouter>
      </Main>
    </div>
  );
}

export default App;
