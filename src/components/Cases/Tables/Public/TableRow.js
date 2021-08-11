import { Grid, IconButton, TableCell, Tooltip } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PriorityHighIcon from "@material-ui/icons/PriorityHigh";
import RateReviewIcon from "@material-ui/icons/RateReview";
import SyncIcon from "@material-ui/icons/Sync";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DialogAddendum from "../../../Dialogs/DialogAddendum";
import DialogApproval from "../../../Dialogs/DialogApproval";
import DialogTransfer from "../../../Dialogs/DialogTransfer";
import Extension from "./Row/Extension";

/*** Material UI Styles ***/
const useRowStyles = makeStyles({
  tableRow: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableCell: {
    padding: 2,
  },
  tableButton: {
    padding: 0,
    color: "#424242",
  },
  icons: {
    padding: 2,
    fontSize: "2rem",
    color: "#424242",
  },
});

function RowExpansion(props) {
  const { row } = props;

  /*** Material UI Styles ***/
  const classes = useRowStyles();

  /*** Redux States ***/
  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;

  /*** Row components ***/
  /* Row Expansion */

  // Local State
  const [openRow, setOpenRow] = useState(false);

  const caseExpand = (event) => {
    setOpenRow(!openRow);
  };

  /*** Actions ***/
  /* Editing */
  // Editor
  var editorExists = false;
  if (row?.case_editor) {
    editorExists = userInfo.id === row?.case_editor?.id;
  } else {
    editorExists = false;
  }
  // Access
  var editingAction = false;

  if (row?.version_state === "In-progress") {
    if (userInfo["credentials"]["pathologist"] === true && editorExists === true && approvalsTrue != true) {
      editingAction = true;
    } else if (
      (userInfo.id === row?.case_creator?.id || userInfo.id === row?.case_assistant?.id) &&
      row?.clinical_interpretation === null
    ) {
      editingAction = true;
    } else if (
      userInfo["credentials"]["clinician"] === true &&
      userInfo.id === row?.case_creator?.id &&
      row?.case_assistant?.id === null
    ) {
      editingAction = true;
    } else {
      editingAction = false;
    }
  } else {
    editingAction = false;
  }

  /** Case Approval **/
  // Access
  var approvalsTrue = false;

  if (row.case_approvals.length > 0) {
    if (row.case_approvals) {
      approvalsTrue = row?.case_approvals
        ?.map((a) => a.approval)
        .every(function (e) {
          return e === true;
        });
    } else {
      approvalsTrue = false;
    }
  }
  // State
  const [openApprovalDialogue, setOpenApprovalDialogue] = useState(false);
  // Open Dialogue
  const handleOpenApproveDialogue = () => {
    setOpenApprovalDialogue(true);
  };

  /** Case Transfer **/
  // State
  const [openTransferDialog, setOpenTransferDialog] = useState(false);
  // Open Dialogue
  const handleOpenTransferDialog = () => {
    setOpenTransferDialog(true);
  };
  // Snackbar

  /** Case Addendum **/
  // State
  const [openAddendumDialog, setOpenAddendumDialog] = useState(false);
  // Open Dialogue
  const handleOpenAddendumDialog = () => {
    setOpenAddendumDialog(true);
  };

  return (
    <React.Fragment>
      <TableRow hover className={classes.tableCell} className={classes.tableRow} id={row.uuid}>
        <TableCell className={classes.tableCell}>
          <IconButton aria-label="expand row" size="small" onClick={caseExpand}>
            {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell className={classes.tableCell} align="left">
          {row.date_of_acquisition}
        </TableCell>
        <TableCell className={classes.tableCell} align="left">
          {row.case_code}
        </TableCell>
        <TableCell className={classes.tableCell} align="left">
          {row.date_of_report}
        </TableCell>
        <TableCell className={classes.tableCell} align="left">
          {row.clinical_interpretation}
        </TableCell>
        {row ? (
          <TableCell className={classes.tableCell} style={{ width: "20%" }} align="left">
            <Grid container direction="row" justify="flex-end" alignItems="flex-end" spacing={0}>
            <Grid item>
                {row.case_editor === null && (
                  <Tooltip title="Не указан патолог" aria-label="editor">
                    <HelpOutlineIcon className={classes.tableButton} />
                  </Tooltip>
                )}
              </Grid>
              <Grid item>
                {row?.case_approvals.length === 0 && (
                  <Tooltip title="Нет консультантов" aria-label="consultants">
                    <HelpOutlineIcon className={classes.tableButton} />
                  </Tooltip>
                )}
              </Grid>

              <Grid item>
                {row.case_approvals.map((a) => a.consultant).includes(userInfo.id) &&
                  row.clinical_interpretation != null &&
                  row.version_state === "In-progress" && (
                    <IconButton className={classes.tableButton} onClick={() => handleOpenApproveDialogue()}>
                      <Tooltip title="Утверждение" aria-label="transfer">
                        <PriorityHighIcon className={classes.icons} />
                      </Tooltip>
                    </IconButton>
                  )}
              </Grid>

              {
                // Objective: CASE Approval
                // Rule: CASE APPROVALS exist
                row.case_approvals && (
                  <DialogApproval
                    openApprovalDialogue={openApprovalDialogue}
                    setOpenApprovalDialogue={setOpenApprovalDialogue}
                    approvals={row.case_approvals}
                  />
                )
              }

              <Grid item>
                {userInfo["credentials"]["registrar"] && row.case_creator ? (
                  row.case_creator["ST1010_Permission"]["clinician"] &&
                  row?.case_assistant === null && (
                    <IconButton className={classes.tableButton} onClick={handleOpenTransferDialog}>
                      <Tooltip title="Трансфер кейса" aria-label="transfer">
                        <SyncIcon className={classes.icons} />
                      </Tooltip>
                    </IconButton>
                  )
                ) : (
                  <div></div>
                )}
              </Grid>

              {
                // Objective: CASE Transfer
                // Rule: CASE CREATOR exists
                row.case_creator && (
                  <DialogTransfer
                    openTransferDialog={openTransferDialog}
                    setOpenTransferDialog={setOpenTransferDialog}
                    uuid={row["uuid"]}
                    CaseCreatorLN={row.case_creator["last_name"]}
                    CaseCreatorFN={row.case_creator["first_name"]}
                  />
                )
              }

              <Grid item>
                {editingAction && (
                  <IconButton className={classes.tableButton} component={Link} to={`/ST1010/Case/${row.uuid}`}>
                    <Tooltip title="Обновить" aria-label="edit">
                      <EditIcon className={classes.icons} />
                    </Tooltip>
                  </IconButton>
                )}
              </Grid>
              <Grid item>
                {row.clinical_interpretation != null && row.case_consultants.length > 0 && (
                  <IconButton className={classes.tableButton} component={Link} to={`/ST1010/Case/Review/${row.uuid}`}>
                    <Tooltip title="Обзор кейса" aria-label="edit">
                      <ListAltIcon className={classes.icons} />
                    </Tooltip>
                  </IconButton>
                )}
              </Grid>

              {
                // Objective: CASE Addendum
                // Rule #1: CASE EDITOR exists
                // Rule #2: CASE Verified
                row.version_state === "Verified" && editorExists && (
                  <Grid item>
                    <IconButton className={classes.tableButton} onClick={handleOpenAddendumDialog}>
                      <Tooltip title="Поправка" aria-label="modify">
                        <RateReviewIcon className={classes.icons} />
                      </Tooltip>
                    </IconButton>
                    <DialogAddendum
                      openAddendumDialog={openAddendumDialog}
                      setOpenAddendumDialog={setOpenAddendumDialog}
                      // Data
                      uuid={row.uuid}
                    />
                  </Grid>
                )
              }
              <Grid item>
                <IconButton
                  className={classes.tableButton}
                  component={Link}
                  to={`/ST1010/Case/${row.institution_code}/${row.order_number}/Archive/`}
                >
                  <Tooltip title="Архивы" aria-label="edit">
                    <FindInPageIcon className={classes.icons} />
                  </Tooltip>
                </IconButton>
              </Grid>
            </Grid>
          </TableCell>
        ) : (
          <TableCell></TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell className={classes.tableCell} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={openRow} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Extension row={row} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default RowExpansion;
