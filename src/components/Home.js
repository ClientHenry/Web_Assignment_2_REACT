import React from 'react';

function Home(props) {
    return (
        <div>
            <p>Super user: wangh</p>
            <p>Super user password: 123456</p>
            <p>Admin Account: admin@gmail.com</p>
            <p>Admin Password: 123456</p>
            <p>Lecturer Account: lecturer@gmail.com</p>
            <p>User Password: 123456</p>
            <p>Student Account: student@gmail.com</p>
            <p>Student Password: 123456</p>
            <p>Registration Rules: User name is the email, password is the birthday</p>
            <p>Example: User name: henry@gmail.com, password: 1991-02-08 (note the format of birthday)</p>
        </div>
    );
}

export default Home;