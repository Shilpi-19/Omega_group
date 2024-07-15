import React, { useState } from 'react';
import CourseList from './CourseList';
import CourseDetail from './CourseDetail';
import UserDetailForm from './UserDetailForm';

const App = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Course 1',
      description: 'Description of Course 1',
      content: ['Introduction', 'Chapter 1', 'Chapter 2']
    },
    {
      id: 2,
      title: 'Course 2',
      description: 'Description of Course 2',
      content: ['Introduction', 'Lesson 1', 'Lesson 2']
    },
    {
      id: 3,
      title: 'Course 3',
      description: 'Description of Course 2',
      content: ['Introduction', 'Lesson 1', 'Lesson 2']
    },
    // Add more dummy courses as needed
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleEnroll = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    setSelectedCourse(course);
    setShowForm(true);
  };

  const handleFormSubmit = (userDetails) => {
    setEnrolledCourses([...enrolledCourses, selectedCourse]);
    setUserData(userDetails);
    setShowForm(false);
    alert(`You have enrolled in ${selectedCourse.title}`);
  };

  const handleCourseClick = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    setSelectedCourse(course);
  };

  return (
    <div>
      <h1>Course Website</h1>
      {showForm ? (
        <UserDetailForm course={selectedCourse} onSubmit={handleFormSubmit} />
      ) : selectedCourse ? (
        <CourseDetail course={selectedCourse} />
      ) : (
        <CourseList courses={courses} onEnroll={handleEnroll} />
      )}
      <h2>Enrolled Courses</h2>
      <ul>
        {enrolledCourses.map(course => (
          <li key={course.id} onClick={() => handleCourseClick(course.id)}>
            {course.title}
          </li>
        ))}
      </ul>
      {userData && (
        <div>
          <h2>User Details</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
          <p>Enrolled Course: {selectedCourse.title}</p>
        </div>
      )}
    </div>
  );
};

export default App;
