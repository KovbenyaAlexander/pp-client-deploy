import { Socket } from 'socket.io-client/build/socket';

export interface IUserInfo {
  name: string;
  userID: string;
  lastName?: string;
  jobPosition?: string;
  photoUser?: string;
  role?: string;
  choose?: number | string;
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
  stories: Array<IStory>;
  gameResult?: IStory[] | number | string;
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
  isRoundActive: boolean;
  members: IUserInfo[];
  excluding: IExclude;
  settings: ISettings;
  isCompleted: boolean;
}

export interface IUserImage {
  id: string,
  image: string;
}

export interface IStore {
  user: IUserInfo;
  game: IGame;
  socket?: ISocketApi;
  chat: {
    messages: Array<IChatMessage>
  };
  loading: boolean;
  usersImages: IUserImage[];
}

export interface ISocketApi {
  socket: Socket;
  setListeners: () => void;
  initExclude: (e: IExclude | undefined, d: boolean) => void;
  confirmExclude: (a: boolean) => void;
  close: () => void;
  setCard: (n: number | string) => void;
  sendMessage: (message: string, authorMessage: string)=>void;
  startRound: () => void;
  stopRound: () => void;
  addStory: (s: IStory) => void;
  setStory: (s: string) => void;
  finishStory: (r: number | string) => void;
  finishGame: (r: IStory[] | number | string) => void;
  sendImagesRequest: (s: string[]) => void;
}

export interface IChatMessage {
  message: string,
  userId: string,
  messageId: string,
  authorMessage: string
  isServiceMessage: boolean
}
