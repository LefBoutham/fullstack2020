import React from "react";

const Header = (props) => {
  console.log(props);
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};

const Part = (props) => {
  console.log(props);
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  );
};

const Content = ({ course }) => {
  console.log(course);

  const parts = course.parts.map((part) => {
    return <Part key={part.id} name={part.name} exercises={part.exercises} />;
  });

  return <>{parts}</>;
};

const Total = ({ course }) => {
  console.log(course);
  const lessons = course.parts.map((part) => part.exercises);
  const lessonsSum = lessons.reduce((a, b) => a + b, 0);
  return (
    <>
      <p>Total of {lessonsSum} exercises</p>
    </>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  );
};

const Courses = (props) => {
  const listCourses = props.courses.map((course) => {
    return <Course course={course} />;
  });

  return <div>{listCourses}</div>;
};

export default Courses;
