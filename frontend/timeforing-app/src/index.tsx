/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";

import "./index.css";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile/Profile";
import { appState } from "./state/store";
import WeekView from "./pages/WeekView/WeekView";
import WorkTimer from "./pages/WorkTimer/WorkTimer";
import Export from "./pages/Export/Export";
import Archive from "./pages/Archive/Archive";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?"
  );
}

const App = (props: any) => {
  // If the user is not logged in, redirect to the login page,
  // and if the pathname is not empty (contains google hash) redirect to the login page to finish authenticating
  if (!appState.user && window.location.pathname !== "/") {
    return <Login />;
  }

  return (
    <div>
      {appState.user && <Navbar />}
      {props.children}
    </div>
  );
};

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Login} />
      <Route path="/week-view" component={WeekView} />
      <Route path="/work-timer" component={WorkTimer} />
      <Route path="/export" component={Export} />
      <Route path="/archive" component={Archive} />
      <Route path="/profile" component={Profile} />
    </Router>
  ),
  root!
);
