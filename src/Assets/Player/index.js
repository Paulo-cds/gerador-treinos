import { Backdrop, Dialog, Modal } from "@mui/material";
import ReactPlayer from "react-player";
import "./playerStyles.css";

const Player = ({ open, setOpen, link }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ReactPlayer
        url={link}
        controls="controls"
        style={{overflow:'hidden',maxWidth:'100%'}}
        width="520px" 
      />
    </Dialog>
  );
};

export default Player;
