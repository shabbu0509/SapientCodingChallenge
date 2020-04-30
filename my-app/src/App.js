
import React, { Component } from 'react'
import './App.css';
class Table extends Component {
  constructor(props) {
     super(props) 
     this.state = {
      error: null,
      isLoaded: false,
      news: [],
      value: ''
     }
     
 
  }
  componentDidMount() {
    fetch("https://hn.algolia.com/api/v1/search?tags=front_page")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            news: result.hits
          });
        },
     
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  renderTableData() {
    var Diamond = require('../src/assets/triangle.png');
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    
  var currentdate=date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
  var currentTime = hours;
  console.log(currentTime);
 // console.log(this.state.news);
     return this.state.news.map((news1, index) => {
        const { created_at_i, title , points, url,author,created_at, num_comments} = news1 //destructuring
      
       const split1 = created_at.split('T');
      //console.log(split1[0]);
      const datesplit = split1[0].split('-');
      //console.log(datesplit[2]);
       const split2 = split1[1].split(":");
       //console.log(split2[0]);
       let diffInTime;
      // console.log(diffInTime);
      const diffInDate = date - datesplit[2];
       if(diffInDate>0){
         diffInTime = currentTime-split2[0];
       //  console.log(diffInDate + "   minus date");
       // diffInTime =  Math.abs(diffInTime);
        diffInTime = diffInTime + (diffInDate*24) ;
       }
       else if(diffInDate==0){
         //console.log("if date is same" + split2[0]+"    "+currentTime);
         diffInTime = currentTime - split2[0];
       }
      
       function handleClick() {
        console.log('this is:'+this+"   "+ index);
        console.log(this);
        localStorage.setItem(index, news1);
        console.log(this.state.news[index]);
        this.state.news.splice([index],1);
        console.log("deleted");
        console.log(this.state.news);
       // delete hits[news1];
       this.setState({
       
        news: this.state.news
      });
       
      }
    
      return   (
         
          <tr key={created_at_i}>
            <td id="num1">{num_comments}</td>
             <td id="num1">{points}</td>
             <td id="trianglewidth"><img src={Diamond} id='triangle'/></td>
             <td><p><span><b>{title} </b></span><small><span id="urlText"><a href={url} target="_blank">({url})</a> by </span><span>{author}</span><span id="urlText"> {diffInTime} hours ago</span>
              <span onClick={handleClick.bind(this, index)} > [ hide ]</span></small></p></td>
             
        </tr> 
      )
       })
      }
  
  renderTableHeader() {
    let header = Object.keys(this.state.news[0])
    return header.map((key, index) => {
       return <th key={index}>{key.toUpperCase()}</th>
    })
 }
  render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
    return (
      <div>
      <div id='title'> top  |  New </div>
      <table id='news'>
         <tbody>
        
            {this.renderTableData()}
         </tbody>
      </table>
   </div>
    )
 }
}





export default Table //exporting a component make it reusable and this is the beauty of react

