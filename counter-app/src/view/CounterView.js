import React from 'react';
import './CounterView.css';

const CounterView = ({
  count,
  onIncrement,
  onDecrement,
  onReset,
  onToggleAuto,
  autoIncrement
}) => {
  return (
    <div className="counter-container">
      <h1>Counter: {count}</h1>
      <div className="button-group">
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
        <button onClick={onReset}>Reset</button>
      </div>
      <button onClick={onToggleAuto}>
        {autoIncrement ? 'Stop Auto Increment' : 'Start Auto Increment'}
      </button>
    </div>
  );
};

export default CounterView;
