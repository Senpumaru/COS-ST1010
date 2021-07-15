import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  approvalUpdateAction,
  caseDetailsAction,
} from "../../actions/Cases/CaseActions";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import Loader from "../../components/Loader";

const useStyles = makeStyles({
  screenTitle: {
    fontSize: 16,
    fontWeight: 600,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 600,
    backgroundColor: "#F2AA4CFF",
    paddingRight: "0.1rem",
    margin: "0.2rem",
  },
  cardWarning: {
    fontSize: 18,
    fontWeight: 600,

    paddingRight: "0.1rem",
    margin: "0.2rem",
  },
  formControl: {
    margin: 0,
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: 2,
  },
  dialogTitle: {
    fontSize: "1.2rem",
    backgroundColor: "#F2AA4CFF",
  },
  dialogWarning: {
    fontSize: "1.0rem",
    color: "#424242",
  },
});

function DialogReview(props) {
  const classes = useStyles();

  const { handleApprovalChoice, approveCase, approvalChoice, openApprovalAlert, handleCloseApproveAlert } = props;
  return (
    <React.Fragment>
      <Dialog
        open={openApprovalAlert}
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
                onClick={handleCloseApproveAlert}
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
    </React.Fragment>
  );
}

export default DialogReview;
