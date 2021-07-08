import DateFnsUtils from '@date-io/date-fns';
import { CardHeader, GridList, makeStyles, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Portal from '@material-ui/core/Portal';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import {
    DatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCase } from '../../../../actions/Services/ST1010/CaseActions';




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
]

function FormCreation() {
    /*** Redux States ***/
    const dispatch = useDispatch()

    const caseCreate = useSelector(state => state.ST1010["caseCreate"])
    const { error, loading, success, instance } = caseCreate


    /*** Local States ***/

    const [personalNumber, setPersonalNumber] = useState('')
    const [dateRegistration, setDateRegistration] = useState(new Date())
    const [institution, setInstitution] = useState("")

    const [blockNumberList, setBlockNumberList] = useState([{ blockNumber: "" }])
    const [blockAmount, setBlockAmount] = useState("")
    const [slideNumberList, setSlideNumberList] = useState([{ slideNumber: "" }])
    const [slideAmount, setSlideAmount] = useState("")
    const [diagnosis, setDiagnosis] = useState("")
    const [doctorSender, setDoctorSender] = useState("")

    /** Create Case System (CRUD) **/
    const [show, setShow] = React.useState(false);
    const container = React.useRef(null);

    const handleShowCaseForm = () => {
        setShow(!show);

    };
    // Add Block numbers
    const handleBlockListChange = (event, index) => {

        const { name, value } = event.target;

        const list = [...blockNumberList];
        const re = /^[0-9-/\b]+$/;
        if (value === '' || re.test(value)) {
            list[index][name] = value;
        }
        setBlockNumberList(list);
    };
    const handleAddBlock = () => {
        setBlockNumberList([...blockNumberList, { blockNumber: "" }]);
    };
    const handleRemoveBlock = index => {
        const list = [...blockNumberList];
        list.splice(index, 1);
        setBlockNumberList(list);
    };

    // Add Slide numbers
    const handleSlideListChange = (event, index) => {
        const { name, value } = event.target;
        const list = [...slideNumberList];
        list[index][name] = value;
        setSlideNumberList(list);
    };
    const handleAddSlide = () => {
        setSlideNumberList([...slideNumberList, { slideNumber: "" }]);
    };
    const handleRemoveSlide = index => {
        const list = [...slideNumberList];
        list.splice(index, 1);
        setSlideNumberList(list);
    };

    const handleSubmit = (event) => {

        event.preventDefault()
        dispatch(createCase({
            "personal_number": personalNumber,
            "date_of_registration": dateRegistration.toISOString().split('T')[0],
            "institution_code": institution,
            "block_number": blockNumberList,
            "block_amount": blockAmount,
            "slide_number": slideNumberList,
            "slide_amount": slideAmount,
            "diagnosis": diagnosis,
            "doctor_sender": doctorSender,
        }))
    }

    // Field validation
    const setIdentifier = event => {
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
            setPersonalNumber(event.target.value)
        }
    }

    const setBlockAmountValidator = event => {
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
            setBlockAmount(event.target.value)
        }
    }

    const setSlideAmountValidator = event => {
        const re = /^[0-9\b]+$/;

        if (event.target.value === '' || re.test(event.target.value)) {
            setSlideAmount(event.target.value)
        }
    }


    return (
        <div>
            <Button color="primary" variant="outlined" type="button" onClick={handleShowCaseForm}>
                {show ? 'Close Form' : 'Create Case'}
            </Button>
            <div>

                {show ? (
                    <Portal container={container.current}>
                        <Card>
                            <form onSubmit={handleSubmit} autoComplete="off">

                                <CardContent>
                                    <Grid container spacing={2} direction="column">
                                        <Grid item xs={12} container>
                                            <Grid item xs={2}>
                                                In Development
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <hr></hr>
                                    <Grid item xs={12} container spacing={2}>
                                        <Grid item xs={8} container spacing={2}>
                                            <Grid item md={3} xs={12}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <DatePicker
                                                        autoOk
                                                        variant="inline"
                                                        fullWidth
                                                        inputVariant="outlined"
                                                        label="Registration Date"
                                                        value={dateRegistration}
                                                        onChange={setDateRegistration}
                                                        format="yyyy-MM-dd"
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                            <Grid item md={5} xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    select
                                                    label="Institution choices"
                                                    id="institutionChoices-id"
                                                    value={institution}
                                                    helperText={`Code: ${institution}`}
                                                    label="Institution"
                                                    variant="outlined"

                                                    onChange={(event) => setInstitution(event.target.value)}
                                                >
                                                    {INSTITUTION_CHOICES.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="personalNumber"
                                                    // helperText="Please specify the case number (without the institution code)"
                                                    label="Identifier"
                                                    name="identifier"
                                                    value={personalNumber}
                                                    inputProps={{
                                                        maxLength: 4
                                                    }}
                                                    color="primary"
                                                    variant="outlined"
                                                    onChange={setIdentifier}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    helperText="Please specify the reported diagnosis"
                                                    label=" Diagnosis"
                                                    name="diagnosis"
                                                    value={diagnosis}
                                                    color="primary"
                                                    variant="outlined"
                                                    onChange={(event) => setDiagnosis(event.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={6} s={12} xs={12}>
                                                <TextField

                                                    fullWidth
                                                    helperText=""
                                                    label="Doctor (Sender)"
                                                    name="doctorSender"
                                                    value={doctorSender}
                                                    color="primary"
                                                    variant="outlined"
                                                    onChange={(event) => setDoctorSender(event.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid justify="flex-start" item xs={4} container spacing={2}>
                                            <Grid justify="flex-start" item xs={12} container spacing={2}>
                                                <Grid item md={6} xs={6}>
                                                    Block numbers
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    Slide numbers
                                                </Grid>
                                                <Grid justify="flex-start" item md={6} xs={6}>
                                                    {blockNumberList.map((x, index) => {
                                                        return (
                                                            <React.Fragment>
                                                                <TextField


                                                                    className="ml10"
                                                                    name="blockNumber"
                                                                    value={x.blockNumber}
                                                                    onChange={event => handleBlockListChange(event, index)}

                                                                />
                                                                <div className="btn-box">
                                                                    {blockNumberList.length !== 1 && <Button className="mr10" onClick={() => handleRemoveBlock(index)}>Remove</Button>}
                                                                    {blockNumberList.length - 1 === index && <Button onClick={() => handleAddBlock(index)}>Add</Button>}
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </Grid>

                                                <Grid justify="flex-start" item md={6} xs={6}>
                                                    {slideNumberList.map((x, index) => {
                                                        return (
                                                            <React.Fragment>
                                                                <TextField
                                                                    required

                                                                    className="ml10"
                                                                    name="slideNumber"
                                                                    value={x.slideNumber}
                                                                    onChange={event => handleSlideListChange(event, index)}
                                                                />
                                                                <div className="btn-box">
                                                                    {slideNumberList.length !== 1 && <Button className="mr10" onClick={() => handleRemoveSlide(index)}>Remove</Button>}
                                                                    {slideNumberList.length - 1 === index && <Button onClick={() => handleAddSlide(index)}>Add</Button>}
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <TextField

                                                        fullWidth
                                                        helperText=""
                                                        label="Block #"
                                                        name="blockAmount"
                                                        value={blockAmount}
                                                        inputProps={{
                                                            maxLength: 2
                                                        }}
                                                        color="primary"
                                                        variant="outlined"
                                                        onChange={setBlockAmountValidator}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <TextField

                                                        fullWidth
                                                        helperText=""
                                                        label="Slide #"
                                                        name="slideAmount"
                                                        value={slideAmount}
                                                        inputProps={{
                                                            maxLength: 2
                                                        }}
                                                        color="primary"
                                                        variant="outlined"
                                                        onChange={setSlideAmountValidator}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                    </Grid>
                                    <hr></hr>

                                    {error && <Alert severity="error">{error}</Alert>}
                                    {loading && <Alert severity="info">Processing...</Alert>}
                                    {success && <Alert severity="success">Registration succesfull!</Alert>}

                                </CardContent>

                                <CardActions>
                                    <Button type='submit' variant="outlined" color='primary'>
                                        Submit
                                    </Button>

                                </CardActions>
                            </form>
                        </Card>

                    </Portal>
                ) : null}
            </div>
            <div ref={container} />
        </div >
    )
}

export default FormCreation;
