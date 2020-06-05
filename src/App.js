import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import ErrorBoundry from './ErrorBoundry'
import './App.css';




class App extends Component {
    constructor()  {
    	super()
    	this.state =  {
          robot: [],
          searchfield: ''
    	}
    }
    
    componentDidMount() {
    	fetch('https://jsonplaceholder.typicode.com/users')
    	   .then(response=> response.json())
    	   .then(users => this.setState({ robot:users }));
    	   
    }


    onSearchChange = (event) => {
    	this.setState({ searchfield: event.target.value })
    	
		
	}
      

	render() {
		const { robot , searchfield } = this.state;
		const filteredRobot = robot.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		})

		if (robot.length === 0){
			return <h1> LOADING..</h1>
		} else{
            return(
		        <div className='tc'>
		          <h1>ROBOFRIENDS</h1>
		          <SearchBox searchChange={this.onSearchChange}/>
		          <Scroll>
		            <ErrorBoundry>
		               <CardList robot={filteredRobot}/>
		            </ErrorBoundry>
		          </Scroll>

		        </div>
	        );
        }
	}
	
}

export default App;