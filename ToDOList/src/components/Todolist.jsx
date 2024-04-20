import React, { Component } from 'react'

export default class Todolist extends Component {
   
    constructor(props){
        super(props);
       
    }

    handleUpdateAsync = async (key) => {
        try {
            await this.props.updateFunction(key);
        } catch (error) {
            console.error("Error occurred during handleUpdate:", error);
        }
    }

    render() {
      return (
         <React.Fragment>
            {this.props.todolist.map(ele=>(
             <div key={ele.key} > 
                <h4>{ele.details}</h4>

                <button onClick={()=>this.props.deleteFunction(ele.key)} >
                DELETE
                </button>

                <button 
                onClick={()=>this.handleUpdateAsync(ele.key)}>
                 UPDATE
                </button>

             </div>   
            ))}
        </React.Fragment>
       )
    }
}
