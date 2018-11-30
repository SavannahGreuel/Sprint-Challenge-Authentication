import React, { Component } from 'react';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import axios from 'axios';
import './App.css';


const url = process.env.REACT_APP_API_URL

function logout() {
  localStorage.removeItem('secret_token');
 
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      jokes: []
    }
  }

  authenticate =() => {
    const token = localStorage.getItem ('secret_token');
    const options = {
      headers: {
        authorization: token,
      }
    }
    if (token) {
      axios.get(`${url}/api/jokes`, options )
      .then((res) => {
        if (res.status === 200 && res.data) {
          this.setState ({
            loggedIn: true,
            jokes: res.data
          })
        } else {
          throw new Error()
        }
      })
      .catch((err) => {
        this.props.history.push('/signin');
      })
    } else {
      this.props.history.push('/signin');
    }
  } 

  componentDidMount() {
    this.authenticate();
  } 

  componentDidUpdate(prevProps) {
    const { pathname } = this.props.location;
    if(pathname ==='/' && pathname !==prevProps.location.pathname) {
      this.authenticate();
    }
    
  }

  render() {
    return (
      <div className="App">
      <nav>
        <NavLink className ='links' to='/'>Home</NavLink>
        <NavLink className='links' to='/signup'>Sign Up</NavLink>
        <NavLink className='links' to='/signin'>Sign In</NavLink>
        <NavLink className='links' to='/signin' onClick={logout}>Log Out</NavLink>
      </nav>
      <section>
        <Switch>
          <Route path='/signup' component={Register}/>
          <Route path='/signin' component={Login} />
          <Route path = '/' render={() => {
              return (
                <React.Fragment>
                <h2>jokes</h2>
                  <ul>
                    {this.state.jokes.map(joke => <li key={joke.id}>
                    {joke.setup}
                    {joke.punchline}
                    </li>)}
                  </ul>
                  
                </React.Fragment>
              );
            }} />
        </Switch>
      </section>
       
      </div>
    );
  }
}

export default withRouter(App);
