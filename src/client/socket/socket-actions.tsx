import {
  SetGame,
  setInitialStore,
  StartExclude,
  UpdateMembers,
  UpdateSettings,
  UpdateChatMessages,
  UpdateUser,
  AddUserImage,
} from '../store/actions';
import { store } from '../store/store';
import {
  IExclude, ISettings, IUserInfo, IChatMessage, IGame, IStory, IUserImage,
} from '../types/store-types';

export function onSocketUpdateMembers(members: IUserInfo[]): void {
  store.dispatch(UpdateMembers(members));
}

export function onSocketExcluding(excluding: IExclude): void {
  store.dispatch(StartExclude(excluding));
}

export function onSocketExcludeEnd(message: string): void {

}

export function onSocketExcluded(excluding: IExclude): void {
  store.dispatch(StartExclude(excluding));
}

export function onSocketUpdateExcluding(excluding: IExclude): void {
  store.dispatch(StartExclude(excluding));
}

export function onSocketGameEnd(): void {
  store.dispatch(setInitialStore());
}

export function onSocketSetGameActive(isActive: boolean): void {
  const { game } = store.getState();
  store.dispatch(SetGame({ ...game, isActive }));
}

export function onSocketSetSettings(settings: ISettings): void {
  store.dispatch(UpdateSettings(settings));
}

export function onSocketUpdateChatMessages(message: IChatMessage): void {
  store.dispatch(UpdateChatMessages(message));
}
export function onSocketRefreshGame(game: IGame, user: IUserInfo): void {
  store.dispatch(UpdateUser(user));
  store.dispatch(SetGame(game));
}

export function onSocketCancelGame(): void {
  store.dispatch(setInitialStore());
}

export function onSocketClose(): void {
  sessionStorage.clear();
  store.dispatch(setInitialStore());
}

export function onSocketStartRound(isRoundActive: boolean): void {
  const { game, user } = store.getState();
  store.dispatch(SetGame({ ...game, isRoundActive }));
  store.dispatch(UpdateUser({ ...user, choose: undefined }));
}

export function onSocketStopRound(isRoundActive: boolean): void {
  const { game } = store.getState();
  store.dispatch(SetGame({ ...game, isRoundActive }));
}

export function onSocketAddStory(story: IStory): void {
  const { game } = store.getState();
  store.dispatch(UpdateSettings({ ...game.settings, stories: [...game.settings.stories, { ...story }] }));
}

export function onSocketUpdateStories(stories: IStory[]): void {
  const { game } = store.getState();
  store.dispatch(UpdateSettings({ ...game.settings, stories: [...stories] }));
}

export function onSocketFinishGame(result: IStory[] | string | number): void {
  let { game } = store.getState();
  if (Array.isArray(result) && result.length) {
    store.dispatch(UpdateSettings({ ...game.settings, stories: [...result] }));
  } else {
    store.dispatch(UpdateSettings({ ...game.settings, gameResult: result }));
  }
  ({ game } = store.getState());
  store.dispatch(SetGame({ ...game, isCompleted: true }));
}

export function onSocketUserImage(image: IUserImage): void {
  const { usersImages } = store.getState();
  if (usersImages.find((ent) => ent.id === image.id)) return;
  store.dispatch(AddUserImage(image.id, image.image));
}

export function onSocketaskAboutImages(ids: string[]): void {
  const { usersImages, socket } = store.getState();
  const difference = ids.filter((id) => !usersImages.find((ent) => ent.id === id));
  socket?.sendImagesRequest(difference);
}

export function onSocketChatHistory(messages: IChatMessage[]): void {
  if (!messages) return;
  messages.forEach((message) => {
    store.dispatch(UpdateChatMessages(message));
  });
}
