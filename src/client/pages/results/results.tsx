import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import GameResultsTable from '../../components/game-results-table/game-results-table';
import { setInitialStore } from '../../store/actions';
import { IStore, IStory } from '../../types';
import './style.scss';

export default function ResultsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const game = useSelector((state: IStore) => state.game);
  const history = useHistory();
  const dispatch = useDispatch();

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

  function returnToMain(): void {
    dispatch(setInitialStore());
  }

  return (
    <article className="results-page">
      <h2 className="results-page__title">Results</h2>
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
      <div className="results-page__buttons">
        <a
          className="button button_green "
          href={generateCsv(game.settings.stories)}
          download={`${game.settings.gameName || 'result'}.csv`}
        >
          Download Results

        </a>
        <button type="button" className="button button_red" onClick={returnToMain}>Back to Main</button>
      </div>
    </article>
  );
}
