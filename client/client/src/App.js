import { Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Details from "./components/Details";
import recipeCreate from "./components/recipeCreate";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/Home" component={Home} />
        <Route path="/recipe/:id" component={Details} />
        <Route path="/recipeCreate" component={recipeCreate} />
      </Switch>
    </div>
  );
}

export default App;
