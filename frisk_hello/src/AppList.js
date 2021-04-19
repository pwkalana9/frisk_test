import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import React from 'react';
import {useState, useEffect} from 'react';

export default class AppList extends React.Component {
 
  constructor(props)
  {
    super(props);
    //following is just for testing the table rendering 
    var table_data = { //state is by default an object
        data : [
          {
            id: 1,
            time_created: '2021-04-17T18:33:07.942Z',
            name: 'Kalana',
            email: 'pwkalana9@gmail.com',
            pin: '2334',
            message: 'Congratulations, please join the party.'
          },
          {
            id: 2,
            time_created: '2021-04-17T18:33:56.169Z',
            name: 'Withanage',
            email: 'pwkalana9@gmail.com',
            pin: '1234',
            message: 'Hello, how are you?'
          },
          {
            id: 3,
            time_created: '2021-04-17T18:34:38.570Z',
            name: 'James',
            email: 'james@gmail.com',
            pin: '0978',
            message: 'I am at the bus stop, see you there.'
          }
        ]    
   }
    //Uncomment following to test table data rendering without API
    /*this.props.data = table_data.data;
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);*/
  }

  componentDidMount() {
      //When the component initializes, load the data from the APIs
      console.log("requesting");
      fetch("http://localhost:3000/getmessages", {
        "method": "GET",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json"
        }
      })
      .then(response => (response.json()))
      .then(response => {
        //store the messages into the state variable
        this.setState({
          messages: response
        });
        this.props.data = this.state.messages;
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
      })
      .catch(err => { console.log(err); 
      });
  }
  
  //Get the keys for table rendering
  getKeys = function()
  {
    console.log(this.props.data);
    return Object.keys(this.props.data[0]);
  }
  
  //Get the header names for table rendering
  getHeader = function()
  {
    var keys = this.getKeys();
    return keys.map((key, index)=>{
    return <th key={key}>{key.toUpperCase()}</th>
    })
  }
  
  //Get the data for each row in the table
  getRowsData = function()
  {
    var items = this.props.data;
    var keys = this.getKeys();
    return items.map((row, index)=>{
    return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
    })
  }
  
  //Page rendering goes here
  render() 
  {
    return (
    <div>
      <a href="http://localhost:3000/exportcsv">Download CSV</a>
      <table>
        <thead>
          <tr>{this.getHeader()}</tr>
        </thead>
        <tbody>
          {this.getRowsData()}
        </tbody>
      </table>
    </div>
    );
    }
 }
 
 //Render each table row
 const RenderRow = (props) =>{
  return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
 }
 
 
