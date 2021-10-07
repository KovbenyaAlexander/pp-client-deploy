import { ISettings, IStore, IUserInfo } from '../types/store-types';

export const user:IUserInfo = {
  name: '',
  lastName: '',
  jobPosition: '',
  photoUser: '',
  role: '',
  userID: '',
};

const settings: ISettings = {
  gameName: '',
  isDealerInGame: false,
  isAutoEntry: false,
  isAutoFinish: false,
  isVoteMutable: false,
  estimationType: 'power2',
  isTimerRequired: false,
  timerValue: '01:01',
  stories: [],
};

export const initialStore: IStore = {
  user,
  game: {
    members: [],
    excluding: {
      isActive: false,
    },
    settings,
    isActive: false,
    id: null,
  },
  chat: {
    messages: [],
  },
  loading: false,
};

export const clinetUrl = 'http://localhost:3000';
