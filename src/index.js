import React, { Component } from 'react';
import { render } from 'react-dom';
import Repo from './components/Repo';
import './styles/main.css';

const github = 'https://api.github.com/search/repositories?q=' ;

export default class RepoSearch extends Component {

  //default language is python, empty search, and empty array for results
  constructor(props){
    super(props);
    this.state = {
      search: '',
      language: 'python',
      results: []
    };
  }

  //takes in the results from the query and creates a stateless functional component for each one, with props mapped from the output
  handleQuery = (results) => {
    let repos = results.items.map(r => (
      <Repo
        key={r.id}
        name={r.name}
        date={new Date(r.created_at)}
        url={r.clone_url}
      />
    ));
    //sets state to re-render the components and gets called below
    this.setState({
      ...this.state,
      results: repos
    });
  };

  //sorts from newest to oldest
  handleDescSort = () => {
    this.setState({
      ...this.state,
      results: this.state.results.sort((a,b) => {
        return(b.props.date - a.props.date)
      })
    });
  };

  //sorts by date starting by oldest to newest
  handleAscSort = () => {
    this.setState({
      ...this.state,
      results: this.state.results.sort((a,b) => {
        return(a.props.date - b.props.date);
      })
    });
  };

  //sorts by name
  handleNameSort = () => {
    this.setState({
      ...this.state,
      results: this.state.results.sort((a,b) => {
        if (a.props.name.toUpperCase() > b.props.name.toUpperCase()){
          return(1);
        } else {
          return(-1);
        }
      })
    });
  };

  //calls Github API, we are only searching using the Rest API so no need for authentication
  handleSubmit = (e) => {
    let query = `${github}${this.state.search}+language:${this.state.language}`;
    fetch(query)
      .then(data => data.json())
      .then(this.handleQuery)
      .catch(err => console.log(err));
    e.preventDefault();
  };

  //adds letters leading up to search - from here we can probably implement a suggestion tool
  handleSearchChange = (e) => {
    this.setState({
      ...this.state,
      search: e.target.value
    })
  };

  //selection for drop down
  handleDropChange = (e) => {
    this.setState({
      ...this.state,
      language: e.target.value
    })
  };

  //calls on the results stored in the state which holds an array of components made from the results of the Github API query
  render(){
    return(
      <div className="search-container">
        <div className="search-components">
        <form className="search-form" onSubmit={this.handleSubmit}>
          <input type="text" name="search" id="search" placeholder="Search..."  onChange={this.handleSearchChange} />
          <button type="submit">Search</button>
          <select className="lang-dropdown" onChange={this.handleDropChange} value={this.state.language}>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">Javascript</option>
            <option value="golang">Golang</option>
          </select>
          </form>
          <button onClick={this.handleNameSort}>Sort By Name</button>
          <button onClick={this.handleAscSort}>Oldest</button>
          <button onClick={this.handleDescSort}>Newest</button>
        </div>
        <div className="results-container">
        {
          this.state.results
        }
        </div>
      </div>
    );
  }

}
