import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import Loader from "../../components/Loader";

const useRowStyles = makeStyles({
  screenTitle: {
    fontSize: 20,
    fontWeight: 600,
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

  /*** Local States ***/
  const [loadingArchive, setLoadingArchive] = useState(true);
  const [cases, setCases] = useState([]);
 

  useEffect(() => {
    setTimeout(() => {
      getCaseArchive();
    }, 2000);
  }, []);

  const getCaseArchive = async () => {
    const response = await axios
      .get(
        SERVER_URL + `api/ST1010/cases/${match.params.code}/${match.params.number}/archive/`
      )
      .then((response) => {
        const allCases = response.data;
        setLoadingArchive(false);
        setCases(allCases);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  // PDF Report
  const handleCasePDF = (props) => {
    window.open(SERVER_URL + `api/ST1010/cases/${props}/pdf/`);
  };

  function Versions() {
    if (cases.length >= 1) {
      return (
        cases?.map((parameter) => 
        <React.Fragment key={parameter.version}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
                  Версия: {parameter.version}
                </Grid>
                <Grid item xs={12}>
                  Дата оформления отчета: {parameter.date_of_report}
                </Grid>
                <Grid item xs={12}>
                  PDF версия:
                  <IconButton
                    className={classes.icons}
                    onClick={() =>
                      window.open(
                        SERVER_URL + `api/ST1010/cases/${parameter.uuid}/pdf/`
                      )
                    }
                  >
                    <Tooltip title="PDF отчет" aria-label="PDF">
                      <PictureAsPdfIcon />
                    </Tooltip>
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </React.Fragment>)
      );
    } else {
      return (<div></div>)
    }}
  

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
