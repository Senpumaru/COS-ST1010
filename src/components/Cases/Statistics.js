import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import { Box, Grid, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
  paperStats: {
    margin: 2,
  },
  paperHeader: {
    fontSize: "1.2rem",
    fontWeight: 600,
  },
});

const INSTITUTION_CODES = {
  328112: "УЗ «Гомельский областной клинический онкологический диспансер»",
  328044: "УЗ «Витебский областной клинический онкологический диспансер»",
  328045: "УЗ «Гродненская университетская клиника»",
  328043: "УЗ «Могилёвский областной онкологический диспансер»",
  327933: "УЗ «Минский городской клинический онкологический диспансер»",
  327932: "РНПЦ ОМР им. Н.Н. Александрова",
};

function Statistics() {
  const classes = useStyles();

  const caseStatistics = useSelector((state) => state.ST1010["caseStatistics"]);
  const { errorStats, loadingStats, caseStats } = caseStatistics;

  console.log(caseStats["statistics"]);

  return (
    <React.Fragment>
      <Grid alignItems="center" container spacing={2}>
        <Grid container item xs={6}>
          {loadingStats ? (
            <Alert severity="info">Loading progress...</Alert>
          ) : errorStats ? (
            <Alert severity="error">{errorStats}</Alert>
          ) : (
            <Paper className={classes.paperStats}>
              <Box p={2}>
                <Typography className={classes.paperHeader}>
                  Статус кейсов
                </Typography>
                <Grid item xs={12}>
                  Всего кейсов: {caseStats.cases_count}
                </Grid>
                <Grid item xs={12}>
                  Кейсы требующие трансфер (от клиницистов):{" "}
                  <strong>{caseStats.cases_transfer_required}</strong>
                </Grid>
                <Grid item xs={12}>
                  Кейсы без десигнация:{" "}
                  <strong>{caseStats.cases_in_work}</strong>
                </Grid>
                <Grid item xs={12}>
                  Кейсы в работе: <strong>{caseStats.cases_in_work}</strong>
                </Grid>
                <Grid item xs={12}>
                  Кейсы завершенные и утвержденные: {caseStats.cases_done}
                </Grid>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <h4>All Time</h4>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                  <TableCell>
                      ALK-Negative
                  </TableCell>
                  <TableCell>
                      ALK-Negative
                  </TableCell>
                  <TableCell>
                      ALK-Negative
                  </TableCell>
                  
                </TableRow>

            </TableHead>
            
            <TableBody>

            </TableBody>
            
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6}>
        <h4>Current Month</h4>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead></TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </React.Fragment>
  );
}

export default Statistics;
