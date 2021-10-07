import {
  ISocketApi, IUserInfo, IGame, IExclude, IChatMessage,
} from './store-types';

export enum Actions {
  UPDATE_USERINFO = 'UPDATE_USERINFO',
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  SET_GAME = 'SET_GAME',
  START_EXCLUDE = 'START_EXCLUDE',
  STOP_EXCLUDE = 'STOP_EXCLUDE',
  SET_DEFAULT_SETTINGS = 'SET_DEFAULT_SETTINGS',
  UPDATE_MEMBERS = 'UPDATE_MEMBERS',
  SET_SOCKETAPI = 'SET_SOCKETAPI',
  UPDATE_CHAT_MESSAGES = 'UPDATE_CHAT_MESSAGES',
  SET_IS_LOADING = 'SET_IS_LOADING',
}

// Game Actions
export interface SetGameAction {
  type: Actions.SET_GAME;
  payload: IGame;
}

export interface StartExcludeAction {
  type: Actions.START_EXCLUDE;
  payload: IExclude;
}

export interface StopExcludeAction {
  type: Actions.STOP_EXCLUDE;
}

export interface UpdateMembersAction {
  type: Actions.UPDATE_MEMBERS;
  payload: IUserInfo[];
}

export interface SetSocketAction {
  type: Actions.SET_SOCKETAPI;
  payload: ISocketApi;
}

// Chat Actions
export interface UpdateChatMessagesAction {
  type: Actions.UPDATE_CHAT_MESSAGES;
  payload: IChatMessage;
}
export interface SetIsLoadingAction {
  type: Actions.SET_IS_LOADING;
  payload: boolean;
}

export type GameActions = SetGameAction | StartExcludeAction | StopExcludeAction;
