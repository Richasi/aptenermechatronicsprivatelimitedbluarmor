// src/App.js
import React, { useEffect, useState } from 'react';
import CounterView from './view/CounterView';
import { CounterModel } from './model/CounterModel';

const App = () => {
  const [count, setCount] = useState(0);
  const [autoIncrement, setAutoIncrement] = useState(false);

  useEffect(() => {
    const subscription = CounterModel.updateCount$.subscribe(setCount);
    return () => subscription.unsubscribe();
  }, []);

  const handleToggleAutoIncrement = () => {
    CounterModel.autoIncrement$.next(!CounterModel.autoIncrement$.value);
    setAutoIncrement(!autoIncrement);
  };

  return (
    <CounterView
      count={count}
      onIncrement={() => CounterModel.increment$.next()}
      onDecrement={() => CounterModel.decrement$.next()}
      onReset={() => CounterModel.reset$.next()}
      onToggleAuto={handleToggleAutoIncrement}
      autoIncrement={autoIncrement}
    />
  );
};

export default App;
