import React , { Component } from 'react';

class ResultDisplay extends Component {
   render() {
      let { result } = this.props;

      return (
         <div className='resDisplay'>
            <p className='res'>{ result }</p>
         </div>
      )
   }
}

export default ResultDisplay;