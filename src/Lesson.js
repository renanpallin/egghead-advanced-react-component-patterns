import React from 'react';

const Lesson = ({ title, problem = false, children }) => (
    <div className="App-intro">
        <h1 className={problem ? 'red' : '' }>{title}</h1>
        <div className="flex-center">{children}</div>
    </div>
);

export default Lesson;