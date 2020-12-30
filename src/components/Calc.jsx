import React, { Component } from 'react';
import CalcButton from './CalcButton.jsx';
import ResultDisplay from './ResultDisplay.jsx';

class Calc extends Component {
   constructor(props) {
      super(props);

      this.state = {
         displayValue: '0',
         inputRecord: [],
         lastSignUsed: '',
         resultNum: '',
         lastInputNum: 0,
         lastButtonPress: '',
         isNewNumber: true,
         isNumberAddedToArray: false,
         tempCalc: 0,
         tempCalcNeedChange: true
         
      };

   }

   calcMath = (param1, param2, operParam) => {
      let calcResult;

      if (operParam === '/') {
         calcResult = param1 / param2;
      } else if (operParam === 'x') {
         calcResult = param1 * param2;
      } else if (operParam === '+') {
         calcResult = param1 + param2
      } else if (operParam === '-') {
         calcResult = param1 - param2
      }

      return calcResult;
   }

   stringNumToInt = (string) => {
      if (string.includes('.')) {
         return parseFloat(string);
      }
      return parseInt(string);
   }

   handleClick = button => {

      let arithOperators = ['-', '+', '/' , 'x'];

      this.setState({
         lastButtonPress: button
      })

      /**********************************************************************************************/

      // checks if button pressed is a number
      if (Number.isInteger(parseInt(button))) {
         if (this.state.isNewNumber === true) {
            this.setState({
               displayValue: button,
               isNewNumber: false
            })
         } else {
            this.setState({
               displayValue: this.state.displayValue + button,
               isNewNumber: false
            })
         }
      }

      /**********************************************************************************************/

      // all clear - reset calculator
      if (button === 'AC') {
         this.setState({
            displayValue: '0',
            inputRecord: [],
            lastSignUsed: '',
            resultNum: '',
            lastInputNum: 0,
            lastButtonPress: '',
            isNewNumber: true,
            isNumberAddedToArray: false,
            tempCalc: 0,
            tempCalcNeedChange: true
         })
      }

      /**********************************************************************************************/

      // change display number from pos to neg and opposite
      if (button === '-/+') {
         this.setState({
            displayValue: (this.stringNumToInt(this.state.displayValue) * -1) + ''
         })
      }

      /**********************************************************************************************/

      // add a demical to number and only one 
      if (button === '.') {
         if (!this.state.displayValue.includes('.')) {
            this.setState({
               displayValue: this.state.displayValue + button
            });
         }
      }
      /**********************************************************************************************/
      
      // turn displayValue to decimal
      if (button === '%') {
         let displayValueToInt = this.stringNumToInt(this.state.displayValue);
         this.setState({
            displayValue: (displayValueToInt * 0.01) + ''
         })
      }

      /**********************************************************************************************/

      if (arithOperators.includes(button)) {
         let displayValueToInt = this.stringNumToInt(this.state.displayValue);
         let newResult = this.calcMath(this.state.resultNum, displayValueToInt, this.state.lastSignUsed);
         let newInputRecord = this.state.inputRecord;

         // if resultNum is empty, set displayed value as resultNum
         if (this.state.resultNum === '') {
            this.setState({
               resultNum: displayValueToInt
            })
         } else {
            if (!arithOperators.includes(this.state.lastButtonPress) && arithOperators.includes(this.state.inputRecord[this.state.inputRecord.length-1])) {
               this.setState({
                  displayValue: newResult + '',
                  resultNum: newResult,
               })
            }
         }

         if (this.state.isNewNumber === false) {
            newInputRecord = [...newInputRecord, displayValueToInt];
         }
         newInputRecord = [...newInputRecord, button];
      
         this.setState({
            inputRecord: newInputRecord
         })
         
         if (!this.state.tempCalcNeedChange) {
            this.setState({
               lastSignUsed: button,
               lastInputNum: displayValueToInt,
               isNewNumber: true,
               tempCalcNeedChange: true
            })
         } else {
            this.setState({
               lastSignUsed: button,
               lastInputNum: displayValueToInt,
               isNewNumber: true,
            })
         }
      }

      /**********************************************************************************************/

      if (button === '=') {
         let calcResult;
         let displayValueToInt = this.stringNumToInt(this.state.displayValue);

         if (this.state.isNumberAddedToArray === false) {
            this.setState({
              inputRecord: [...this.state.inputRecord, displayValueToInt],
               isNumberAddedToArray: true,
               tempCalc: displayValueToInt
            })
         }

         if (this.state.tempCalcNeedChange) {
            this.setState({
               tempCalcNeedChange: false,
               tempCalc: displayValueToInt
            })
         }

         if (this.state.lastButtonPress === '=') {
            calcResult = this.calcMath(this.state.resultNum, this.state.tempCalc, this.state.lastSignUsed)
         } else {
            calcResult = this.calcMath(this.state.resultNum, displayValueToInt, this.state.lastSignUsed);
         }

         this.setState({
            displayValue: calcResult + '',
            resultNum: calcResult,
         })
      }
   }

   render() {
      return (
         <div>
            <h1>Simple Calculator</h1>
            <ResultDisplay result={this.state.displayValue}/>
            <CalcButton onClick={this.handleClick} />
         </div>
      );
   }

}

export default Calc;