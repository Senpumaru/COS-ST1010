import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { caseDeleteAction } from "../../actions/Cases/CaseActions";

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

function DialogDelete(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteCase = () => {
    dispatch(caseDeleteAction(props.instance.uuid));

    history.push("/ST1010");
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.openDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className={classes.alertTitle} id="alert-dialog-title">
          Предупреждение
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Данное оповещение предназначено для защиты от случайного удаления объекта. Вы уверены что хотите удалить
            данный кейс?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={props.handleCloseDeleteDialog} color="primary">
            Не согласен
          </Button>
          <Button variant="outlined" onClick={deleteCase} color="primary" autoFocus>
            Согласен
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogDelete;
