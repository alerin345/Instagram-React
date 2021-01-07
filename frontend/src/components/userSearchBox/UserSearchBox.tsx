import React, { useState } from 'react';
import './UserSearchBox.css'
// @ts-ignore
import { Redirect, useHistory } from 'react-router-dom'

function UserSearchBox(props: any) {
  const [input, setInput]:any = useState(null)
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
      <button className="btn btn-primary" onClick={() => history.push(input)}>find user</button>
    </div>
  );
}

export default UserSearchBox;
