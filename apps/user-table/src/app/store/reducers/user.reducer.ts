import { User } from "../models/user.model";
import * as UserActions from './../actions/user.actions';


const initialState: User[] = [
    {
        id: 1,
        name: 'Sylvester Gislason',
        username: 'andrew88',
        organization: 'Customer',
        access: 'Administrator',
        dateAdded: new Date('08/22/1996'),
        customMap: true,
        eiAnalysis: false,
        foreCasting: false,
        noAccess: false
    },
    {
        id: 2,
        name: 'Sophle Mraz',
        username: 'darrin.homenick4755',
        organization: 'Customer',
        access: 'Basic',
        dateAdded: new Date('09/02/1996'),
        customMap: false,
        eiAnalysis: false,
        foreCasting: false,
        noAccess: false
    },
    {
        id: 3,
        name: 'Eileen Beler',
        username: 'marilyn.crona',
        organization: 'Dealer',
        access: 'Basic',
        dateAdded: new Date('08/22/2020'),
        customMap: false,
        eiAnalysis: false,
        foreCasting: false,
        noAccess: false
    },
    {
        id: 4,
        name: 'Minnie Rogahn',
        username: 'micheal_parker20',
        organization: 'Dealer',
        access: 'Administrator',
        dateAdded: new Date('06/24/2012'),
        customMap: false,
        eiAnalysis: false,
        foreCasting: false,
        noAccess: false
    },
    {
        id: 5,
        name: 'Lucia Wilderman',
        username: 'judith_parker20',
        organization: 'Customer',
        access: 'Administrator',
        dateAdded: new Date('09/23/2012'),
        customMap: false,
        eiAnalysis: false,
        foreCasting: false,
        noAccess: true
    },
    {
        id: 6,
        name: 'Minnie Rogahn',
        username: 'micheal_parker20',
        organization: 'Dealer',
        access: 'Administrator',
        dateAdded: new Date('06/24/2012'),
        customMap: false,
        eiAnalysis: false,
        foreCasting: false,
        noAccess: false
    }
]


export function UserReducer(state: User[] = initialState, action: UserActions.Actions) {

    switch(action.type) {
        case UserActions.ADD_USER :
            return [...state, action.playoad];
        default: 
            return state;
    }
}