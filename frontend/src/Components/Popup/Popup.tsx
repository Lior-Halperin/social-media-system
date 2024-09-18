import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface PopupProps {
  children: React.ReactNode;
  onClose: () => void;
  onContinue: () => void;
  title: string;
}

const Popup: React.FC<PopupProps> = ({
  children,
  onClose,
  onContinue,
  title,
}) => {
  return (
    <>
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onContinue} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Popup;
