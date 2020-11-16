import React, { useState } from "react";
import { Menu, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MainHeader = () => {
  const [activeItem, setActiveItem] = useState("news");
  const authenticated = useSelector((state) => state.authenticated);
  const currentUser = useSelector((state) => state.currentUser);
  const country = useSelector((state) => state.country);
  const handleItemClick = ({ name }) => {
    setActiveItem(name);
  };

  return (
    <>
      <Segment inverted>
        <Header>
          <Menu inverted>
            <Menu.Item as={Link} to="/" data-cy="home">
              <h1 data-cy="header" id="header">
                El Gaucho Nyheter
              </h1>
            </Menu.Item>

            {authenticated ? (
              currentUser.role !== "subscriber" && (
                <Menu.Item
                  as={Link}
                  to="/become-subscriber"
                  data-cy="become-subscriber"
                  position="right"
                  id="login"
                >
                  Become Subscriber
                </Menu.Item>
              )
            ) : (
              <Menu.Item
                as={Link}
                to="/login"
                data-cy="login"
                position="right"
                id="login"
              >
                Login
              </Menu.Item>
            )}
          </Menu>
        </Header>

        <Header.Subheader inverted>
          <Menu id="sub-menu">
            <Menu.Item
              as={Link}
              to="/category/sports"
              data-cy="sports"
              id="category"
            >
              Sports
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/category/politics"
              data-cy="politics"
              id="category"
            >
              Politics
            </Menu.Item>

            <Menu.Item
              as={Link}
              data-cy="local-news"
              id="category"
              active={activeItem === "location"}
              onClick={handleItemClick}
              to={{ pathname: `/local/${country}` }}
            >
              International
            </Menu.Item>
          </Menu>
        </Header.Subheader>
      </Segment>
    </>
  );
};

export default MainHeader;
