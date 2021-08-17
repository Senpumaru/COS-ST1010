import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

function DialogDelivery(props) {
  /*** Material UI Styles ***/
  const classes = useStyles();
  /*** Redux States ***/
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;
  /*** Props ***/
  const {
    openDeliveryDialog,
    setOpenDeliveryDialog,
    setDeliverySuccess,
    deliveryError,
    setDeliveryError,
    // Data
    uuid,
  } = props;

  const handleCloseDeliveryDialog = () => {
    setOpenDeliveryDialog(false);
  };

  /*** Local States ***/
  const [deliveryEmail, setDeliveryEmail] = useState("hakumen737@gmail.com");

  const handleEmailChange = (event) => {
    setDeliveryEmail(event.target.value);
  };
  

  function handleDelivery() {
      
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const data = {};
    data["recipientEmail"] = deliveryEmail;
    data["editorEmail"] = userInfo.email;

    try {
      axios.post(SERVER_URL + `api/ST1010/cases/${uuid}/delivery/`, data, config).then(function (response) {
        setDeliverySuccess(true);
        setOpenDeliveryDialog(false);
      });
    } catch (error) {
      setDeliveryError(error.response && error.response.data.Detail ? error.response.data.Detail : error.message);
      console.log(deliveryError)
    }
  }

  return (
    <Dialog
      open={openDeliveryDialog}
      onClose={handleCloseDeliveryDialog}
      aria-labelledby="delivery-dialog-title"
      aria-describedby="delivery-dialog-description"
    >
      <DialogTitle className={classes.dialogHeader} id="delivery-dialog-title">
        <Typography className={classes.dialogTitle}>Отправка заключения</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.dialogWarning} id="Dialog-description-id">
          <Typography component={"span"} className={classes.dialogSubTitle}>
            Внимание!
          </Typography>
          <br />
          Заключение будет отослано по адресу указанному ниже, измените почту для смены реципиента. Ваша личная почта
          (профиль) будет указана для обратной связи реципиенту.
        </DialogContentText>
        <TextField fullWidth value={deliveryEmail} onChange={handleEmailChange} />
      </DialogContent>
      
      <DialogActions>
        <Button onClick={handleCloseDeliveryDialog} variant="outlined" color="primary">
          Отмена
        </Button>
        <Button onClick={handleDelivery} variant="outlined" color="primary" autoFocus>
          Принять
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogDelivery;
