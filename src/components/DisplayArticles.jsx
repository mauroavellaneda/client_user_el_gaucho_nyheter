import { Card, Image, Message } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import Articles from "../modules/articles";
import { Link, useParams, useLocation } from "react-router-dom";

const DisplayArticles = () => {
  const [articles, setArticles] = useState([]);
  const { category } = useParams();
  const [message, setMessage] = useState();
  let location = useLocation();

  useEffect(() => {
    const getArticlesIndex = async () => {
      setArticles(await Articles.index(category));
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
      {message && (
        <Message data-cy="message" color="green">
          {message}
        </Message>
      )}
      <div className="articles-container">
        {articles.map((article) => {
          return (
            <Card
              as={Link}
              to={`/articles/${article.id}`}
              data-cy={"article-" + article.id}
            > {article.image && (
              <Image data-cy="image" src={article.image} />
            )}
              <Card.Content>
                <Card.Header>{article.title}</Card.Header>
                <Card.Description>{article.lead}</Card.Description>
              </Card.Content>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default DisplayArticles;
