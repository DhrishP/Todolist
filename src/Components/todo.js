import React, { useEffect, useState } from 'react'
import './style.css';
import Img from '../assets/todoo.png'

const getdata = () =>{
      const lists = localStorage.getItem('todolist')
      if(lists){
        return JSON.parse(lists);
      }else{
        return []
      }
}


function Todo() {
   const [item,additem] = useState(getdata())
   const[text,settext] = useState("")
   const [edittem , setedititem] = useState()
   const [toggle,settoggle] = useState(false)

   useEffect(()=>{
      localStorage.setItem('todolist',JSON.stringify(item))
},[item])

   const deletefunc = (index) => {
    const updatedItem = item.filter((curElem) => {
      return curElem.id !== index;
    });
    additem(updatedItem);
  };

  const editfunc = (index) =>{
        const find = item.find((currentelem)=>{
            return currentelem.id === index
        })
        setedititem(index)
        settoggle(true);
        settext(find.name)
    }

  const addfunc = () =>{
            if (!text) {
                alert("please enter something")
            }
            else if (toggle && text) {
                additem(item.map((e)=>{
                        if (e.id === edittem) {
                            return {...e,name:text};
                        }
                        return e
                })
                );
           
                setedititem(null)
                settoggle(false);
                settext("")

            }
            else{
               const updateitem={
                id: new Date().getTime().toString(),
                name: text,
                }
                additem([...item,updateitem]);settext("")}
        }



  return (
    <>
    <div className="main-div">
        <div className="child-div">
            <figure>
                <img src={Img} alt="TODOlogo" />
                <figcaption>Add your list here</figcaption>
            </figure>
            <div className="addItems">
                <input type="text" placeholder='Add items' className='form-control' value={text} onChange={(e)=>{settext(e.target.value)}}
                />
              {toggle ? <i className="far fa-edit add-btn" onClick={addfunc}></i> : <i className="fa fa-plus add-btn" onClick={addfunc}></i>}  
            </div>
            <div className="showItems">
                 {item.map((Currentelem)=>{
                    return(
                      <div className="eachItem" key={Currentelem.id}>
                     <h3>{Currentelem.name}</h3>
                     <div className="todo-btn">
                     <i className="far fa-edit add-btn"  onClick={()=>{editfunc(Currentelem.id)}} />
                     <i className="far fa-trash-alt add-btn" onClick={()=>{deletefunc(Currentelem.id)}}/>
                     </div>
                     </div>
                     );
                   })}  
              
            </div>

            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={()=>{additem([])}}> <span>CHECK LIST</span>  </button>
            </div>
        </div>
    </div>
    
    </>
  )
}

export default Todo