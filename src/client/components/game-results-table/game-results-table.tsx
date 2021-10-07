import React from 'react';
import { IStory } from '../../types';
import './style.scss';

export default function GameResultsTable({ story } : { story: IStory }): JSX.Element {
  return (
    <tr>
      <td>{story.name}</td>
      <td>{story.description}</td>
      <td>{story.isCompleted ? 'Completed' : 'Not Completed'}</td>
      <td>{story.estimation}</td>
    </tr>
  );
}
