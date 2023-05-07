// import * as React from "react";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";

// import { FilePresent } from "@mui/icons-material";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// export default function BasicModal({ documentLink }) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   return (
//     <div>
//       <FilePresent onClick={handleOpen} />
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <img src={documentLink} style={{ width: "100%", height: "400px" }} />
//         </Box>
//       </Modal>
//     </div>
//   );
// }

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { FilePresent } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ documentLink }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true); // new state variable
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageLoad = () => setLoading(false);

  return (
    <div>
      <FilePresent onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading && <div>Loading...</div>}
          <img
            src={documentLink}
            style={{ width: "100%", height: "400px" }}
            onLoad={handleImageLoad}
            hidden={loading}
          />
        </Box>
      </Modal>
    </div>
  );
}
