import { BORROW, FETCH_REQUESTS, DELETE_REQUEST } from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export default function (state = initialState, action) {

    switch (action.type) {
        case BORROW:
            return {
                ...state,
                item: action.payload
            }
        case FETCH_REQUESTS:
            return {
                ...state,
                items: action.payload
            }
            case DELETE_REQUEST:
                console.log(action.payload)
                return{
                 ...state,
                 items: state.items.filter((data ) => data.id !== action.payload)
                }

        default:
            return state;
           
    }


}