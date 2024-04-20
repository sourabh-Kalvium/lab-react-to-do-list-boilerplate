import React, { Component } from 'react'
import Todolist from './components/Todolist';

export default class App extends Component {

   constructor(props){
      super(props);
      
      this.state={
        todolist:[],
        item:{
          key:"",
          details:""
        },
        update:false

      }
   }

   handleValue=(e)=>{
    if(!this.state.update){
       this.setState(
         {
           item:{
             key:Date.now(),
             details:e.target.value
           }
         }
       )
    }
    else{
      this.setState(
        {
          item:{
            key:this.state.item.key,
            details:e.target.value
          }
        }
      )
    }
   };

   handleSubmit=(e)=>{
      e.preventDefault()
      if(this.state.item.details && !this.state.update){
        this.setState({
          item:{
            key:"",
            details:""
          },
          todolist:[...this.state.todolist,this.state.item]
        })
       }
       else if(this.state.update){
         
        let updated=this.state.todolist.map(ele=>{
        
          if(ele.key==this.state.item.key){
           return ele={key:this.state.item.key,details:this.state.item.details}
          }
          else{
            return ele
          }
    
        })
        
    
        this.setState({
          todolist:updated,
          update:false,
          item:{
            key:"",
            details:""
          }
        })
        
       }
   }

   handleDelete=(key)=>{
       
         let filtered = this.state.todolist.filter(ele=>ele.key !==key)
       this.setState({
          todolist: filtered
       })
   }

   handleUpdate = async (key) => {
    await new Promise(resolve => {
      this.state.todolist.forEach(ele => {
        if (ele.key === key) {
          this.setState({
            item: {
              key: key,
              details: ele.details
            },
            update:true
          }, resolve); 
        }
      });
    });
  

  }
  



  

  render() {
  
    return (
      <div className='todo-main'> 
           <div>
               <form onSubmit={this.handleSubmit} >
                   <label htmlFor="todo-input">add todo</label>

                   <input id='todo-input' type="text" placeholder='add todo' onChange={this.handleValue} value={this.state.item.details}/>

                   <input type="submit" value={this.state.update?"update":"submit"}/>
               </form>

           </div>

           <div className='todo-list'>
                <Todolist 
                todolist={this.state.todolist} deleteFunction={this.handleDelete}
                updateFunction ={this.handleUpdate}
                />
           </div>
      </div>
      
    )
  }
}

