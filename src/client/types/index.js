/* @flow */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */

import type { Store as ReduxStore } from 'redux';
import type { Reducers } from '../reducers';

export type Home = {};

type $ExtractFunctionReturn = <V>(v: (...args: any) => V) => V;

export type ReduxState = $ObjMap<Reducers, $ExtractFunctionReturn>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;
export type GetState = () => ReduxState;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
export type Store = ReduxStore<ReduxState, Action>;
