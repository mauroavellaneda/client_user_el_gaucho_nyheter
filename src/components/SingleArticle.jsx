import { Image, Grid, Header, Button, Segment } from "semantic-ui-react";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Articles from "../modules/articles";
import { useSelector } from "react-redux";

const SingleArticle = () => {
  const [article, setArticle] = useState({});
  const [message, setMessage] = useState("");
  const authenticated = useSelector((state) => state.authenticated);
  const currentUser = useSelector((state) => state.currentUser);
  const { id } = useParams();

  useEffect(() => {
    const getSingleArticle = async () => {
      const response = await Articles.show(id, authenticated);
      if (response.id) {
        setArticle(response);
      } else {
        setMessage(response);
      }
    };

    getSingleArticle();
  }, [id, authenticated]);

  return (
    <>
      {message ? (
        <p data-cy="error-message">{message}</p>
      ) : (
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={13}>
              <Header data-cy="title">{article.title}</Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={10}>
              <h5>{article.lead}</h5>
              {article.image && (
                <Image data-cy="image" size="medium" src={article.image} />
              )}
            </Grid.Column>
            <Grid.Column width={5}></Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={10}>
              <p data-cy="content">{article.content}</p>
            </Grid.Column>

            <Grid.Column width={5}></Grid.Column>
          </Grid.Row>
          {article.premium && currentUser.role !== "subscriber" && (
            <Segment color="black" textAlign="center">
              <h4 data-cy="premium-message">
                This is a premium article, become a subscriber to read full
                content{" "}
              </h4>
              <Button
                as={Link}
                to={authenticated ? "/become-subscriber" : "/login"}
                color="red"
                data-cy="subscription-button"
              >
                {authenticated
                  ? "Buy subscription"
                  : "You need to login to become subscriber"}
              </Button>
            </Segment>
          )}
        </Grid>
      )}
    </>
  );
};

export default SingleArticle;
