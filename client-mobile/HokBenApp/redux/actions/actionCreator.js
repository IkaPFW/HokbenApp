import { MENU_FETCH_FAILURE, MENU_FETCH_PENDING, MENU_FETCH_SUCCESS } from "./actionType";

function dispatchMenuPending(){
    return {
        type: MENU_FETCH_PENDING
    }
}

function dispatchMenuSuccess(data){
    return {
        type: MENU_FETCH_SUCCESS,
        payload: data
    }
}

function dispatchMenuFailure(error){
    return {
        type: MENU_FETCH_FAILURE,
        payload: error
    }
}

function getMenu(){
    return (dispatch, getState) => {
        dispatch(dispatchMenuPending)

        fetch('http://localhost:3000/menu').then((data) => {
            return data.json()
        }).then((res) => {
            dispatch(dispatchMenuSuccess(res))
        }).catch((err) => {
            dispatch(dispatchMenuFailure(err))
        })
    }
}