import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setInitialStore } from '../../store/actions';
import { IStore } from '../../types';
import './style.scss';

export default function MessageForExcluded(): JSX.Element {
  const exclude = useSelector((state: IStore) => state.game.excluding);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setInitialStore());
      history.push('/');
    }, 10000);
  }, []);
  return (
    <section className="message-excluded">
      <h3 className="message-excluded__reason">
        {` You was excluded, because ${exclude.reason}`}
      </h3>
      <h4 className="message-excluded__next-action">You will be redirected to main page</h4>
    </section>
  );
}
