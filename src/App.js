import React, { useState } from 'react';
import CourseList from './course-list/CourseList';
import CourseDetail from './course-detail/CourseDetail';
import UserDetailForm from './user-detail/UserDetailForm';
import EnrolledUsers from './enrolled-user/EnrolledUsers';
import './App.css'; // Import the CSS file

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
      description: 'Description of Course 3',
      content: ['Introduction', 'Lesson 1', 'Lesson 2']
    },
    // Add more dummy courses as needed
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [enrolledUsers, setEnrolledUsers] = useState([]);
  const [activePage, setActivePage] = useState('home');

  const handleEnroll = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    setSelectedCourse(course);
    setShowForm(true);
  };

  const handleFormSubmit = (userDetails) => {
    const newEnrolledUser = {
      ...userDetails,
      course: selectedCourse,
    };
    setEnrolledCourses([...enrolledCourses, selectedCourse]);
    setEnrolledUsers([...enrolledUsers, newEnrolledUser]);
    setShowForm(false);
    alert(`You have enrolled in ${selectedCourse.title}`);
  };

  const handleCourseClick = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    setSelectedCourse(course);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <h1>Welcome to the Course Website</h1>
            <p><h3>Welcome to our comprehensive course catalog, designed to empower you with knowledge and skills that matter. Whether you're starting your journey or advancing in your career, our diverse range of courses caters to all levels of expertise and interests.</h3></p>        
            </>
        );
      case 'courses':
        return showForm ? (
          <UserDetailForm course={selectedCourse} onSubmit={handleFormSubmit} />
        ) : (
          <>
            {selectedCourse && <CourseDetail course={selectedCourse} />}
            <CourseList courses={courses} onEnroll={handleEnroll} />
          </>
        );
      case 'enrolled-users':
        return <EnrolledUsers enrolledUsers={enrolledUsers} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <nav>
        <ul>
          <li onClick={() => setActivePage('home')}>Home</li>
          <li onClick={() => setActivePage('courses')}>Courses</li>
          <li onClick={() => setActivePage('enrolled-users')}>Enrolled Users</li>
        </ul>
      </nav>
      {renderContent()}
      {activePage === 'courses' && (
        <>
          <h2>Enrolled Courses</h2>
          <ul>
            {enrolledCourses.map(course => (
              <li key={course.id} onClick={() => handleCourseClick(course.id)}>
                {course.title}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;



