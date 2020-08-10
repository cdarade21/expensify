import React from 'react'
import ReactDOM from 'react-dom'

const Info = (props) => (
    <div>
        My name is {props.name} {props.surname}
    </div>
);

const AdminInfo1 = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.toShow && <p>Last name is {props.surname}</p>}
            <WrappedComponent {...props}/>
        </div>  
    )
}

const AdminInfo = AdminInfo1(Info)

ReactDOM.render(<AdminInfo surname="Darade" toShow={true} name="Chaitanya"/>, document.getElementById('app'))