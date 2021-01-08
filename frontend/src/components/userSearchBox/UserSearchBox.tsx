import React, { useState, useContext } from 'react';
import './UserSearchBox.css'
// @ts-ignore
import { Redirect, useHistory, Link } from 'react-router-dom'
import { UsersListContext } from './../usersListContext/UsersListContext'

function UserSearchBox(props: any) {
  const {usersList} = useContext(UsersListContext)
  const [input, setInput]:any = useState("/")
  const history = useHistory();
  // const [loading, setLoading] = React.useState(true);
  // const [error, setError] = React.useState('');
  // const [data, setData] = React.useState([]);
  //
  // useEffect(() => {
  //     setLoading(true);
  //     fetch('http://localhost:8000/api/user/')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setLoading(false);
  //         setData(data);
  //       })
  //       .catch((e) => {
  //         setLoading(false);
  //         setError('fetch failed');
  //       });
  //   }, []);

  return (
    <div className="UserSearchBox">
      <input type="text" placeholder="username" onKeyUp={(e:any) => setInput(e.target.value)}/>
       {/*<Link to={input}>find user</Link>*/}
       <button className="btn btn-primary" onClick={() => history.push(input)}>find user</button>
    </div>
  );
}

export default UserSearchBox;
