import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approvalUpdateAction } from "../../actions/Cases/CaseActions";

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
    fontWeight: 600,
    fontSize: "1.0rem",
    color: "#424242",
  },
});

function DialogApproval(props) {
  /*** Material UI Styles ***/
  const classes = useStyles();
  /*** Props ***/
  const {
    openApprovalDialogue,
    setOpenApprovalDialogue,
    // Data
    approvals,
  } = props;

  /*** Redux States ***/
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;

  /** Case Approval **/
  // Close Dialogue
  const handleCloseApproveDialogue = () => {
    setOpenApprovalDialogue(false);
  };
  var checkApprovalConsulant = approvals.filter((obj) => {
    return obj.consultant === userInfo.id;
  });
  // Action
  const [approvalChoice, setApprovalChoice] = useState("");

  const handleApprovalChoice = (event) => {
    setApprovalChoice(event.target.value);
  };

  const approveCase = () => {
    setOpenApprovalDialogue(false);
    const data = {};
    data["id"] = checkApprovalConsulant[0]?.id;
    data["approvalChoice"] = approvalChoice;
    dispatch(approvalUpdateAction(data));
  };

  return (
    <Dialog
      open={openApprovalDialogue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
       <DialogTitle className={classes.dialogTitle} id="alert-dialog-title">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>{"Утверждение кейса"}</Grid>
            <Grid item>
              <IconButton
                aria-label="close"
                className={classes.icons}
                onClick={handleCloseApproveDialogue}
              >
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            className={classes.dialogWarning}
            id="Dialog-description-id"
          >
            <strong>Внимание!</strong>
            <br />
            Любое изменение в заключении данного кейса со стороны патолога
            приведет к обнулению вашего решения. Можете поменять решение в любое
            время до публикации данной версии кейса. При утверждении кейса всеми
            консультантами, кейс будет доступен для публикации.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <RadioGroup
            aria-label="approval"
            name="approval"
            value={approvalChoice}
            onChange={handleApprovalChoice}
          >
            <Grid container>
              <Grid>
                <FormControlLabel
                  value={"Yes"}
                  control={<Radio />}
                  label="Утверждаю"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value={"No"}
                  control={<Radio />}
                  label="Не утверждаю"
                />
              </Grid>
            </Grid>
          </RadioGroup>
          <Button onClick={approveCase} color="secondary" variant="contained">
            Ответ
          </Button>
        </DialogActions>
    </Dialog>
  );
}

export default DialogApproval;
