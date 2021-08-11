import {
  Box,
  Button,
  Card,
  CardContent, Grid,
  makeStyles,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { caseDetailsAction } from "../../actions/Cases/CaseActions";
import DialogApproval from "../../components/Dialogs/DialogApproval";
import DialogReview from "../../components/Dialogs/DialogReview";
import Loader from "../../components/Loader";

const useStyles = makeStyles({
  screenTitle: {
    fontSize: 16,
    fontWeight: 600,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 600,
    backgroundColor: "#F2AA4CFF",
    paddingRight: "0.1rem",
    margin: "0.2rem",
  },
  cardWarning: {
    fontSize: 18,
    fontWeight: 600,

    paddingRight: "0.1rem",
    margin: "0.2rem",
  },
  formControl: {
    margin: 0,
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: 2,
  },
  dialogTitle: {
    fontSize: "1.2rem",
    backgroundColor: "#F2AA4CFF",
  },
  dialogWarning: {
    fontSize: "1.0rem",
    color: "#424242",
  },
});

function CaseReview({ history, match }) {
  /*** Material UI Styles ***/
  const classes = useStyles();

  /*** Redux States ***/
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;

  const caseDetails = useSelector((state) => state.ST1010["caseDetails"]);
  const { loadingDetails, errorDetails, instance } = caseDetails;

  const approvalUpdate = useSelector((state) => state.ST1010["approvalUpdate"]);
  const { loadingApproval, successApproval, errorApproval } = approvalUpdate;

  /** DETAILS **/
  useEffect(() => {
    dispatch(caseDetailsAction(match.params.id));
  }, [successApproval]);

  /** Case Approval **/
  // Check if case is approved already
  const [openApprovalDialogue, setOpenApprovalDialogue] = useState(false);

  const handleOpenApproveDialogue = () => {
    setOpenApprovalDialogue(true);
  };

  /** Review **/
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewError, setReviewError] = useState(false);

  function ReviewChoice() {
    if (userInfo["credentials"]["pathologist"] === true && instance?.case_approvals?.length > 0) {
      const allApprovals = instance.case_approvals;
      if (
        allApprovals
          ?.map((a) => a.approval)
          .every(function (e) {
            return e === true;
          }) === true
      ) {
        if (reviewSuccess == true) {
          return <Typography>Отчет оформлен</Typography>;
        } else {
          return (
            <Button onClick={handleOpenReviewDialog} color="secondary" variant="contained">
              Создать Отчет
            </Button>
          );
        }
      } else {
        return (
          <Typography className={classes.cardWarning}>
            {"Отчет не может быть создан, пока все консультанты не одобрили кейс."}
          </Typography>
        );
      }
    } else {
      return <div></div>;
    }
  }

  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  // Action
  const handleOpenReviewDialog = () => {
    setOpenReviewDialog(true);
  };

  return (
    <React.Fragment>
      <Box p={1} pt={2}>
        <Grid container direction="row" justify="flex-start" alignItems="flex-start">
          <Grid item md={12} sm={12} xs={12}>
            <Grid item xs={12}>
              <Typography className={classes.screenTitle}>Обзор кейса: {instance.case_code}</Typography>
            </Grid>
            {loadingDetails ? (
              <Loader>Загрузка...</Loader>
            ) : (
              <Card>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography className={classes.cardTitle}>Версия кейса: {instance.version}</Typography>
                    </Grid>
                    <Grid container item spacing={1}>
                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Дата получения: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography> {instance.date_of_acquisition}</Typography>
                      </Grid>

                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Организация: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography> {instance.institution}</Typography>
                      </Grid>

                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Диагноз: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography> {instance.diagnosis}</Typography>
                      </Grid>

                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Микроскопическое описание: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography> {instance.microscopic_description}</Typography>
                      </Grid>

                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Гистологическое описание: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography> {instance.histological_description}</Typography>
                      </Grid>

                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Паттерн окраски: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography> {instance.staining_pattern}</Typography>
                      </Grid>

                      <Grid item md={4} sm={4} xs={12}>
                        <Typography>Клиническая интерпретация: </Typography>
                      </Grid>
                      <Grid item md={8} sm={8} xs={12}>
                        <Typography> {instance.clinical_interpretation}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <ReviewChoice />
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item md={12} sm={12} xs={12}>
            <Grid item xs={12}>
              <Typography className={classes.screenTitle}>Консультанты</Typography>
            </Grid>
            {loadingDetails || loadingApproval ? (
              <Loader>Загрузка...</Loader>
            ) : (
              <Card>
                <CardContent>
                  <Grid container>
                    {instance?.case_consultants?.length > 0 &&
                      instance.case_consultants?.map((item, index) => {
                        const approval = instance?.case_approvals?.find((x) => x.consultant === item["id"])["approval"];
                        return (
                          <Grid item md={4} sm={6} xs={12} key={index}>
                            <Typography className={classes.cardTitle}>
                              {item["last_name"] + " " + item["first_name"]}
                            </Typography>
                            Решение:{" "}
                            <div>
                              {(() => {
                                switch (approval) {
                                  case true:
                                    return <Typography>Утвержден</Typography>;
                                  case false:
                                    return <Typography>Не утвержден</Typography>;
                                  default:
                                    return <Typography>Нет ответа</Typography>;
                                }
                              })()}
                            </div>
                            {userInfo["id"] == item["id"] && userInfo["credentials"]["consultant"] === true && (
                              <Button onClick={() => handleOpenApproveDialogue()} color="secondary" variant="contained">
                                Ответ
                              </Button>
                            )}
                          </Grid>
                        );
                      })}

                    <DialogReview
                      openReviewDialog={openReviewDialog}
                      setOpenReviewDialog={setOpenReviewDialog}
                      reviewSuccess={reviewSuccess}
                      setReviewSuccess={setReviewSuccess}
                      setReviewError={setReviewError}
                      instance={instance}
                    />
                    {
                      // Objective: CASE Approval
                      // Rule: CASE APPROVALS exists
                      instance.case_approvals && (
                        <DialogApproval
                          openApprovalDialogue={openApprovalDialogue}
                          setOpenApprovalDialogue={setOpenApprovalDialogue}
                          approvals={instance.case_approvals}
                        />
                      )
                    }
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default CaseReview;
