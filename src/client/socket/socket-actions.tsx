import {
  SetGame,
  setInitialStore,
  StartExclude,
  UpdateMembers,
  UpdateSettings,
  UpdateChatMessages,
  UpdateUser,
} from '../store/actions';
import { store } from '../store/store';
import {
  IExclude, ISettings, IUserInfo, IChatMessage, IGame,
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
