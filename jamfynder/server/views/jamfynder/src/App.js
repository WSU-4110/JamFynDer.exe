import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import WelcomePage from "./components/WelcomePage";
import NavigationBar from "./components/NavigationBar";
import TutorialPage from "./components/TutorialPage";
import SettingsPage from "./components/SettingsPage";
import AboutUs from "./components/AboutUs";
import Player from "./components/Player";

const CLIENT_ID = "f12088ba0b0c45018df4dad44b51b83d";
const ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL = "http://localhost:3000/Player";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-read-currently-playing", "user-read-playback-state"];
const SCOPES_URL_PARM = SCOPES.join(SPACE_DELIMITER);

const App = () => {
  const handleLogin = () => {
    window.location = `${ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES_URL_PARM}&response_type=token&show_dialog=true`;
  };
  return <body> Hello </body>;
};
//   return (
//     // <Router>
//     //   <div className="App">
//     //     <NavigationBar />
//     //     <div className="content">
//     //       <Switch>
//     //         <Route path="/welcome">
//     //           <WelcomePage />
//     //         </Route>

//     //         <Route path="/Player">
//     //           <Player />
//     //         </Route>

//     //         <Route path="/SettingsPage">
//     //           <SettingsPage />
//     //         </Route>

//     //         <Route path="/about_us">
//     //           <AboutUs />
//     //         </Route>

//     //         <Route path="/tutorial">
//     //           <TutorialPage />
//     //         </Route>
//     //       </Switch>
//     //     </div>
//     //   </div>
//     // </Router>
//   // );
// };

export default App;