import './App.css';
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Service from './Components/Service/Service';
import Profile from './Components/Profile/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/login/:next" component={Login} />
      <Route path="/register/"  component={Register} />
      <Route path="/login/" component={Login} />
      <Route path="/home/" component={Home} />
      <Route path="/addservice/:id" component={Service} />
      <Route path="/profile/" component={Profile} />

      </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
