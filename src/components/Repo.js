import React from 'react';

const Repo = (props) =>  {
 return(
   <div className="result-container">
     <span className="repo-name"> {props.name} </span>
     <span className="created-date"> {`${props.date.getMonth()+1}/${props.date.getDate()}/${props.date.getFullYear()}`} </span>
   </div>
 );
};

export default Repo;
