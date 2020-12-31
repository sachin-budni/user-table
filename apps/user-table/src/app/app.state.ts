import { UserState } from './store/reducers/user.reducer';

export interface AppState {
    readonly user: UserState;
}