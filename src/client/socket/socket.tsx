import io, { Socket } from 'socket.io-client';
import { SetSocketApi } from '../store/actions';
import { store } from '../store/store';
import { IExclude, IGame, IUserInfo } from '../types';
import { ISocketApi } from '../types/store-types';
import {
  onSocketCancelGame,
  onSocketClose,
  onSocketExcluded,
  onSocketExcludeEnd,
  onSocketExcluding,
  onSocketGameEnd,
  onSocketRefreshGame,
  onSocketSetGameActive,
  onSocketSetSettings,
  onSocketUpdateExcluding,
  onSocketUpdateMembers,
  onSocketUpdateChatMessages,
} from './socket-actions';

export class SocketApi implements ISocketApi {
  socket: Socket ;

  constructor(url: string, user: IUserInfo, game: IGame, recconectID?: string | undefined) {
    if (recconectID) {
      this.socket = io(url, { query: { recconectID } });
      store.dispatch(SetSocketApi(this));
    } else {
      this.socket = io(url, {
        query: {
          user: JSON.stringify(user),
          id: game.id || '',
          game: JSON.stringify(game),
        },
      });
    }
    this.setListeners();
  }

  close(): void {
    this.socket.close();
  }

  setListeners(): void {
    this.socket.on('connect', () => {
      sessionStorage.setItem('socketID', this.socket.id);
    });
    this.socket.on('updateMembers', onSocketUpdateMembers);
    this.socket.on('excluding', onSocketExcluding);
    this.socket.on('excludeEnd', onSocketExcludeEnd);
    this.socket.on('excluded', onSocketExcluded);
    this.socket.on('updateGame', onSocketUpdateExcluding);
    this.socket.on('gameEnd', onSocketGameEnd);
    this.socket.on('setGameActive', onSocketSetGameActive);
    this.socket.on('updateSettings', onSocketSetSettings);
    this.socket.on('updateChatMessages', onSocketUpdateChatMessages);
    this.socket.on('refreshGame', onSocketRefreshGame.bind(this));
    this.socket.on('cancelGame', onSocketCancelGame);
    this.socket.on('close', onSocketClose);
  }

  initExclude(excludeObj: IExclude | undefined, isDealer: boolean): void {
    const { game } = store.getState();
    let exclude = excludeObj;
    if (!exclude) {
      exclude = game.excluding;
    }
    this.socket.emit('initExclude', game.id, exclude, isDealer);
  }

  confirmExclude(answer: boolean): void {
    const { game, user } = store.getState();
    this.socket.emit('confirmExclude', game.id, user.userID, answer);
  }

  sendMessage(message: string, authorMessage: string): void {
    const { game, user } = store.getState();
    this.socket.emit('sendMessage', game.id, user.userID, message, authorMessage);
  }
}
