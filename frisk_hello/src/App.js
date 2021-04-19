import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import React from 'react';
import {useState, useEffect} from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '',  email: '', pin: '', message: ''};
  } 

  formSubmitHandler = (event) => {
    event.preventDefault();
    fetch('http://localhost:3000/submitform', {
      /*headers: {
        'Access-Control-Allow-Origin': '*',
      },*/
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(this.state) }
    ).then(function(response) {
      console.log('Response received');
      console.log(response.json())
      return response.json();
    });

    alert("You are submitting " + this.state.name);
  }

  myChangeHandler = (event) => {
    //save the changed input into corresponding state variable
    if (event.target.name === 'name')
      this.setState({name: event.target.value});
    else if (event.target.name === 'email')
      this.setState({email: event.target.value});
    else if (event.target.name === 'pin')
      this.setState({pin: event.target.value});
    else if (event.target.name === 'message')
      this.setState({message: event.target.value});
  }

  //Page rendering function for the form
  render() {
    return (
      <form onSubmit={this.formSubmitHandler}>
      <h1>Hello {this.state.name}</h1>
      <p>Please enter your details below</p>
      <label>
        Name:
        <input 
          type="text" 
          name="name" 
          onChange={this.myChangeHandler}
        />
      </label>
      <p></p>

      <label>
        Email:
        <input 
          type="text" 
          name="email" 
          onChange={this.myChangeHandler}
        />
      </label>
      <p></p>

      <label>
        Pin:
        <input 
          type="text" 
          name="pin" 
          onChange={this.myChangeHandler}
        />
      </label>
      <p></p>

      <label>
        Message:
        <input 
          type="text" 
          name="message" 
          onChange={this.myChangeHandler}
        />
      </label>
      <p></p>

      <input
        type='submit'
      />
      </form>
    );
  }
}

export default App;
