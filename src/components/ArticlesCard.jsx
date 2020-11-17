import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ArticlesCard = ({ article }) => {
  return (
    <>
      <Card
        as={Link}
        to={`/articles/${article.id}`}
        data-cy={"article-" + article.id}
        id="cards"
      >
        {article.image && <Image data-cy="image" src={article.image} />}
        <Card.Content>
          <Card.Header>{article.title}</Card.Header>
          <Card.Description>{article.lead}</Card.Description>
        </Card.Content>
      </Card>
    </>
  );
};
export default ArticlesCard;
