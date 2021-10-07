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

export function calculateResult(people: IUserInfo[]): [{ [key: string]: number | string }, number] {
  const values: { [key: string]: number } = {};
  let allVoted = 0;
  people.forEach((human) => {
    if (human.choose) {
      const { choose } = human;
      if (!values[`${choose}`]) {
        values[`${choose}`] = 0;
      }
      values[`${choose}`] += 1;
      allVoted += 1;
    }
  });
  return [values, allVoted];
}
