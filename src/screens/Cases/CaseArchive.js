import { Box, Button, Card, CardContent, Grid, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import DialogDelivery from "../../components/Dialogs/DialogDelivery";
const useRowStyles = makeStyles({
  screenTitle: {
    fontSize: 20,
    fontWeight: 600,
  },
  tabSubTitle: {
    paddingLeft: 12,
    fontWeight: 600,
    fontSize: "1.2rem",
    backgroundColor: "#e0e0e0",
  },
  tabText: {
    fontWeight: 400,
    fontSize: "1.0rem",
    color: "#424242",
  },
  icons: {
    padding: 2,
    fontSize: "2rem",
  },
});

const SERVER_URL = process.env.REACT_APP_API_SERVER;

function CaseArchive({ history, match }) {

  /*** Material UI Styles ***/
  const classes = useRowStyles();

  /*** Redux States ***/
  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;

  /*** Local States ***/
  const [loadingArchive, setLoadingArchive] = useState(true);
  const [cases, setCases] = useState([]);
  console.log(cases);

  // Axios GET Request (CASE ARCHIVE)
  const getCaseArchive = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const axiosDelivery = async () => {
      // Try
      try {
        const response = await axios.get(
          SERVER_URL + `api/ST1010/cases/${match.params.code}/${match.params.number}/versions/`,
          config
        );
        setLoadingArchive(false);
        setCases(response.data);
        // Catch
      } catch (error) {
        error = error;
        setDeliveryError(true);
      }
    };
    axiosDelivery();
  };

  /** Report PDF **/
  const handleCasePDF = (uuid) => {
    window.open(SERVER_URL + `api/ST1010/cases/${uuid}/pdf/`);
  };

  /** Report Delivery **/
  const [openDeliveryDialog, setOpenDeliveryDialog] = useState(false);
  const [deliverySuccess, setDeliverySuccess] = useState(false);
  const [deliveryError, setDeliveryError] = useState(false);

  // Open Dialogue
  const handleOpenDeliveryDialog = () => {
    setOpenDeliveryDialog(true);
  };

  useEffect(async () => {
    setLoadingArchive(true);
    setTimeout(() => {
      getCaseArchive();
    }, 2000);
    setDeliverySuccess(false);
  }, [deliverySuccess]);

  return (
    <React.Fragment>
      <Box p={2}>
        <Typography className={classes.screenTitle}>
          Архивы кейса: {match.params.code}-{match.params.number}
        </Typography>
        {loadingArchive && <Loader></Loader>}
        <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={2}>
          {cases?.length >= 1 &&
            cases?.map((parameter) => (
              <React.Fragment key={parameter.version}>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
                  item
                  md={12}
                  sm={12}
                  xs={12}
                  spacing={1}
                >
                  <Card>
                    <CardContent>
                      <Typography className={classes.tabSubTitle}>Версия: {parameter.version.toFixed(2)}</Typography>
                      <Grid container direction="column" justify="flex-start" alignItems="stretch" item xs={6}>
                        <div style={{ display: "flex", alignItems: "baseline" }}>
                          <Typography className={classes.tabText}>Дата оформления отчета:</Typography>
                          <Typography style={{ marginLeft: 10 }}>{parameter.date_of_report} </Typography>
                        </div>
                      </Grid>
                      <Grid container direction="row" justify="space-between" alignItems="flex-start" item xs={12}>
                        {parameter.case_editor ? (
                          <React.Fragment>
                            <Grid item>
                              PDF версия:
                              <IconButton className={classes.icons} onClick={() => handleCasePDF(parameter.uuid)}>
                                <Tooltip title="PDF отчет" aria-label="PDF">
                                  <PictureAsPdfIcon />
                                </Tooltip>
                              </IconButton>
                            </Grid>
                            {parameter.case_editor.id === userInfo.id && parameter.version_state === "Verified" ? (
                              <React.Fragment>
                                <Button variant="contained" color="primary" onClick={() => handleOpenDeliveryDialog()}>
                                  Отправить отчет
                                </Button>
                              </React.Fragment>
                            ) : (
                              <Alert severity="info">Отправка недоступна</Alert>
                            )}
                          </React.Fragment>
                        ) : (
                          <Typography>Отчет недоступен</Typography>
                        )}
                      </Grid>
                      <Typography className={classes.tabSubTitle}>История:</Typography>
                      <Grid container direction="row" justify="space-between" alignItems="flex-start" item xs={12}>
                        {parameter.case_deliveries?.map((parameter) => (
                          <React.Fragment key={parameter.id}>
                            <Grid container>
                              <Grid item sm={4} xs={12}>
                                Отправлено: {parameter.date_of_delivery}
                              </Grid>
                              <Grid item sm={4} xs={12}>
                                Кому: {parameter.email_recipient}
                              </Grid>
                            </Grid>
                          </React.Fragment>
                        ))}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </React.Fragment>
            ))}
        </Grid>

        <DialogDelivery
          openDeliveryDialog={openDeliveryDialog}
          setOpenDeliveryDialog={setOpenDeliveryDialog}
          setDeliverySuccess={setDeliverySuccess}
          deliveryError={deliveryError}
          setDeliveryError={setDeliveryError}
          // Data
          number={match.params.number}
          code={match.params.code}

        />
      </Box>
    </React.Fragment>
  );
}

export default CaseArchive;
