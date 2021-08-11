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
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { caseDetailsAction } from "../../actions/Cases/CaseActions";

import Loader from "../../components/Loader";

const useStyles = makeStyles({
  dialogHeader: {
    backgroundColor: "#F2AA4CFF",
  },
  dialogTitle: {
    fontWeight: 600,
    fontSize: "1.4rem",
    backgroundColor: "#F2AA4CFF",
  },
  dialogSubTitle: {
    fontWeight: 600,
    fontSize: "1.2rem",
    color: "#424242",
  },
  dialogText: {
    fontWeight: 400,
    fontSize: "1.0rem",
    color: "#424242",
  },
});

const SERVER_URL = process.env.REACT_APP_API_SERVER;

function DialogReview(props) {
  /*** Material UI Styles ***/
  const classes = useStyles();
  /*** Redux States ***/
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;
  /*** Props ***/
  const {
    openReviewDialog,
    setOpenReviewDialog,
    reviewSuccess,
    setReviewSuccess,
    setReviewError,
    // Data
    instance,
  } = props;

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
  };

  async function handleReview() {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    try {
      await axios
        .put(SERVER_URL + `api/ST1010/cases/${instance.uuid}/review/`, instance, config)
        .then(function (response) {
          setReviewSuccess(true);
          dispatch(caseDetailsAction(instance.uuid));
          setOpenReviewDialog(false);
        });
    } catch (error) {
      setReviewError(error.response && error.response.data.Detail ? error.response.data.Detail : error.message);
      setOpenReviewDialog(false);
    }
  }
  return (
    <Dialog
      open={openReviewDialog}
      onClose={handleCloseReviewDialog}
      aria-labelledby="review-dialog-title"
      aria-describedby="review-dialog-description"
    >
      <DialogTitle className={classes.dialogTitle} id="review-dialog-title">
        Создание отчета
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.dialogWarning} id="Dialog-description-id">
          <strong>Внимание!</strong>
          <br />
          Кейс будет переведен в отчет. Любые дальнейшие изменения кейса приведут к потере нынешнего отчета.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseReviewDialog} variant="outlined" color="primary">
          Отмена
        </Button>
        <Button onClick={handleReview} variant="outlined" color="primary" autoFocus>
          Принять
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogReview;
