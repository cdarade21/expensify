import {createStore, combineReducers} from 'redux';
import {v1 as uuid} from "uuid"; 

//Add Expense
const addExpense =  ({description='',note='', amount=0, createdAt=0}={}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount, 
        createdAt
    }
})

//Remove Expense
const removeExpense = ({id}={}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

// EDIT_EXPENSE
const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
  });

  //SET text

  const setTextFilter = (text='') => ({
      type:'SET_TEXT',
      text
  })

// Sort By Date
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

// Sort By Amount
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

// Set Start Date
const setStartDate = (startDate) => ({
    type:"SET_START_DATE",
    startDate
})

// Set End Date
const setEndDate = (endDate) => ({
    type:"SET_END_DATE",
    endDate
})

// Get Visible Expense

const getVisibleExpenses= (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate
        const endDateMatch =  typeof endDate !== 'number' || expense.createdAt <= endDate
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase())

        return startDateMatch && endDateMatch && textMatch
    }).sort((a,b)=>{
        if(sortBy==='date') {
            return a.createdAt < b.createdAt ? 1 : -1
        }
        else if (sortBy==='amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
}

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({id})=> id !== action.id)
            case 'EDIT_EXPENSE':
                return state.map((expense) => {
                  if (expense.id === action.id) {
                    return {
                      ...expense,
                      ...action.updates
                    };
                  } else {
                    return expense;
                  };
                });
        default:
            return state;
    }
}

const filterReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined
}

const filtersReducer = (state=filterReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_TEXT':
            return {
                ...state,
                text : action.text
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            }
        default:
            return state;
    }
}

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
)

store.subscribe(()=> {
    const state = store.getState()
    const expenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(expenses)
})

const ExpenseOne = store.dispatch(addExpense({description:'Borrow',amount:300, createdAt:125}))
const ExpenseTwo = store.dispatch(addExpense({description:'Borrow',amount:500, createdAt:1000}))

// store.dispatch(removeExpense({id:ExpenseOne.expense.id}))
// store.dispatch(editExpense(ExpenseTwo.expense.id, { amount: 1000 }));

//store.dispatch(setTextFilter('borrow'))
// store.dispatch(setTextFilter())

store.dispatch(sortByDate())
store.dispatch(sortByAmount())

//store.dispatch(setStartDate(125))
//store.dispatch(setEndDate(1200))

const demoState = {
    expenses: [{
        id:'jhbsdf',
        description:'Jan Rent',
        note:"This was the final payment for this address",
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
}