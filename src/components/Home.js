import React from 'react';

function Home(props) {
    return (
        <div>
            <p>Super user: wangh</p>
            <p>Super user password: 123456</p>
            <p>Admin Account: admin</p>
            <p>Admin Password: a1d2m3i4n5</p>
            <p>Lecturer Account: tony@gmail.com</p>
            <p>User Password: 2000-01-01</p>
            <p>Student Account: henry@gmail.com</p>
            <p>Student Password: 2000-01-01</p>
            <p>Registration Rules: User name is the email, password is the birthday</p>
            <p>Example: User name: wangh159@myunitec.ac.nz, password: 1991-02-08 (note the format of birthday)</p>
        </div>
    );
}

export default Home;