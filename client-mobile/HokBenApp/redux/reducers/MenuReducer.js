import { MENU_FETCH_FAILURE, MENU_FETCH_PENDING, MENU_FETCH_SUCCESS } from "../actions/actionType";

const initState = {
    isLoading: true,
    data: [],
    errorMsg: ''
}

export default function MenuReducer(state = initState, action){
    switch (action.type) {
        case MENU_FETCH_PENDING:
            return {
                ...initState
            }
        case MENU_FETCH_SUCCESS: 
            return {
                ...state,
                data: action.payload,
                isLoading: false
            }
        case MENU_FETCH_FAILURE:
            return {
                ...state,
                errorMsg: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}