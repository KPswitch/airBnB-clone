import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignUpFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components//Navigation";
import LogoHeader from "./components/Logo";
import SpotComponent from "./components/HomeSpots";
import SpotDetails from "./components/SpotById";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>

      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/spots/:id'>
            <SpotDetails />
          </Route>
          <Route path ="/">
            <SpotComponent />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
