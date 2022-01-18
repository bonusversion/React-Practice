import React, { useState, useRef } from "react";
import classes from "./AddUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../UI/Helper/Wrapper";

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  console.log(nameInputRef);

  //   const [enteredUsername, setEnteredUsername] = useState("");
  //   const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();

    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }

    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (>0).",
      });
      return;
    }

    props.onAddUser(enteredUsername, enteredAge);
    // setEnteredUsername("");
    // setEnteredAge("");

    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  //   const usernameChangeHandler = (event) => {
  //     setEnteredUsername(event.target.value);
  //   };

  //   const ageChangeHandler = (event) => {
  //     setEnteredAge(event.target.value);
  //   };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            // value={enteredUsername}
            // onChange={usernameChangeHandler}
            ref={nameInputRef}
          ></input>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            // onChange={ageChangeHandler}
            // value={enteredAge}
            ref={ageInputRef}
          ></input>
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
