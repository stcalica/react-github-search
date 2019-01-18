import React, { Component } from 'react';
import { render } from 'react-dom';
import './styles/main.css';

const github = 'https://api.github.com/search/repositories?q=' ;


 const Repo = (props) =>  {
  return(
    <div className="result-container">
      <span className="repo-name"> {props.name} </span>
      <span className="created-date"> {`${props.date.getMonth()+1}/${props.date.getDate()}/${props.date.getFullYear()}`} </span>
    </div>
  );
};

export default class RepoSearch extends Component {

  constructor(props){
    super(props);
    this.state = {
      search: '',
      language: 'python',
      results: []
    };
  }

  componentDidMount() { }

  handleQuery = (results) => {
    //create results component and map to each one
    console.log(results);
    let repos = results.items.map(r => (
      <Repo
        key={r.id}
        name={r.name}
        date={new Date(r.created_at)}
      />
    ));
    console.log(repos);
    this.setState({
      ...this.state,
      results: repos
    });
  };

  sortName = (a,b) => {
    if (a.props.name.toUpperCase() > b.props.name.toUpperCase()){
      return(1);
    } else {
      return(-1);
    }
  }

  sortDesc = (a,b) => {
    return(b.props.date - a.props.date);
  };

  sortAsc = (a,b) => {
    return(a.props.date - b.props.date);
  };

  handleSort = (order) => {
    //sort here by order selected from button
    let sorted = this.state.results;
    switch(order){
      case 'name':
        this.setState({
          ...this.state,
          results: this.state.results.sort(this.sortName)
        });
        break;
      case 'oldest':
        this.setState({
          ...this.state,
          results: this.state.results.sort(this.sortAsc)
        });
        break;
      case 'newest':
        this.setState({
          ...this.state,
          results: this.state.results.sort(this.sortDesc)
        });
        break;
      default:
        console.log('not catching');
        break;
    }
    console.log(sorted);

  };

  handleSubmit = (e) => {
    let query = `${github}${this.state.search}+language:${this.state.language}`;
    console.log(query);
    fetch(query)
      .then(data => data.json())
      .then(this.handleQuery)
      .catch(err => console.log(err));
    e.preventDefault();
  };

  handleSeacrhChange = (e) => {
    this.setState({
      ...this.state,
      search: e.target.value
    })
  };

  handleDropChange = (e) => {
    console.log(e.target.value);
    this.setState({
      ...this.state,
      language: e.target.value
    })
  };

  render(){
    return(
      <div className="search-container">
        <div className="search-components">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" id="search" placeholder="Search..."  onChange={this.handleSeacrhChange} />
          <button type="submit">Search</button>
          <select className="lang-dropdown" onChange={this.handleDropChange} value={this.state.language}>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">Javascript</option>
            <option value="golang">Golang</option>
          </select>
          </form>
          <button onClick={() => this.handleSort('name')}>Sort By Name</button>
          <button onClick={() => this.handleSort('oldest')}>Oldest</button>
          <button onClick={() => this.handleSort('newest')}>Newest</button>
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
