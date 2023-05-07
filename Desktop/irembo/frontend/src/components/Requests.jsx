import { useState, useEffect } from 'react';
import List from '@mui/material/List';

import Request from './Request'

import api from "../utils/api";

export default function Requests() {

  const [requests, setRequests] = useState([ ]);

  useEffect(() => {

    api
    .get(`/admin/all-pending-request`).then((res) => {
      // console.log(res.data.data);
      setRequests(res.data.data);
      
      // setUsers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  }, [])

// const requestReversed = requests.sort((a, b) => b.CreatedDate.localeCompare(a.CreatedDate));
console.log(requests)

  return (
    <div style={{ width: '100%', height: '100%', position: 'fixed', overflow:'scroll'}}>
    <List sx={{ position:'absoluete', marginTop: '20px', width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    { requests? requests.map((request)=>(
      <Request key={request._id} id={request._id} userName={request.user.firstName + ' ' + request.user.lastName} email={request.user.email} status={request.user.verificationStatus} profilePicture={request.user.profilePicture} documentLink={request.documentImageUrl}/>

     )):null}
    </List>
    </div>
  );
}
