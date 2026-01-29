import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Styling
import { ThemeProvider } from "styled-components";
import MasterTheme from "./components/theme/MasterTheme";
import "./styles/index.css";
import "react-alice-carousel/lib/alice-carousel.css";

//Routes
import PrivateRoute from "./components/Authentication/PrivateRoute/PrivateRoute";

//Components
import App from "./components/App/App";
import HomePage from "./components/Pages/HomePage/HomePage/HomePage";
import LandingPage from "./components/Pages/LandingPage/LandingPage/LandingPage";
import WelcomePage from "./components/Pages/WelcomePage/WelcomePage/WelcomePage";
import SignBackIn from "./components/SignIn/SignBackIn/SignBackIn";
import DashboardView from "./components/Dashboard/DashboardView/DashboardView";
import PublishedGames from "./components/Games/PublishedGames/PublishedGames";
import ConceptGames from "./components/Games/ConceptGames/ConceptGames";
import SingleGameView from "./components/Pages/SingleGameView/SingleGameView";
import AdvancedSearch from "./components/AdvancedSearch/AdvancedSearch";
import SearchResultsDisplay from "./components/AdvancedSearch/SearchResultsDisplay/SearchResultsDisplay";
import Favorites from "./components/Favorites/Favorties";
import Logout from "./components/Logout/Logout";
import FeaturedGames from "./components/FeaturedGames/FeaturedGames";
import Navbar from "./components/PageBase/NavigationBar/NavigationBar";
import Footer from "./components/PageBase/Footer/Footer";
import { useLocation } from "react-router-dom";

//FontAwesome Library Initialize
import { faLibrary } from "./fontawesome/fa_library";
faLibrary();

export default function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

ReactDOM.render(
  <Router>
    <ScrollToTop />
    <ThemeProvider theme={MasterTheme}>      
      <App>
        <Navbar authorized={true} />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/welcome" component={WelcomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/signin" component={SignBackIn} />
          <PrivateRoute
            exact
            path="/featured-games"
            component={FeaturedGames}
          />
          <PrivateRoute exact path="/dashboard" component={DashboardView} />
          <PrivateRoute exact path="/games" component={PublishedGames} />
          <PrivateRoute
            exact
            path="/viewgame/:id*/"
            component={SingleGameView}
          />
          <PrivateRoute
            exact
            path="/advancedsearch"
            component={AdvancedSearch}
          />
          <PrivateRoute
            exact
            path="/searchresults"
            component={SearchResultsDisplay}
          />
          <PrivateRoute exact path="/favorites" component={Favorites} />
          <PrivateRoute exact path="/concepts" component={ConceptGames} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
        <Footer />
      </App>
    </ThemeProvider>
  </Router>,

  document.getElementById("root")
);
