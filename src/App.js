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
import Board from "./MainBoard/Board";
import End from "./EndScreen/End";


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
              <Route path="/" element={<Home />} />
                  <Route path="breakout" element={<Breakout />} />
                  <Route path="Flappy" element={<FlappyGame/>} />
                  <Route path= "Select" element = {<Select/>}/>
                  <Route path= "Scores" element = {<Scores/>}/>
                  <Route path= "Board" element = {<Board/>}/>
                  <Route path= "End" element = {<End/>}/>
                  <Route path="Baseball" render={() => {window.location.href="../public/Baseball/index.html"}} />
                  <Route path="pong" render={() => {window.location.href="../public/Pong/index.html"}} />
                  <Route path="connect4" render={() => {window.location.href="../public/connect4/index.html"}} />
                  <Route path="tetris" render={() => {window.location.href="../public/Tetris/index.html"}} />
                  <Route path="puzzler" render={() => {window.location.href="../public/Puzzler/index.html"}} />
                  <Route path="snake" render={() => {window.location.href="../public/snake/index.html"}} />
                  <Route path="puzzler2" render={() => {window.location.href="../public/PuzzlerTwo/index.html"}} />

                  <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>

  );
}

export default App;
