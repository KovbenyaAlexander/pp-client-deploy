import React from 'react';
import { IStory, ISettings } from '../../types';
import './style.scss';

interface IStories {
  stories: Array<IStory>;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>
  setStoryToEdit: React.Dispatch<React.SetStateAction<null | IStory>>
  setShouldShowPopupForAdd: React.Dispatch<React.SetStateAction<boolean>>
}

export const Stories = ({
  stories, setSettings, setStoryToEdit, setShouldShowPopupForAdd,
}: IStories):JSX.Element => {
  const removeStoryHandler = (id: string) => {
    setSettings((prev: ISettings) => ({
      ...prev,
      stories: prev.stories.filter((item: IStory) => !(item.id === id)),
    }));
  };

  const editStoryHandler = (story: IStory) => {
    setStoryToEdit(story);
    setShouldShowPopupForAdd(true);
  };

  return (
    <div>
      <div className="stories-container">
        {stories.map((story: IStory) => (
          <div className="story" key={story.id}>
            <p className="story__name">
              name:
              {story.name}
            </p>
            {story.description && (
              <p className="story__description">
                description:
                {story.description}
              </p>
            )}

            <button type="button" onClick={() => editStoryHandler(story)}>Edit</button>
            <button type="button" onClick={() => removeStoryHandler(story.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};
