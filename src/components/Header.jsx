import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Header = () => {
  const authenticated = useSelector((state) => state.authenticated);
  const currentUser = useSelector((state) => state.currentUser);
  const { t } = useTranslation();

  return (
    <Menu inverted>
      <Menu.Item>
        <h1 data-cy="header" name="header">
          {t("El Gaucho News")}
        </h1>
        <Menu.Item as={Link} to="/" data-cy="home" name="home">
          {t("Home")}
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/category/news"
          data-cy="local-news"
          name="local-news"
        >
          {t("Local News")}
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/category/sports"
          data-cy="sports"
          name="sports"
        >
          {t("Sports")}
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/category/politics"
          data-cy="politics"
          name="politics"
        >
          {t("Politics")}
        </Menu.Item>
      </Menu.Item>
      {authenticated ? (
        currentUser.role !== "subscriber" && (
          <Menu.Item
            as={Link}
            to="/become-subscriber"
            data-cy="become-subscriber"
            position="right"
            name="become-subscriber"
          >
            {t("Become Subscriber")}
          </Menu.Item>
        )
      ) : (
        <Menu.Item
          as={Link}
          to="/login"
          data-cy="login"
          position="right"
          name="login"
        >
          {t("Login")}
        </Menu.Item>
      )}
      <Dropdown
        data-cy="change-language"
        name="language"
        item
        text={t("Language")}
      >
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              i18n.changeLanguage("sv");
            }}
          >
            Svenska
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              i18n.changeLanguage("en");
            }}
          >
            English
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu>
  );
};

export default Header;
