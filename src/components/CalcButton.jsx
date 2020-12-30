import React, { Component } from 'react';

const row1 = ['AC', '-/+', '%', '/'];
const row2 = ['7', '8', '9', 'x'];
const row3 = ['4', '5', '6', '-'];
const row4 = ['1', '2', '3', '+'];
const row5 = ['0', '.', '='];

class CalcButton extends Component {

   handleClick = button => {
      this.props.onClick(button.target.name);
   }

   render() {
      return(
         <div className="btnContainer">
            <div className="btn4">
               {row1.map(item => (
                  <button key={item} name={item} onClick={this.handleClick}>{item}</button>
               ))}
            </div>
            <div className="btn4">
               {row2.map(item => (
                  <button key={item} name={item} onClick={this.handleClick}>{item}</button>
               ))}
            </div>
            <div className="btn4">
               {row3.map(item => (
                  <button key={item} name={item} onClick={this.handleClick}>{item}</button>
               ))}
            </div>
            <div className="btn4">
               {row4.map(item => (
                  <button key={item} name={item} onClick={this.handleClick}>{item}</button>
               ))}
            </div>
            <div className="btn4">
               {row5.map(item => (
                  <button key={item} name={item} onClick={this.handleClick}>{item}</button>
               ))}
            </div>
         </div>
      )
   }
}

export default CalcButton;