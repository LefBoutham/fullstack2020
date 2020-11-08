import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  // Get random index of array
  const arrayIndex = (array) => {
    return Math.floor(Math.random() * array.length);
  };

  // State control
  const [selected, setSelected] = useState(arrayIndex(props.anecdotes));
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0));

  // Next anecdote event handler
  const nextAnecdote = () => {
    setSelected(arrayIndex(props.anecdotes));
  };

  // Voting handler
  const addVote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes(votesCopy);
  };

  // Index number of highest votes in Array
  let mostVotes = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anectode of the day</h1>
      {props.anecdotes[selected]} <br />
      <button onClick={addVote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <p>has {votes[selected]} votes</p>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[mostVotes]}
      <p>Votes: {votes[mostVotes]}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
