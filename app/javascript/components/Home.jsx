import React, { useState } from 'react';

// https://reactjs.org/docs/hooks-intro.html
export default function () {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}