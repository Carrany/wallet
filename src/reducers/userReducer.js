import { LOGIN_USER, REGISTER_USER } from '../actions/types';

const initialState = {

    user: {},
    userDetails: {}
}

export default function (state = initialState, action) {

    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }
        case REGISTER_USER:
            return{
                ...state,
                userDetails: action.payload
            }

        default:
            break;
    }

}