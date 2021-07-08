import { Box, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../components/Loader";
import Filters from "./TableFilters";
import RowExpansion from "./TableRow";

/*** Material UI Styles ***/
const useStyles = makeStyles((theme) => ({
  modalForm: {
    overflow: "scroll",
  },
  icons: {
    fontSize: "2px",
  },
  table: {
    minWidth: 650,
    paddingTop: 2,
  },
  tableCases: {
    padding: 12,
  },
  tableHead: {
    backgroundColor: "#F2AA4CFF",
    color: "#101820FF",
  },
}));

function CaseTable() {
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

  return (
    <React.Fragment>
      <Box mt={2} mb={2}>
        <Filters />

        {cases?.results && (
          <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead className={classes.tableHead}>
                <TableRow>
                  <TableCell />
                  <TableCell padding="none" align="left">
                    Дата регистрации
                  </TableCell>
                  <TableCell padding="none" align="left">
                    Код
                  </TableCell>
                  <TableCell padding="none" align="left">
                    Дата заключения
                  </TableCell>

                  <TableCell
                    style={{
                      width: 200,
                      wordWrap: "break-word",
                    }}
                    padding="none"
                    align="left"
                  >
                    Интрепретация
                  </TableCell>
                  <TableCell padding="none" align="left">
                    Действия
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cases?.results?.map((row) => (
                  <RowExpansion key={row.uuid} row={row} />
                ))}
              </TableBody>
            </Table>
            {cases.results.length === 0 && (
              <Typography align="center">Нет данных</Typography>
            )}
          </TableContainer>
        )}
      </Box>
      {loading && <Loader>Загрузка кейсов...</Loader>}
      {error && <Alert severity="error">{error}</Alert>}
    </React.Fragment>
  );
}

export default CaseTable;
