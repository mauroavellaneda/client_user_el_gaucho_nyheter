import { Message, Container, Grid } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import Articles from "../modules/articles";
import { useParams, useLocation } from "react-router-dom";
import ArticlesCard from "./ArticlesCard";

const DisplayArticles = () => {
  const [articles, setArticles] = useState([]);
  const [userLocation, setUserLocation] = useState();
  const { category } = useParams();
  const [message, setMessage] = useState();

  let location = useLocation();

  useEffect(() => {
    const getArticlesIndex = async () => {
      if (category === "local") {
        const response = await Articles.localIndex();
        setUserLocation(response.location);
        setArticles(response.articles);
      } else {
        setArticles(await Articles.index(category));
      }
    };
    getArticlesIndex();
  }, [category]);

  useEffect(() => {
    if (location.state) {
      setMessage(location.state.message);
    }
  }, [location]);

  return (
    <>
      <Container id="message-container">
        {message && (
          <Message data-cy="message" color="green">
            {message}
          </Message>
        )}
        {userLocation && (
          <h3 data-cy="current-location">Local news from: {userLocation}</h3>
        )}
      </Container>

      <Container className="articles-container">
        <Grid>
          <Grid.Row columns={4}>
            {articles.map((article) => {
              return (
                <>
                  <ArticlesCard article={article} />
                </>
              );
            })}
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
};

export default DisplayArticles;
