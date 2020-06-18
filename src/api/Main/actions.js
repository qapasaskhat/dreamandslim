import axios from "axios";

export const FETCH_BEGIN = 'FETCH_BEGIN';
export const FETCH_SUCCESS = 'FETCH_SUCCESS';
export const FETCH_ERROR = 'FETCH_ERROR';

export const fethBegin = () =>({
    type: FETCH_BEGIN
})
export const fetchSuccess = (items)=>({
    type: FETCH_SUCCESS,
    payload: {items}
})
export const fetchError = (error)=>({
    type: FETCH_ERROR,
    payload: {error}
})



export function network(){
    return dispatch=>{
        dispatch(fethBegin())
        const request = axios({
            method: 'GET',
            url: 'https://api.covid19api.com/summary',
            headers: []
        })
        return request
        .then(function (response) {
            //console.log(response.data)
            dispatch(fetchSuccess(response.data))
        })
        .catch(function (error) {
            dispatch(fetchError(error))
            console.log(error);
        })
    }
}

