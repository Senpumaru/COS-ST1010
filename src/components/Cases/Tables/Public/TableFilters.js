import DateFnsUtils from "@date-io/date-fns";
import { Box, Fade, FormControlLabel, Grid, MenuItem, Switch } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import Pagination from "@material-ui/lab/Pagination";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchFilterDateAcquisitionGTE,
  setSearchFilterDateAcquisitionLTE,
  setSearchFilterinstitution,
  setSearchPage,
  setSearchPageSize,
  setSearchSort,
} from "../../../../actions/Cases/SearchActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    display: "flex",
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const INSTITUTION_CHOICES = [
  {
    value: "",
    label: "Все организации",
  },
  {
    value: 328112,
    label: "УЗ «Гомельский областной клинический онкологический диспансер»",
  },
  {
    value: 328044,
    label: "УЗ «Витебский областной клинический онкологический диспансер»",
  },
  {
    value: 328045,
    label: "УЗ «Гродненская университетская клиника»",
  },
  {
    value: 328043,
    label: "УЗ «Могилёвский областной онкологический диспансер»",
  },

  {
    value: 327933,
    label: "УЗ «Минский городской клинический онкологический диспансер»",
  },
  {
    value: 327932,
    label: "РНПЦ ОМР им. Н.Н. Александрова",
  },
];

function TableFilters() {
  /*** Material UI Styles ***/
  const classes = useStyles();

  /*** Redux States ***/
  const dispatch = useDispatch();

  /* Get state using "Selector" from "State" */
  const searchParameters = useSelector((state) => state.ST1010["searchParameters"]);
  const { page, pageSize, sortColumn, filters } = searchParameters;

  const caseList = useSelector((state) => state.ST1010["caseList"]);
  const { error, loading, cases } = caseList;

  /*** Local States ***/
  /* Filtering */

  // Advanced filter button

  const [checkFilters, setCheckFilters] = useState(false);

  const handleFilters = () => {
    setCheckFilters((prev) => !prev);
  };

  // Date Picker
  const handleFilterDateRegisterGTE = (event) => {
    dispatch(setSearchFilterDateAcquisitionGTE(event));
  };
  const handleFilterDateRegisterLTE = (event) => {
    dispatch(setSearchFilterDateAcquisitionLTE(event));
  };

  const handleFilterinstitution = (event) => {
    dispatch(setSearchFilterinstitution(event.target.value));
  };

  /** Search System **/
  /* Pagination */
  const handleChangePage = (event, newPage) => {
    dispatch(setSearchPage(newPage));
  };
  /* Rows per Page */
  const handleChangeRowsPerPage = (event) => {
    dispatch(setSearchPageSize(parseInt(event.target.value, 10)));
  };
  /* Sorting & Ordering */
  const handleChangeSort = (event) => {
    dispatch(setSearchSort(event.target.value));
  };

  return (
    <React.Fragment>
      <Box pb={2}>
        <div hidden={checkFilters === false}>
          <Fade in={checkFilters === true} timeout={500}>
            <Grid justify="flex-start" alignItems="flex-start" container spacing={1}>
              <Grid item md={3} sm={4} xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                  <DatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="Дата получения (от)"
                    maxDate={filters.dateRegisterLTE}
                    maxDateMessage={"Неправильно выбрана дата"}
                    value={filters.dateRegisterGTE}
                    onChange={handleFilterDateRegisterGTE}
                    format="dd/MM/yyyy"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={3} sm={4} xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                  <DatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label="Дата получения (до)"
                    maxDate={new Date()}
                    value={filters.dateRegisterLTE}
                    onChange={handleFilterDateRegisterLTE}
                    format="dd/MM/yyyy"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={3} sm={4} xs={6}>
                <TextField
                  required
                  fullWidth
                  select
                  label="Institution choices"
                  id="institutionChoices-id"
                  value={filters.institution}
                  label="Организация"
                  variant="outlined"
                  onChange={handleFilterinstitution}
                >
                  {INSTITUTION_CHOICES.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Fade>
        </div>
      </Box>
      <Grid container justify="space-between" alignItems="flex-end" spacing={1}>
        <Grid item md={6} sm={6} xs={6}>
          <FormControlLabel
            control={
              <Switch
                checked={checkFilters}
                onChange={handleFilters}
                value={checkFilters}
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            }
            label="Фильтры"
            labelPlacement="start"
          />
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="PageSize-id">Размер</InputLabel>
            <Select
              align="left"
              labelId="PageSize-label"
              id="demo-simple-select"
              value={pageSize}
              onChange={handleChangeRowsPerPage}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={6} sm={6} xs={6}>
          <FormControl className={classes.formControl}>
            <InputLabel id="case-sorter-id">Сортировка</InputLabel>
            <Select
              labelId="Case-Sorter"
              id="Case-Sorter"
              value={sortColumn}
              onChange={handleChangeSort}
              label="Сортировка"
            >
              <MenuItem value="date_of_acquisition">
                <em>По умолчанию</em>
              </MenuItem>
              <MenuItem value={"date_of_acquisition"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  Дата получения
                  <ArrowUpwardIcon fontSize="small" />
                </div>
              </MenuItem>
              <MenuItem value={"-date_of_acquisition"}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  Дата получения
                  <ArrowDownwardIcon fontSize="small" />
                </div>
              </MenuItem>

              <MenuItem value={"institution_code"}>
                Организация
                <ArrowUpwardIcon fontSize="small" />
              </MenuItem>
              <MenuItem value={"-institution_code"}>
                Организация
                <ArrowDownwardIcon fontSize="small" />
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={6} sm={6} xs={6}>
          <Pagination
            align="right"
            count={cases && parseInt(Math.ceil(cases.count / pageSize))}
            page={page}
            onChange={handleChangePage}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TableFilters;
