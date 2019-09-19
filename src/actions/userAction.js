import { LOGIN_USER, REGISTER_USER } from './types';

export const login = () => dispatch => {

    fetch('http://localhost/4000/users')
        .then(response => response.json())
        .then(user => dispatch({

            type: LOGIN_USER,
            payload: user
        }));

}

export const register = newUser => dispatch => {
    console.log(newUser);

    fetch('http://localhost:4000/users', {

        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
        .then(response => response.json())
        .then(userDetails => dispatch({
            type: REGISTER_USER,
            payload: userDetails

        }))


}