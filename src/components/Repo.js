import React from 'react';

//uses JS regex to build format precisely, could use more internal Date functions as well
//small inline function to open github URL in a new tab, stateless functional component so inline functions for lean code

const Repo = (props) =>  {
 return(
   <div className="result-container">
     <span className="repo-item repo-name"> {props.name} </span>
     <span className="repo-item created-date"> {`${props.date.getMonth()+1}/${props.date.getDate()}/${props.date.getFullYear()}`} </span>
     <span className="repo-item link-arrow" onClick={ (e) => (window.open(props.url, '_blank')) }></span>
   </div>
 );
};

export default Repo;
