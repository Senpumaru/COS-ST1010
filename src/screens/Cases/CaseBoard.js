import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Snackbar,
  Tab,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCases, statisticsCases } from "../../actions/Cases/CaseActions";
import CreationFormAccess from "../../components/Cases/Forms/CreationFormAccess";
import Statistics from "../../components/Cases/Statistics";
import CaseTable from "../../components/Cases/Tables/Public/Table";

/*** Material UI Styles ***/
const useStyles = makeStyles({
  appTitle: {
    fontSize: 20,
    fontWeight: 600,
    paddingTop: "1rem",
  },
});

function Dashboard() {
  /*** Material UI Styles ***/
  const classes = useStyles();

  /*** Redux States ***/
  const dispatch = useDispatch();

  const caseCreate = useSelector((state) => state.ST1010["caseCreate"]);
  const { successCreate } = caseCreate;

  const caseTransfer = useSelector((state) => state.ST1010["caseTransfer"]);
  const { successTransfer } = caseTransfer;

  const approvalUpdate = useSelector((state) => state.ST1010["approvalUpdate"]);
  const { successApproval } = approvalUpdate;

  const caseAddendum = useSelector((state) => state.ST1010["caseAddendum"]);
  const { successAddendum } = caseAddendum;

  const searchParameters = useSelector(
    (state) => state.ST1010["searchParameters"]
  );
  const { page, pageSize, sortColumn, filters } = searchParameters;

  /*** React Effects ***/
  // Tabs
  const [tabValue, setTabValue] = React.useState("Cases");

  const handleTabValue = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  /* Table Search */
  useEffect(() => {
    var dateRegGTE;
    if (filters.dateRegisterGTE === null) {
      dateRegGTE = filters.dateRegisterGTE;
    } else {
      dateRegGTE = filters.dateRegisterGTE.toISOString().split("T")[0];
    }
    dispatch(
      listCases(
        page,
        pageSize,
        sortColumn,
        dateRegGTE,
        filters.dateRegisterLTE.toISOString().split("T")[0],
        filters.institution
      )
    );
  }, [
    page,
    pageSize,
    sortColumn,
    filters,
    successCreate,
    successTransfer,
    successApproval,
    successAddendum,
  ]);

  /* Statistics */
  useEffect(() => {
    dispatch(statisticsCases());
  }, []);

  return (
    <React.Fragment>
      <Typography className={classes.appTitle}>ИГХ: ALK</Typography>
      <TabContext value={tabValue}>
        <TabList onChange={handleTabValue} aria-label="Menu">
          <Tab label="Кейсы" value="Cases" />
          <Tab label="Статистика" value="Statistics" />
          <Tab
            label={
              <Badge color="secondary" badgeContent={0}>
                Личный кабинет
              </Badge>
            }
            value="Cabinet"
          />
        </TabList>
        <TabPanel value="Cases">
          <CreationFormAccess />
          <CaseTable />
        </TabPanel>
        <TabPanel value="Statistics">
          <Statistics />
        </TabPanel>
        <TabPanel value="Cabinet">...</TabPanel>
      </TabContext>
    </React.Fragment>
  );
}

export default Dashboard;
