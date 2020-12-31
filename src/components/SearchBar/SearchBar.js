import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        term: '',
        location: '',
        sortBy: 'best_match'
      };

      this.handleTermChange = this.handleTermChange.bind(this);
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleSortByChange = this.handleSortByChange.bind(this);

      this.sortByOptions = {
        'Best Match': 'best_match',
        'Highest Rated': 'rating',
        'Most Reviewed': 'review_count'
      };
  }

  getSortByClass(sortByOption) {
    // this is for the Active selected class sortByOption
      if(this.state.sortBy === sortByOption) {
        return 'active';
      } else {
        return '';
      }
  } 

  // changes the alighted/active click sortby option 
  handleSortByChange(sortByOption) {
      this.setState({
        sortBy: sortByOption
      });
  }

  // what ever is inserted into the input box instantly changes the state.term
  handleTermChange(event) {
    // const text = event.target.value;
      this.setState({
        term: event.target.value // text
      });
  }

  // what ever is inserted into the input box instantly changes the state.location
  handleLocationChange(event) {
       // const text = event.target.value;
      this.setState({
        location: event.target.value // text
      });
  }

  // it accept what is typed into the inputs boxes 
  // and fired an event handler on the btn/ link tag
  //  Let's Go event handler
  handleSearch(event) {
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
      event.preventDefault()
      //this is  to prevent the default action of clicking a link 
      //from triggering at the end of the method. 
    }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map(sortByOption => {
      let sortByOptionValue = this.sortByOptions[sortByOption];// this will give us each key's value
      return (
            <li 
              onClick={this.handleSortByChange.bind(this, sortByOptionValue)} 
              className={this.getSortByClass(sortByOptionValue)} 
              key={sortByOptionValue}
            >
              {sortByOption}
            </li>
            );// {sortByOption} will give us each key's(not numerically) position
      // up there since we are passing in an argument to the event 
      // handler/method we must "bind" it with "this" and the This will allow us 
      //to both bind to the current value of this (as we usually do in the constructor()) but also bind the 
      //current sortByOptionValue as the first argument to the method call, 
      //ensuring the method is called with the appropriate value when clicked. 
    });
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange={this.handleTermChange} placeholder="Search Businesses" />
          <input onChange={this.handleLocationChange} placeholder="Where?" />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch}>Let's Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;