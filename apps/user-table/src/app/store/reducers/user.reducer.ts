import { User } from "../models/user.model";
import * as UserActions from './../actions/user.actions';


// const initialState: User[] = [
//     {
//         id: 1,
//         name: 'Sylvester Gislason',
//         emailId: 'echalprosacco@yahoo.com',
//         username: 'andrew88',
//         organization: 'Customer',
//         access: 'Administrator',
//         dateAdded: Date.UTC(1996, 8, 12),
//         customMap: true,
//         eiAnalysis: false,
//         foreCasting: false,
//         noAccess: false
//     },
//     {
//         id: 2,
//         name: 'Sophle Mraz',
//         emailId: 'luthe@gmail.com',
//         username: 'darrin.homenick4755',
//         organization: 'Customer',
//         access: 'Basic',
//         dateAdded: Date.UTC(1996, 9, 2),
//         customMap: false,
//         eiAnalysis: false,
//         foreCasting: false,
//         noAccess: false
//     },
//     {
//         id: 3,
//         name: 'Eileen Beler',
//         emailId: 'david88@gmail.com',
//         username: 'marilyn.crona',
//         organization: 'Dealer',
//         access: 'Basic',
//         dateAdded: Date.UTC(2021, 8, 22, 21, 21, 43),
//         customMap: false,
//         eiAnalysis: false,
//         foreCasting: false,
//         noAccess: false
//     },
//     {
//         id: 4,
//         name: 'Minnie Rogahn',
//         emailId: 'jacqueline@gmail.com',
//         username: 'micheal_parker20',
//         organization: 'Dealer',
//         access: 'Administrator',
//         dateAdded: Date.UTC(2012, 6, 24, 21, 21, 43),
//         customMap: false,
//         eiAnalysis: false,
//         foreCasting: false,
//         noAccess: false
//     },
//     {
//         id: 5,
//         name: 'Lucia Wilderman',
//         emailId: 'givendoly.wish@yahoo.com',
//         username: 'judith_parker20',
//         organization: 'Customer',
//         access: 'Administrator',
//         dateAdded: Date.UTC(2015, 9, 23, 21, 21, 43),
//         customMap: false,
//         eiAnalysis: false,
//         foreCasting: false,
//         noAccess: true
//     },
//     {
//         id: 6,
//         name: 'Minnie Rogahn',
//         emailId: 'david88@gmail.com',
//         username: 'micheal_parker20',
//         organization: 'Dealer',
//         access: 'Administrator',
//         dateAdded: Date.UTC(2000, 6, 12, 21, 21, 43),
//         customMap: false,
//         eiAnalysis: false,
//         foreCasting: false,
//         noAccess: false
//     }
// ]

export interface UserState {
    list: User[],
    loading: boolean,
    error: Error
  }
  
  const initialState: UserState = {
    list: [],
    loading: false,
    error: undefined
  };


export function UserReducer(state: UserState = initialState, action: UserActions.Actions) {

    switch(action.type) {
        case UserActions.LOAD_USER :
            return {
                ...state,
                loading: true
            }
        case UserActions.LOAD_USER_SUCCESS:
            return {
                ...state,
                list: action.payload,
                loading: false
            }
            
        case UserActions.LOAD_USER_FAILURE: 
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case UserActions.ADD_USER :
            return {
                ...state,
                loading: true
            }
        case UserActions.ADD_USER_SUCCESS:
            return {
                ...state,
                list: [action.payload , ...state.list],
                loading: false
            }
            
        case UserActions.ADD_USER_FAILURE: 
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        // case UserActions.ADD_USER :
        //     return [action.payload , ...state.list];
        case UserActions.UPDATE_USER :
            return {
                ...state,
                loading: true
            }
        case UserActions.UPDATE_USER_SUCCESS :

            return {
                ...state,
                list: state.list.map((m: User)=> {
                    if(m.id === action.payload.id) {
                        return action.payload;
                    }
                    return m;
                }),
                loading: false
            }
        case UserActions.UPDATE_USER_FAILURE :
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default: 
            return state;
    }
}