import { Message, Container, Grid, Segment, Header } from "semantic-ui-react";
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
      {local && (
        <Container>
          <Segment id="headersegment" textAlign="center">
            <Header>
              {local === "Sweden"
                ? "Welcome to our news about Sweden!"
                : "Enjoy our International section!"}
            </Header>
          </Segment>
        </Container>
      )}
      {category ? (
        <Container>
          <Segment id="headersegment" textAlign="center">
            <Header>
              Enjoy our {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
              section!
            </Header>
          </Segment>
        </Container>
      ) : (
        !local && (
          <Container>
            <Segment id="headersegment" textAlign="center">
              <Header>Enjoy our content!</Header>
            </Segment>
          </Container>
        )
      )}
      {message && (
        <Message positive data-cy="payment-success-message">
          <Message.Header>{message}</Message.Header>
        </Message>
      )}
      {errorMessage && (
        <Message negative data-cy="error-message">
          <Message.Header>{errorMessage}</Message.Header>
        </Message>
      )}
      <div id="container">
        <Grid>
          <Grid.Row>
            {articles.map((article) => {
              return (
                <div
                  class="card-style"
                  data-cy={"article-" + article.id}
                  key={article.id}
                >
                  <ArticlesCard article={article} />
                </div>
              );
            })}
          </Grid.Row>
        </Grid>
      </div>
    </>
  );
};

export default DisplayArticles;
