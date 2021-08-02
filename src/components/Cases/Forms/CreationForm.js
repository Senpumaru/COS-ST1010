import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import axios from "axios";
import ruLocale from "date-fns/locale/ru";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createCase } from "../../../actions/Cases/CaseActions";
import Loader from "../../../components/Loader";

const SERVER_URL = process.env.REACT_APP_API_SERVER;

const INSTITUTION_CHOICES = [
  {
    value: 328112,
    label: "УЗ «Гомельский областной клинический онкологический диспансер»",
  },
  {
    value: 328044,
    label: "УЗ «Витебский областной клинический онкологический диспансер»",
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

const useStyles = makeStyles({
  cardTitle: {
    fontSize: 14,
  },
});


function CreationForm() {
  const classes = useStyles();

  /*** Redux States ***/
  const dispatch = useDispatch();
  // Profile Information
  const userLogin = useSelector((state) => state.Profile["userLogin"]);
  const { userInfo } = userLogin;
  // Case Creation State
  const caseCreate = useSelector((state) => state.ST1010["caseCreate"]);
  const { errorCreate, loadingCreate, successCreate } = caseCreate;

  /*** React Hook Form ***/
  const defaultValues = {
    dateDispatch: null,
    dateAcquisition: null,
    institutionCode: "",
    diagnosis: "",
    caseEditor: "",
    caseSender: "",
    blockCodes: [{ blockCode: "" }],
    blockCount: 0,
    slideCodes: [{ slideCode: "" }],
    slideCount: 0,
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    register,
    reset,
  } = useForm({ mode: "onBlur", defaultValues });

  // Field Array
  const {
    fields: blockFields,
    append: blockAppend,
    remove: blockRemove,
  } = useFieldArray({ control, name: "blockCodes" });
  const {
    fields: slideFields,
    append: slideAppend,
    remove: slideRemove,
  } = useFieldArray({ control, name: "slideCodes" });

  // Validation
  const [orderNumber, setPersonalNumber] = useState("");
  const setOrderNumber = (event) => {
    const re = /^[0-9\b]+$/;

    if (event.target.value === "" || re.test(event.target.value)) {
      setPersonalNumber(event.target.value);
    }
  };

  /* Consultants Autocompletion choices */
  const [pathologistServerList, setPathologistServerList] = useState([]);
  const [consultantServerList, setConsultantServerList] = useState([]);
  // Selected values
  const [pathologistValue, setPathologistValue] = useState("");
  const [consultantsValues, setConsultantsValues] = useState([]);
  // Data Fetching
  useEffect(async () => {
    const fetchData = async () => {
      const pathologists = await axios(SERVER_URL + `api/ST1010/pathologists`);
      const consultants = await axios(SERVER_URL + `api/ST1010/consultants`);
      setPathologistServerList(pathologists.data.map(function (item) {return item.user}));
      setConsultantServerList(consultants.data.map(function (item) {return item.user}));
      
    };
    fetchData();
  }, []);

  /* Form submission */
  const [openAlert, setOpenAlert] = useState(true);

  const onSubmit = (data, event) => {
    setOpenAlert(true);
    data["orderNumber"] = orderNumber;
    if (data["caseEditor"]) {
      data["caseEditor"] = parseInt(data["caseEditor"]["id"]);
    } else {
      data["caseEditor"] = null;
    }
    data["caseConsultants"] = consultantsValues;
    if (data["caseConsultants"]) {
      data["caseConsultants"] = data["caseConsultants"].map((a) => a.id);
    } else {
      data["caseConsultants"] = [];
    }
    data["blockCodes"] = data["blockCodes"].map((a) => a.blockCode);
    data["slideCodes"] = data["slideCodes"].map((a) => a.slideCode);

    dispatch(createCase(data));
    setTimeout(() => {
      setOpenAlert(false);
    }, 3000);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <CardContent>
          <Typography
            className={classes.cardTitle}
            color="textSecondary"
            gutterBottom
          >
            <strong>Форма заполнения</strong>
          </Typography>
          <Grid
            container
            item
            direction={"row"}
            alignItems={"flex-start"}
            justify={"flex-start"}
          >
            <Grid container item xs={12} spacing={1}>
              <Grid item md={4} sm={4} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                  <Controller
                    name="dateDispatch"
                    control={control}
                    rules={{
                      required: "Укажите",
                    }}
                    render={({ field: { ref, ...rest } }) => (
                      <KeyboardDatePicker
                        {...rest}
                        fullWidth
                        animateYearScrolling
                        defaultChecked={false}
                        id="dateDispatch-id"
                        label="Дата направления"
                        format="dd/MM/yyyy"
                        maxDate={new Date()}
                        variant="inline"
                        inputVariant="outlined"
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    )}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={4} sm={4} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                  <Controller
                    name="dateAcquisition"
                    control={control}
                    rules={{
                      required: "Укажите",
                    }}
                    render={({ field: { ref, ...rest } }) => (
                      <KeyboardDatePicker
                        {...rest}
                        fullWidth
                        id="dateAcquisition-id"
                        label="Дата получения материала"
                        format="dd/MM/yyyy"
                        maxDate={new Date()}
                        variant="inline"
                        inputVariant="outlined"
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    )}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={10} sm={10} xs={12}>
                <Controller
                  name="institutionCode"
                  control={control}
                  rules={{
                    required: "Укажите организацию",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Организация"
                      variant="outlined"
                      error={errors.institutionCode ? true : false}
                      helperText={
                        errors?.institutionCode
                          ? errors.institutionCode.message
                          : `Code: ${field.value}`
                      }
                    >
                      {INSTITUTION_CHOICES.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item md={2} sm={2} xs={12}>
                <TextField
                  required
                  fullWidth
                  id="orderNumber-id"
                  label="ID"
                  name="orderNumber"
                  value={orderNumber}
                  inputProps={{
                    maxLength: 4,
                  }}
                  color="primary"
                  variant="outlined"
                  onChange={setOrderNumber}
                />
              </Grid>
              <Grid item md={12} sm={8} xs={12}>
                <Controller
                  name="diagnosis"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 200,
                      message: "Слишком много символов",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      inputProps={{ type: "text" }}
                      label="Диагноз"
                      variant="outlined"
                      error={errors.diagnosis ? true : false}
                      helperText={errors?.diagnosis && errors.diagnosis.message}
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <Controller
                  name="caseSender"
                  control={control}
                  rules={{
                    required: "Обязталеьное поле",
                    maxLength: {
                      value: 50,
                      message: "Слишком много символов",
                    },
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      inputProps={{ type: "text" }}
                      label="Направивший врач"
                      variant="outlined"
                      error={errors.caseSender ? true : false}
                      helperText={
                        errors?.caseSender && errors.caseSender.message
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item md={4} sm={6} xs={12}>
                <Controller
                  render={(props) => (
                    <Autocomplete
                      id="caseEditor-id"
                      disabled={userInfo["credentials"]["clinician"]}
                      options={pathologistServerList}
                      getOptionLabel={(option) =>
                        option.first_name + " " + option.last_name
                      }
                      renderOption={(option) =>
                        option.first_name + " " + option.last_name
                      }
                      // getOptionSelected={(option, value) =>
                      //   option.first_name === value.first_name
                      // }

                      filterSelectedOptions
                      // value={props.first_name} // value is passed by render from the Controller
                      onChange={(e, value) => setValue("caseEditor", value)} // instead here the docs said to do: onChange={e => props.onChange(e.target.checked)}
                      inputValue={pathologistValue}
                      onInputChange={(event, newPathologistValue) => {
                        setPathologistValue(newPathologistValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          {...params}
                          label="Укажите патолога"
                          helperText={
                            userInfo["credentials"]["clinician"]
                              ? "Вы не можете выбрать патолога"
                              : ""
                          }
                          name="caseEditor"
                          placeholder="Выбрать патолога"
                          variant="outlined"
                        />
                      )}
                    />
                  )}
                  control={control}
                  name="caseEditor"
                  // defaultValue={null} // this prevents the "controlled/uncontrolled change" error
                />
              </Grid>
              <Grid item md={4} sm={12} xs={12}>
                <Autocomplete
                  multiple
                  id="consultants-id"
                  disabled={userInfo["credentials"]["clinician"]}
                  options={consultantServerList}
                  getOptionLabel={(option) =>
                    option.first_name + " " + option.last_name
                  }
                  // getOptionSelected={(option, value) => option.first_name === value.first_name}
                  filterSelectedOptions
                  value={consultantsValues} // value is passed by render from the Controller
                  onChange={(event, value) => setConsultantsValues(value)} // instead here the docs said to do: onChange={e => props.onChange(e.target.checked)}
                  // inputValue={consultantValue}
                  // onInputChange={(event, newConsultantValue) => {
                  // setConsultantValue(newConsultantValue);
                  // }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Консультанты"
                      helperText={
                        userInfo["credentials"]["clinician"]
                          ? "Вы не можете выбрать консультантов"
                          : ""
                      }
                      name="consultants"
                      placeholder="Выбрать консультантов"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              
            </Grid>
          </Grid>
          <hr />
          <Grid
            container
            item
            direction={"row"}
            alignItems={"flex-start"}
            justify={"flex-start"}
            spacing={1}
          >
            <Grid container item xs={12}>
              <Grid item xs={6}>
                Блоки
              </Grid>
              <Grid item xs={6}>
                Слайды
              </Grid>
            </Grid>
            <Grid container item sm={6} xs={12} spacing={2}>
              {blockFields.map((item, index) => {
                return (
                  <Grid key={item.id} item xs={6}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Блок"
                          error={errors.blockCodes ? true : false}
                        />
                      )}
                      name={`blockCodes[${index}].blockCode`}
                      rules={{
                        
                      }}
                      control={control}
                      mode="onBlur"
                      defaultValue={item.blockCode}
                    />
                    {blockFields.length !== 1 && (
                      <Button type="button" onClick={() => blockRemove(index)}>
                        Удалить
                      </Button>
                    )}
                  </Grid>
                );
              })}
              <Grid container item xs={12} sm={12} xs={12}>
                <Grid item xs={6} sm={6} xs={6}>
                  <Button
                    fullWidth
                    type="button"
                    onClick={() => {
                      blockAppend({ blockCode: "" });
                    }}
                  >
                    Добавить блок
                  </Button>
                </Grid>
                <Grid item xs={4} sm={4} xs={4}>
                  <Controller
                    name="blockCount"
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                      pattern: {
                        value: /\d*/i,
                        message: "Только цифры",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        inputProps={{ min: 0, max: 20, type: "number" }}
                        label="Кол. блоков"
                        variant="outlined"
                        error={errors.blockCount ? true : false}
                        helperText={
                          errors?.blockCount && errors.blockCount.message
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={6} spacing={2}>
              {slideFields.map((item, index) => {
                return (
                  <Grid key={item.id} item xs={6}>
                    <Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Слайд"
                          error={errors.slideCodes ? true : false}
                        />
                      )}
                      rules={{
                      
                        pattern: {
                          value: /[0-9-/]*/i,
                          message: "Допустимы толкько цифры, -, /",
                        },
                      }}
                      name={`slideCodes[${index}].slideCode`}
                      control={control}
                      mode="onBlur"
                      defaultValue={item.slideCode}
                    />
                    {slideFields.length !== 1 && (
                      <Button type="button" onClick={() => slideRemove(index)}>
                        Удалить
                      </Button>
                    )}
                  </Grid>
                );
              })}
              <Grid container item xs={12} sm={12} xs={12}>
                <Grid item xs={6} sm={6} xs={6}>
                  <Button
                    fullWidth
                    type="button"
                    onClick={() => {
                      slideAppend({ slideCode: "" });
                    }}
                  >
                    Добавить слайд
                  </Button>
                </Grid>
                <Grid item xs={4} sm={4} xs={4}>
                  <Controller
                    name="slideCount"
                    control={control}
                    rules={{
                      required: "Обязательное поле",
                      pattern: {
                        value: /\d*/i,
                        message: "Incorrect pattern",
                      },
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        inputProps={{ min: 0, max: 30, type: "number" }}
                        label="Кол. слайдов"
                        variant="outlined"
                        error={errors.slideCount ? true : false}
                        helperText={
                          errors?.slideCount && errors.slideCount.message
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            fullWidth
            type="button"
            onClick={() => {
              reset(defaultValues);
              setPathologistValue("");
              setPersonalNumber("");
              setConsultantsValues([]);
            }}
            variant="contained"
            color="primary"
          >
            Очистить
          </Button>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Регистрировать
          </Button>
        </CardActions>
        <Collapse in={openAlert}>
          <Box p={1}>
            {loadingCreate ? (
              <Loader />
            ) : successCreate ? (
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenAlert(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                variant="filled"
                severity="success"
              >
                Регистрация успешна!
              </Alert>
            ) : (
              errorCreate && (
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  variant="filled"
                  severity="error"
                >
                  {errorCreate}
                </Alert>
              )
            )}
          </Box>
        </Collapse>
      </form>
    </Card>
  );
}

export default CreationForm;
