import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { Verified } from "@mui/icons-material";

function User({userName,email,status}) {
  return (
    <div>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="User name" src="/static/images/avatar/userPofile" />
        </ListItemAvatar>
        <ListItemText
          primary={<React.Fragment>{userName} {status === 'VERIFIED'? <Verified sx={{color:'#1976d2', fontSize:16}}/>:null}</React.Fragment>}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {email}
              </Typography>{ ' '}
              {status === 'PENDING-VERIFICATION'? 'Pending': status === 'UNVERIFIED'? 'Unverified': status === 'VERIFIED'? null:null}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}

export default User;
