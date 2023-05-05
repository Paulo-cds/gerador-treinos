import { Backdrop, Dialog, Modal } from "@mui/material";

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
      <video width="100%" height="100%" controls="controls" autoplay="autoplay">
        <source src="https://youtu.be/ziq0KHVhlUA" type="video/mp4" />
      </video>
    </Dialog>
  );
};

export default Player;
