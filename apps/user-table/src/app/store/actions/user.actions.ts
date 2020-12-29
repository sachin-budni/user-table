import { Action } from '@ngrx/store';
import { User } from './../models/user.model';

export const ADD_USER = '[USER] Add User';
export const UPDATE_USER = '[USER] Update User';
export const REMOVE_USER = '[USER] Remove User';


export class AddUser implements Action {
    readonly type = ADD_USER;

    constructor(public playoad: User){ }
}
export class UpdateUser implements Action {
    readonly type = UPDATE_USER;

    constructor(public playoad: User){ }
}
export class RemoveUser implements Action {
    readonly type = REMOVE_USER;

    constructor(public id: number){ }
}


export type Actions = AddUser | UpdateUser | RemoveUser;