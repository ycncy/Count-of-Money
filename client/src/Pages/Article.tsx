// ArticlePage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

interface RouteParams {
  id: string;
}

const Article: React.FC = () => {
  const { id } = useParams<RouteParams>();

  return (
    <div>
      <h1>Article Page</h1>
      <p>Article ID: {id}</p>
      {/* Contenu de l'article */}
    </div>
  );
};

export default Article;
