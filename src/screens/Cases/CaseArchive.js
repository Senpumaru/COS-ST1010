import { Box, Card, CardContent, Grid, IconButton, makeStyles, Tooltip, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";

const useRowStyles = makeStyles({
  screenTitle: {
    fontSize: 20,
    fontWeight: 600,
  },
  tabTitle: {
    fontWeight: 600,
    fontSize: "1.2rem",
    backgroundColor: "#F2AA4CFF",
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

  useEffect(() => {
    setTimeout(() => {
      getCaseArchive();
    }, 2000);
  }, []);

  // Axios GET Request (CASE ARCHIVE)
  const getCaseArchive = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const response = await axios
      .get(SERVER_URL + `api/ST1010/cases/${match.params.code}/${match.params.number}/versions/`, config)
      .then((response) => {
        const allCases = response.data;
        setLoadingArchive(false);
        setCases(allCases);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  // PDF Report
  const handleCasePDF = (uuid) => {
    window.open(SERVER_URL + `api/ST1010/cases/${uuid}/pdf/`);
  };

  console.log(cases)

  function Versions() {
    if (cases.length >= 1) {
      return cases?.map((parameter) => (
        <React.Fragment key={parameter.version}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.tabTitle}>Версия: {parameter.version.toFixed(2)}</Typography>
                  <Typography></Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography className={classes.tabText}>Дата оформления отчета:</Typography>
                  <Typography>{parameter.date_of_report}</Typography>
                </Grid>
                {parameter.case_editor ? (
                  <Grid item xs={12}>
                    PDF версия:
                    <IconButton className={classes.icons} onClick={() => handleCasePDF(parameter.uuid)}>
                      <Tooltip title="PDF отчет" aria-label="PDF">
                        <PictureAsPdfIcon />
                      </Tooltip>
                    </IconButton>
                  </Grid>
                ) : (
                  <Typography>Отчет недоступен</Typography>
                )}
              </Grid>
            </CardContent>
          </Card>
        </React.Fragment>
      ));
    } else {
      return <div></div>;
    }
  }

  return (
    <React.Fragment>
      <Box p={2}>
        <Typography className={classes.screenTitle}>
          Архивы кейса: {match.params.code}-{match.params.number}
        </Typography>
        {loadingArchive && <Loader></Loader>}
        <Grid container>{Versions()}</Grid>
      </Box>
    </React.Fragment>
  );
}

export default CaseArchive;
