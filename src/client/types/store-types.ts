import { Socket } from 'socket.io-client/build/socket';

export interface IUserInfo {
  name: string;
  userID: string;
  lastName?: string
  jobPosition?: string
  photoUser?: string
  role?: string
}

export interface IStory{
  name: string,
  description: string,
  id: string,
  estimation: number | null,
  isCompleted: boolean,
  isActive: boolean,
}
export interface ISettings {
  gameName: string;
  isDealerInGame: boolean;
  isAutoEntry: boolean;
  isAutoFinish: boolean;
  isVoteMutable: boolean;
  estimationType: string;
  isTimerRequired: boolean;
  timerValue: string;
  stories: Array<IStory>
}

export interface IExclude {
  user?: IUserInfo;
  reason?: string;
  isActive: boolean;
  message?: string;
  IsYouExcluded?: boolean;
}

export interface IGame {
  id?: string | null;
  isActive: boolean;
  members: IUserInfo[];
  excluding: IExclude;
  settings: ISettings;
}
export interface IStore {
  user: IUserInfo;
  game: IGame;
  socket?: ISocketApi;
  chat: {
    messages: Array<IChatMessage>
  };
  loading: boolean;
}

export interface ISocketApi {
  socket: Socket;
  setListeners: () => void;
  initExclude: (e: IExclude | undefined, d: boolean) => void;
  confirmExclude: (a: boolean) => void;
  close: () => void;
  sendMessage: (message: string, authorMessage: string)=>void
}

export interface IChatMessage {
  message: string,
  userId: string,
  messageId: string,
  authorMessage: string
  isServiceMessage: boolean
}
