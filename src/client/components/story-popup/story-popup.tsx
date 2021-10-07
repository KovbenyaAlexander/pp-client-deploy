import React, { useEffect, useState } from 'react';
import { IStory } from '../../types';

import './style.scss';

type IstoryPopup = {
  setShouldShowPopup: React.Dispatch<React.SetStateAction<any>>;
  storyToEdit?: IStory | null;
  onPopupSubmit: (props: IStory)=>void
};

export default function StoryPopup({ setShouldShowPopup, storyToEdit, onPopupSubmit }: IstoryPopup): JSX.Element {
  const [name, setName] = useState(storyToEdit?.name || '');
  const [description, setDescription] = useState(storyToEdit?.description || '');
  const [errorValidation, setErrorValidation] = useState(false);

  const submitHandler = (e?: React.FormEvent) => {
    e?.preventDefault();

    if (name.trim().length <= 2) {
      setErrorValidation(true);
      return;
    }

    onPopupSubmit({
      name, description, id: storyToEdit?.id || '', estimation: null, isActive: false, isCompleted: false,
    });
  };

  const onEnterPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.shiftKey === false) {
      if (name.trim().length <= 2) {
        setErrorValidation(true);
        return;
      }
      submitHandler();
    }
  };

  useEffect(() => {
    if (name.trim().length > 2 && name.trim().length < 31) {
      setErrorValidation(false);
    }
  }, [name]);

  return (
    <div className="story-popup">
      <form onSubmit={(e) => submitHandler(e)} className="story-popup-wrapper">

        <div className="popup__name">
          <p>Story name:*</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
          />
        </div>

        <div className="popup__description">
          <p>Story description:</p>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => onEnterPress(e)}
            maxLength={100}
          />
        </div>

        {errorValidation && <span className="story-popup__validation-error">name length must be more than 2 characters and less than 30</span>}
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setShouldShowPopup(false)}>Close</button>
      </form>
    </div>

  );
}
