import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

export default function NotFound(): JSX.Element {
  return (
    <article className="not-found">
      <h2 className="not-found__title">
        404, sorry page doesnt exist
      </h2>
      <Link to="/">Go Home</Link>
    </article>
  );
}
