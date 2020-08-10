import React from 'react'
import ExpenseForm from './ExpenseForm'
import {connect} from 'react-redux'
import {addExpense} from './../actions/expenses'

const AddExpensePage = (props) => (
    <div>
        <h3>Add Expense</h3>
        <ExpenseForm 
            onSubmit={(expense)=>{
                console.log(expense)
                props.dispatch(addExpense(expense))
                props.history.push('/')
            }}
        />
    </div>
)

export default connect()(AddExpensePage);

