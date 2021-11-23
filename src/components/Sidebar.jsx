import React from "react";



const Sidebar = ({lists, ...props}) => {

    const changeActive = (lisId) => {
        props.onClick(lisId);
    }  
    return (
      <div className="sidebar">
          <div>
            <ul>
                {lists.map(l => 
                  <li key={l.listId}>
                    <a onClick={() => changeActive(l.listId)}><span>({l.count})</span> {l.title}</a>
                  </li> 
                )}
            </ul>
          </div>
      </div>  
    )
}

export default Sidebar;