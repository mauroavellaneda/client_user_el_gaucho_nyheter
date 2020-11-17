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
        <h1 data-cy="header">{t("El Gaucho News")}</h1>
        <Menu.Item as={Link} to="/" data-cy="home" id="login">
          {t("Home")}
        </Menu.Item>
        <Menu.Item as={Link} to="/category/news" data-cy="news" id="login">
          {t("News")}
        </Menu.Item>
        <Menu.Item as={Link} to="/category/sports" data-cy="sports" id="login">
          {t("Sports")}
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/category/politics"
          data-cy="politics"
          id="login"
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
            id="login"
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
          id="login"
        >
          {t("Login")}
        </Menu.Item>
      )}
      <Menu.Item>
        <Dropdown
          data-cy="change-language"
          id="login"
          item
          text={t("Language")}
        >
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                i18n.changeLanguage("sv");
              }}
            >
              {t("Swedish")}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                i18n.changeLanguage("en");
              }}
            >
              {t("English")}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                i18n.changeLanguage("sp");
              }}
            >
              {t("Spanish")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
