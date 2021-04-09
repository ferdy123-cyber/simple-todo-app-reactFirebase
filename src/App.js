import "./App.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./component/page/auth/register";
import Login from "./component/page/auth/login";
import Todo from "./component/page/todo/todo";
import DetailTodo from "./component/page/todo/detailTodo";

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Register} path="/register" exact />
        <Route component={Login} path="/login" exact />
        <Route component={Todo} path="/" exact />
        <Route component={DetailTodo} path="/:id" exact />
      </Switch>
    </Router>
  );
}

export default App;
