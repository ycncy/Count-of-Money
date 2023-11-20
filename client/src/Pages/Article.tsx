import React from 'react';
import { Link } from 'react-router-dom';

interface RouteParams {
    id: string;
}

const Article: React.FC = () => {
    return (
        <div>
            <h1>Article Page</h1>
            <Link to='/'>Homepage</Link>

            {/* Contenu de l'article */}
        </div>
    );
};

export default Article;