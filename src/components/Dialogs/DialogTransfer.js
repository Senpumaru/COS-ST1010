import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, makeStyles, Typography
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { caseTransferAction } from "../../actions/Cases/CaseActions";

const useStyles = makeStyles({
  dialogHeader: {
    backgroundColor: "#F2AA4CFF",
  },
  dialogTitle: {
    fontWeight: 600,
    fontSize: "1.2rem",
    backgroundColor: "#F2AA4CFF",
  },
  dialogText: {
    fontWeight: 400,
    fontSize: "1.0rem",
    color: "#424242",
  },
});

function DialogTransfer(props) {
  /*** Material UI Styles ***/
  const classes = useStyles();

  /*** Props ***/
  const {
    openTransferDialog,
    setOpenTransferDialog,
    // Data
    uuid,
    CaseCreatorLN: last_name,
    CaseCreatorFN: first_name,
  } = props;

  /*** Redux States ***/
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;

  /** Case Transfer **/
  // Close Dialogue
  const handleCloseTransferDialog = () => {
    setOpenTransferDialog(false);
  };

  function caseTransfer(uuid) {
    setOpenTransferDialog(false);
    // Data
    const data = {};
    data["uuid"] = uuid;
    data["caseAssistant"] = userInfo.id;
    // Action
    dispatch(caseTransferAction(data));
    
  }

  return (
    <React.Fragment>
      <Dialog
        open={openTransferDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.dialogHeader} id="transfer-dialog-title">
          <Typography className={classes.dialogTitle}>Трансфер кейса</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography>
              Вы хотите произвести трансфер кейса (стать ассистентом) клинициста:
            </Typography>
            <Typography className={classes.dialogText}>{last_name + " " + first_name}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTransferDialog} variant="outlined" color="primary">
            Отмена
          </Button>
          <Button onClick={() => caseTransfer(uuid)} variant="outlined" color="primary" autoFocus>
            Произвести трансфер
          </Button>
        </DialogActions>
      </Dialog>

      
    </React.Fragment>
  );
}

export default DialogTransfer;
