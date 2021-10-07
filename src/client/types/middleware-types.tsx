import { Action, AnyAction, Store } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AllActions } from '../store/reducers';
import { IStore } from './store-types';

export type ThunkActionCustom = ThunkAction<void, IStore, unknown, AllActions>;
export type ThunkDispatchCustom = ThunkDispatch<IStore, unknown, AllActions>;
export type StoreType = Store<IStore, AllActions>;
export type AppThunk<ReturnType = any> = ThunkAction<ReturnType, IStore, unknown, Action<string>>;
export type AppDispatch = ThunkDispatch<IStore, any, AnyAction>;
