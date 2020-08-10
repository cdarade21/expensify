import {createStore} from 'redux'
import { StrictMode } from 'react'

const countReducer = ((state={count:110}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1
            return {
                count : state.count + incrementBy
            }
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : -1
            return {
                count : state.count - decrementBy
            }  
        case 'RESET':
            return {count : 0}
        case 'SET':
            return {count: action.count}
        default:
            return state     
    }
})

const store = createStore(countReducer)

const incrementCount = ({incrementBy = 1}={}) => ({
    type: 'INCREMENT',
    incrementBy
})

const decrementCount = ({decrementBy = 1}={}) => ({
    type: 'DECREMENT',
    decrementBy
})

const setCount = ({count = 1} = {}) => ({
    type: 'SET',
    count
})

const resetCount = ({}={}) => ({
    type: 'RESET'
})

store.subscribe(()=>{
    console.log(store.getState())
})

// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// })

store.dispatch(incrementCount())

store.dispatch(incrementCount({incrementBy:10}))

// store.dispatch({
//     type: 'RESET'
// })

store.dispatch(setCount({count:20}))

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 5
// })

store.dispatch(resetCount())

store.dispatch(decrementCount())

store.dispatch(decrementCount({decrementBy:10}))

// /console.log(store.getState())