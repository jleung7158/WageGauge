import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  decrementByAmount,
  incrementAsync,
  selectCount,
} from "./counterSlice";

export default function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState();

  return (
    <div>
      <div className="flex flex-row m-4">
        <div>
          <span className="p-4">{count}</span>
        </div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
            className="p-4"
          >
            Increment
          </button>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
            className="p-4"
          >
            Decrement
          </button>
        </div>
        <div>
          <button
            aria-label="Increment by amount"
            onClick={() =>
              dispatch(incrementByAmount(Number(incrementAmount) || 0))
            }
            className="p-4"
          >
            Increment by amount
          </button>
          <button
            aria-label="Decrement by amount"
            onClick={() =>
              dispatch(decrementByAmount(Number(incrementAmount) || 0))
            }
            className="p-4"
          >
            Decrement by amount
          </button>
        </div>

        <button
          aria-label="Async increment"
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
          className="p-4"
        >
          Async increment
        </button>
        <input
          aria-label="Set increment amount"
          onChange={(e) => setIncrementAmount(e.target.value)}
          className="text-center"
          value={incrementAmount}
        />
      </div>
    </div>
  );
}
