import { FETCH_REQUESTS, BORROW, DELETE_REQUEST } from './types';


export const fetchRequests = () => dispatch => {

    fetch('http://localhost:4000/requests?_sort=id&_order=desc')
    .then(response => response.json())
    .then(requests => dispatch({
        
        type: FETCH_REQUESTS,
        payload: requests

    }))

}


export const requestLoan = borrowData => dispatch => {

    fetch('http://localhost:4000/requests', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(borrowData)


    })
    .then(response => response.json())
    .then(request => dispatch({

        type: BORROW,
        payload: request
    }) )
}

export const deleteRequest = id => dispatch => {

    fetch('http://localhost:4000/requests/'+id,{

    method: 'DELETE'
    })
    .then(response  => response.json())
    .then(response => dispatch({
            type: DELETE_REQUEST,
            payload: id


    }))
}