import { useState, useEffect } from 'react';
import List from '@mui/material/List';

import User from './User'

import api from "../utils/api";

export default function Users() {

  const [users, setUsers] = useState([ ]);

  useEffect(() => {

    api
    .get(`/user/get/all`).then((res) => {
      console.log(res.data.users);
      setUsers(res.data.users);
      
      // setUsers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }, [])



  return (
    <div style={{ width: '100%', height: '100%', position: 'fixed', overflow:'scroll'}}>
    <List sx={{ position:'absoluete', marginTop: '20px', width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
     { users? users.map((user)=>(
      <User key={user._id} userName={user.firstName + ' ' + user.lastName} email={user.email} status={user.verificationStatus}/>

     )):null}
     {/* <User/> */}
        
    </List>
    </div>
  );
}
