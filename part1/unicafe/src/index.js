import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const Statistic = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>
        {props.value}
        {props.percentage}
      </td>
    </>
  );
};

const Statistics = ({ good, bad, neutral, all, average, positive }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <Statistic text="Good" value={good} />
          </tr>
          <tr>
            <Statistic text="Neutral" value={neutral} />
          </tr>
          <tr>
            <Statistic text="Bad" value={bad} />
          </tr>
          <tr>
            <Statistic text="All" value={all} />
          </tr>
          <tr>
            <Statistic text="Average" value={average} />
          </tr>
          <tr>
            <Statistic text="Positive" value={positive} percentage="%" />
          </tr>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [total, setTotal] = useState(0);

  const average = total / all;
  const percentage = (good / all) * 100;

  const addGood = () => {
    setGood(good + 1);
    setAll(all + 1);
    setTotal(total + 1);
  };
  const addNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    setTotal(total + 0);
  };
  const addBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setTotal(total - 1);
  };
  if (all == 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <button onClick={addGood}>Good</button>
        <button onClick={addNeutral}>Neutral</button>
        <button onClick={addBad}>Bad</button>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>give feedback</h1>
        <Button onClick={addGood} text="Good" />
        <Button onClick={addNeutral} text="Neutral" />
        <Button onClick={addBad} text="Bad" />
        <h2>Statistics</h2>
        <Statistics
          good={good}
          bad={bad}
          neutral={neutral}
          all={all}
          average={average}
          positive={percentage}
        />
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
