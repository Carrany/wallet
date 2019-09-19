import { FETCH_TRANSACTION, NEW_TRANSACTION } from './types';

export const createTransaction = transaction => dispatch => {
    fetch('http://localhost:4000/transactions', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(transaction)

    })
        .then(response => response.json())
        .then(transaction => dispatch({

            type: NEW_TRANSACTION,
            payload: transaction

        }));
};

export const fetchTransactions = () => dispatch => {

    fetch('http://localhost:4000/transactions')
        .then(response => response.json())
        .then(transactions => dispatch({

            type: FETCH_TRANSACTION,
            payload: transactions

        }))

}

