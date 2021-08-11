import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  TableCell,
  Tooltip,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import RateReviewIcon from "@material-ui/icons/RateReview";
import SyncIcon from "@material-ui/icons/Sync";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { caseAddendumAction } from "../../actions/Cases/CaseActions";

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

function DialogAddendum(props) {
  /*** Material UI Styles ***/
  const classes = useStyles();
  /*** Redux States ***/
  const dispatch = useDispatch();
  /*** Props ***/
  const {
    openAddendumDialog,
    setOpenAddendumDialog,
    // Data
    uuid,
  } = props;

  const handleCloseAddendumDialog = () => {
    setOpenAddendumDialog(false);
  };

  return (
    <Dialog
      open={openAddendumDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className={classes.dialogHeader} id="transfer-dialog-title">
        <Typography className={classes.dialogTitle}>Поправка отчета (Новая версия)</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography className={classes.dialogSubTitle}>Внимание!</Typography>
          <Typography className={classes.dialogText}>
            Данное действие приведет к переведению в архив нынешней версии кейса. Новая версия кейса
            будет требовать утверждения предыдущих консультантов. К новой версии кейса можно
            подключить новых консультантов.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseAddendumDialog} variant="outlined" color="primary">
          Отмена
        </Button>
        <Button
          onClick={() => dispatch(caseAddendumAction(uuid))}
          variant="outlined"
          color="primary"
          autoFocus
        >
          Произвести поправку
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogAddendum;
