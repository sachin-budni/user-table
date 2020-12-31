import { Action } from '@ngrx/store';
import { User } from './../models/user.model';


export const LOAD_USER = '[USER] Load trello';
export const LOAD_USER_SUCCESS = '[USER] Load trello Success';
export const LOAD_USER_FAILURE = '[USER] Load trello Failure';

export const ADD_USER = '[USER] Add trello';
export const ADD_USER_SUCCESS = '[USER] Add trello Success';
export const ADD_USER_FAILURE = '[USER] Add trello Failure';

export const UPDATE_USER = '[USER] Update trello';
export const UPDATE_USER_SUCCESS = '[USER] Update trello Success';
export const UPDATE_USER_FAILURE = '[USER] Update trello Failure';

export const DELETE_USER = '[USER] Delete trello';
export const DELETE_USER_SUCCESS = '[USER] Delete trello Success';
export const DELETE_USER_FAILURE = '[USER] Delete trello Failure';

// export const DELETE_USEROfLIST = '[USER] Delete list of list';
// export const DELETE_USEROfLIST_SUCCESS = '[USER] Delete list of list Success';
// export const DELETE_USEROfLIST_FAILURE = '[USER] Delete list of list Failure';

// export const ADD_USERLISTOFLIST = '[USER] Add list of list';
// export const ADD_USERLISTOFLIST_SUCCESS = '[USER] add list of list success';
// export const ADD_USERLISTOFLIST_FAILURE = '[USER] Add list of list failure';

// export const UPDATE_USERLISTOFLIST = '[USER] Update list of list';
// export const UPDATE_USERLISTOFLIST_SUCCESS = '[USER] Update list of list success';
// export const UPDATE_USERLISTOFLIST_FAILURE = '[USER] Update list of list failure';

// export const ADD_USER = '[USER] Add User';
// export const UPDATE_USER = '[USER] Update User';
// export const REMOVE_USER = '[USER] Remove User';


export class LoadUserAction implements Action {
    readonly type = LOAD_USER;
}
export class LoadUserSuccessAction implements Action {
    readonly type = LOAD_USER_SUCCESS
    constructor(public payload: Array<User>) {} 
}
export class LoadUserFailureAction implements Action {
    readonly type = LOAD_USER_FAILURE;
    constructor(public payload: Error) {}
}

export class AddUserAction implements Action {
    readonly type = ADD_USER;

    constructor(public payload: User){ }
}
export class AddUserSuccessAction implements Action {
    readonly type = ADD_USER_SUCCESS;

    constructor(public payload: User){ }
}
export class AddUserFailureAction implements Action {
    readonly type = ADD_USER_FAILURE;

    constructor(public payload: Error){ }
}


export class UpdateUserAction implements Action {
    readonly type = UPDATE_USER;

    constructor(public payload: User){ }
}
export class UpdateUserSuccessAction implements Action {
    readonly type = UPDATE_USER_SUCCESS;

    constructor(public payload: User){ }
}
export class UpdateUserFailureAction implements Action {
    readonly type = UPDATE_USER_FAILURE;

    constructor(public payload: Error){ }
}


export class DeleteUserAction implements Action {
    readonly type = DELETE_USER;

    constructor(public id: number){ }
}
export class DeleteUserSuccessAction implements Action {
    readonly type = DELETE_USER_SUCCESS;

    constructor(public id: number){ }
}
export class DeleteUserFailureAction implements Action {
    readonly type = DELETE_USER_FAILURE;

    constructor(public id: Error){ }
}


export type Actions = AddUserAction | AddUserSuccessAction | AddUserFailureAction |
                        UpdateUserAction | UpdateUserSuccessAction | UpdateUserFailureAction | 
                        LoadUserAction | LoadUserSuccessAction | LoadUserFailureAction |
                        DeleteUserAction | DeleteUserSuccessAction | DeleteUserFailureAction;