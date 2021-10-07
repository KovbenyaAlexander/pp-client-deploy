import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import GameResultsTable from '../../components/game-results-table/game-results-table';
import { IStore, IStory } from '../../types';
import './style.scss';

export default function ResultsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const game = useSelector((state: IStore) => state.game);
  const history = useHistory();

  useEffect(() => {
    if (!id || !game.id) history.push('/');
  }, [id, game.id]);

  function generateCsv(stories: IStory[]): string {
    const arrayForBlob = stories.map((story) => `${story.name};${story.description};${story.isCompleted ? 'Completed'
      : 'Not Completed'};${story.estimation};\n`);
    arrayForBlob.unshift('Name;Description;Status;Decision;\n');
    const blob = new Blob(arrayForBlob, { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    return url;
  }

  return (
    <article className="results-page">
      <h2 className="results-page__header">Results</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Decision</th>
          </tr>
        </thead>
        <tbody>
          {game.settings.stories.map((story) => <GameResultsTable key={story.id} story={story} />)}
        </tbody>
      </table>
      <a
        href={generateCsv(game.settings.stories)}
        download={`${game.settings.gameName || 'result'}.csv`}
      >
        Download Results

      </a>
    </article>
  );
}
