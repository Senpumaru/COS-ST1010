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
  icons: {
    padding: 2,
    fontSize: "2rem",
  },
});

function CaseArchive({ history, match }) {
  /*** Material UI Styles ***/
  const classes = useRowStyles();

  /*** Local States ***/
  const [loadingArchive, setLoadingArchive] = useState(true);
  const [cases, setCases] = useState("");

  useEffect(() => {
    setTimeout(() => {
      getCaseArchive();
    }, 2000);
  }, []);

  const getCaseArchive = async () => {
    const response = await axios
      .get(
        `/api/ST1010/cases/${match.params.code}/${match.params.number}/archive/`
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
    window.open(`/api/ST1010/cases/${props}/pdf/`);
  };

  function Versions() {
    
      return (
        cases.map((parameter) => 
        <React.Fragment>
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
                        `http://127.0.0.1:8000/api/ST1010/cases/${parameter.uuid}/pdf/`
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
    }
  

  return (
    <React.Fragment>
      <Box p={2}>
        <Typography>
          Архивы кейса: {match.params.code}-{match.params.number}
        </Typography>
        {loadingArchive && <Loader></Loader>}
        <Grid container>{Versions()}</Grid>
      </Box>
    </React.Fragment>
  );
}

export default CaseArchive;
