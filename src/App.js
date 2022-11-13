import React from "react";
import './App.css';
import Layout from "./Pages/Layout";
import Home from "./HomeScreen/Home";
import Select from "./SelectScreen/Select";
import NoPage from "./Pages/NoPage";
import ReactDOM from "react-dom/client";
import Breakout from "./Breakout";
import {BrowserRouter as BrowserRouter, Routes, Route} from "react-router-dom";
import FlappyGame from "./FlappyGame";
import Scores from "./HighScores/Scores";


/*
<Router>
          <div>
              <ul>
                  <li>
                      <Link to="/">Home</Link>
                  </li>
                  <li>
                      <Link to="/">Breakout</Link>
                  </li>

              </ul>
              <hr/>
                  <Switch>
                      <Route exact path="/">
                          <h1>Home</h1>
                      </Route>
                      <Route path="/breakout">
                          <h1>breakout</h1>
                      </Route>

                  </Switch>
          </div>
      </Router>
*/

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="breakout" element={<Breakout />} />
                  <Route path="Flappy" element={<FlappyGame/>} />
                  <Route path= "Select" element = {<Select/>}/>
                  <Route path= "Scores" element = {<Scores/>}/>
                  <Route path="*" element={<NoPage />} />
              </Route>
          </Routes>
      </BrowserRouter>

  );
}

export default App;
