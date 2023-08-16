import React from 'react';
import axios from 'axios';


// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  getXY = (index, gridWidth) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const x = (index % gridWidth) + 1;
    const y = Math.floor(index / gridWidth) + 1;
    return { x, y };
  }
  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    const { index } = this.state;
    const gridWidth = 3
    const { x, y } = this.getXY(index, gridWidth);
    return `Coordinates (${x}, ${y})`;
  }
  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState);
  }
  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const { index } = this.state;
    const gridWidth = 3
    let nextIndex = index;
    
    switch (direction) {
      case 'left':
        if (index % gridWidth !== 0) {
          nextIndex = index - 1
        }
        break;
      case 'up':
        if (index >= gridWidth) {
          nextIndex = index - gridWidth
        }
        break;
      case 'right':
        if ((index + 1) % gridWidth !== 0) {
          nextIndex = index + 1
        }
        break;
      case 'down': 
        if (index < gridWidth * (gridWidth - 1)) {
          nextIndex = index + gridWidth
        }
        break;
      default:
        break;
    }
    if (nextIndex >= 0 && nextIndex < gridWidth * gridWidth) {
      return nextIndex;
    } else {
      return index;
    }
  }
  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id;
    this.setState((prevState) => {
      const nextIndex = this.getNextIndex(direction);
      return {
        index: nextIndex,
        steps: prevState.index !== nextIndex ? prevState.steps + 1 : prevState.steps,
        message: prevState.index !== nextIndex ? '' : `You can't go ${direction}`,

      };
    });
  }
  onChange = (evt) => {
    // You will need this to update the value of the input.
    this.setState({ ...this.state, email: evt.target.value })
  }
  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const { email, steps } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const payload = {
      x: 1,
      y: 2,
      steps: steps,
      email: email,
    }

    if (email === 'foo@bar.baz') {
      this.setState((prevstate) => ({
        ...prevstate,
        message: 'foo@bar.baz failure #71'
      }));
      return;
    };
    if (!email) {
      this.setState((prevstate) => ({
        ...prevstate,
        message: 'Ouch: email is required',
      }   
      ));
      return;
    }
    if(!emailRegex.test(email)) {
      this.setState((prevstate) => ({
        ...prevstate,
        message: 'Ouch: email must be a valid email',
      }
      ));
      return;
    }
    axios
      .post('http://localhost:9000/api/result', payload)
      .then((response) => {
        this.setState({
          message: response.data.message,
        });
        console.log('POST request successful:', response.data);
    })
     .catch((error) => {
      console.error('POST request failed:', error);
    })
     .finally(() => {
      this.setState((prevstate) => ({
        ...prevstate,
        index: initialIndex,
        steps: 0,
        message: '',
        email: '',
      }));
    });
  }

  render() {
    const { className } = this.props;
    const { steps } = this.state;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {steps} {steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => {
              return (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            );
          })}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" value={this.state.email} onChange={this.onChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
