import { Message, Container, Grid } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import Articles from "../modules/articles";
import { useParams, useLocation } from "react-router-dom";
import ArticlesCard from "./ArticlesCard";

const DisplayArticles = () => {
  const [articles, setArticles] = useState([]);
  const { category, local } = useParams();
  const [message, setMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  let location = useLocation();

  useEffect(() => {
    const getArticlesIndex = async () => {
      const response = await Articles.index(category, local);
      if (response?.constructor === Array) {
        setArticles(response);
        setErrorMessage("");
      } else {
        setArticles([]);
        setErrorMessage(response);
      }
    };
    getArticlesIndex();
  }, [category, local]);

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
