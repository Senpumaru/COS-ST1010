import { Box, Button, Fade, Modal, Tooltip } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreationForm from "./CreationForm";

/*** Material UI Styles ***/
const useStyles = makeStyles({
  icons: {
    padding: 3,
  },

  modalForm: {
    overflow: "scroll",
  },
  tableCases: {
    padding: 12,
  },
});

function CreationFormAccess() {
  /*** Material UI Styles ***/
  const classes = useStyles();

  /*** Redux States ***/
  const dispatch = useDispatch();

  const caseList = useSelector((state) => state.ST1010["caseList"]);
  const { error, loading, cases } = caseList;

  /*** Local States ***/
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;

  if (userInfo) {
    if (
      userInfo["credentials"]["registrar"] ||
      userInfo["credentials"]["clinician"] ||
      userInfo["credentials"]["pathologist"]
    ) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Tooltip title="Создать новый кейс">
            <Fab onClick={handleOpenForm} variant="extended">
              Кейс
              <EditIcon className={classes.icons} fontSize="small" />
            </Fab>
          </Tooltip>
          <Modal
            className={classes.modalForm}
            open={openForm}
            onClose={handleCloseForm}
            disableBackdropClick
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Fade in={openForm === true} timeout={1000}>
              <Box m={2} mt={6}>
                <CreationForm />
                <Box pt={2}>
                  <Button
                    onClick={() => {
                      setOpenForm(false);
                    }}
                    color="secondary"
                    variant="contained"
                  >
                    Закрыть форму <CloseIcon fontSize="small" />
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </div>
      );
    } else {
      return (
        <Alert variant="outlined" severity="warning">
          Создание кейсов <strong>запрещено</strong> для данного типа аккаунта
        </Alert>
      );
    }
  } else {
    return <p>Вы не иммет прав для создания кейсов</p>;
  }
}

export default CreationFormAccess;
