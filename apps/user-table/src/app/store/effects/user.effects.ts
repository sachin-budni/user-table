import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { UserService } from './../../service/user.service';

import { of } from 'rxjs';
import { 
    AddUserAction,
    AddUserFailureAction,
    AddUserSuccessAction,
    ADD_USER,
    DeleteUserAction,
    DeleteUserFailureAction,
    DeleteUserSuccessAction,
    DELETE_USER,
    LoadUserAction,
    LoadUserFailureAction,
    LoadUserSuccessAction,
    LOAD_USER,
    UpdateUserAction,
    UpdateUserSuccessAction,
    UPDATE_USER
} from '../actions/user.actions';

@Injectable()
export class UserEffects {

  @Effect() 
  loadShopping$ = this.actions$
    .pipe(
      ofType<LoadUserAction>(LOAD_USER),
      mergeMap(
        () => this.userService.users
          .pipe(
            map(data => {
              return new LoadUserSuccessAction(data)
            }),
            catchError(error => of(new LoadUserFailureAction(error)))
          )
      ),
  );

  @Effect() addTrello$ = this.actions$
    .pipe(
      ofType<AddUserAction>(ADD_USER),
      mergeMap(
        (data) => {
          return this.userService.addUser(data.payload)
          .pipe(
            map(() => new AddUserSuccessAction(data.payload)),
            catchError(error => of(new AddUserFailureAction(error)))
          )}
      )
  )

  @Effect() updateTrello$ = this.actions$
    .pipe(
      ofType<UpdateUserAction>(UPDATE_USER),
      mergeMap((data) => {
        debugger;
          return this.userService.updateUser(data.payload)
          .pipe(
            map(() => new UpdateUserSuccessAction(data.payload)),
            catchError(error => of(new UpdateUserSuccessAction(error)))
          )}
      )
  )
  @Effect() deleteTrello$ = this.actions$
    .pipe(
      ofType<DeleteUserAction>(DELETE_USER),
      mergeMap(
        (data) => {
          return this.userService.deleteUser(data.id)
          .pipe(
            map(() => new DeleteUserSuccessAction(data.id)),
            catchError(error => of(new DeleteUserFailureAction(error)))
          )}
      )
    )
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }
}