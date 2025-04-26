import { Alert, Snackbar } from "@mui/material";

const AlertFeedBack = ({open, setOpen, severity, title}) => {
    const handleClose = () => {
        setOpen(false)
    }
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
        <Alert severity={severity}>{title}</Alert>
    </Snackbar>
  );
};

export default AlertFeedBack;
