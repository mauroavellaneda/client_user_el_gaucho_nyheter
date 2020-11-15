import React from "react";
import DisplayArticles from "./components/DisplayArticles";
import SingleArticle from "./components/SingleArticle";
import { Switch, Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import BecomeSubscriber from "./components/BecomeSubscriber";
import RegistrationForm from "./components/RegistrationForm";
import { persistLogin } from "./modules/auth";
import { useDispatch } from "react-redux";
import { getCurrentPosition } from "./modules/location";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentPosition(dispatch);
    persistLogin(dispatch);
  }, []);
  return (
    <>
      <MainHeader />
      <Switch>
        <Route exact path="/category/:category" component={DisplayArticles} />
        <Route exact path="/local/:local" component={DisplayArticles} />
        <Route exact path="/articles/:id" component={SingleArticle} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegistrationForm} />

        <ProtectedRoute path="/become-subscriber">
          <BecomeSubscriber />
        </ProtectedRoute>

        <Route path="/" component={DisplayArticles} />
      </Switch>
    </>
  );
};
export default App;
