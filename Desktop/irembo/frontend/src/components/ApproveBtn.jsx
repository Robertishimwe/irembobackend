import Button from '@mui/material/Button';

import api from "../utils/api";


function ApproveBtn({id}) {

    const handleClick =()=>{
        api
      .post(`/admin/approve-and-verify`, {
        _id: id,
      })
      .then((res) => {

        alert("Approved")

      }).catch((error)=>{
        alert(error.response.data.message)

      })

    }
  return (
    <>
    <Button variant="contained" size="small" onClick={handleClick}>Approve</Button>
    </>
  )
}

export default ApproveBtn