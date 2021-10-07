import { IGame, IUserInfo } from './types/store-types';

export function isDealer(store: IGame, id: string): boolean {
  if (!store || !id) return false;
  const dealer = store.members.filter((member) => member.role === 'dealer')[0];
  if (!dealer) return false;
  return dealer.userID === id;
}

export function isCurrentUser(user: IUserInfo, id: string): boolean {
  return user.userID === id;
}
