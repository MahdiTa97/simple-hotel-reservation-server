import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Tables from "./pages/Tables";

function App() {
  return (
    <Router>
      <div>
        <header className="bg-red-300">
          <nav className="flex items-center justify-items-center py-4 px-3">
            <ul className="container flex flex-row gap-8 font-bold mx-auto">
              <li className="hover:text-red-500">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-red-500">
                <Link to="/tables">Tables</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          <Route path="/tables">
            <Tables />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
