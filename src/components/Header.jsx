import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const authenticated = useSelector((state) => state.authenticated);
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <Menu inverted>
      <Menu.Item>
        <h1 data-cy="header">El Gaucho Nyheter</h1>
        <Menu.Item as={Link} to="/" data-cy="home">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/category/news" data-cy="news">
          News
        </Menu.Item>
        <Menu.Item as={Link} to="/category/sports" data-cy="sports">
          Sports
        </Menu.Item>
        <Menu.Item as={Link} to="/category/politics" data-cy="politics">
          Politics
        </Menu.Item>
      </Menu.Item>
      {authenticated ? (
        currentUser.role !== "subscriber" && (
          <Menu.Item
            as={Link}
            to="/become-subscriber"
            data-cy="become-subscriber"
            position="right"
          >
            Become Subscriber
          </Menu.Item>
        )
      ) : ( 
        <Menu.Item as={Link} to="/login" data-cy="login" position="right">
          Login
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Header;
