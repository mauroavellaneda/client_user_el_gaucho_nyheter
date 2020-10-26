import React from "react";
import { Menu, Header, Segment, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const MainHeader = () => {
  const { t } = useTranslation();
  const authenticated = useSelector((state) => state.authenticated);
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <>
      <Segment inverted>
        <Header>
          <Menu inverted>
            <Menu.Item as={Link} to="/" data-cy="home">
              <h1 data-cy="header" id="header">
                {t("El Gaucho Nyheter")}
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
              {t("Sports")}
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/category/politics"
              data-cy="politics"
              id="category"
            >
              {t("Politics")}
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/category/local"
              data-cy="local-news"
              id="category"
            >
              {t("Local news")}
            </Menu.Item>
            <Dropdown data-cy="change-language" item text={t("change-language")}>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    i18n.changeLanguage("sv");
                  }}
                >
                  {t("Svenska")}
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
          </Menu>
        </Header.Subheader>
      </Segment>
    </>
  );
};

export default MainHeader;
