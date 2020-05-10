import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  Card,
  CardContent,
  CardActions,
  FormControl,
} from '@material-ui/core';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import Table from "./EPES-components/EPEStable.js";
import Loading from './Loading';

import { fetchEmployee, fetchAssignment } from "../actions/fetch-actions";

import { assignmentInitial, requirementInitial } from '../constants';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = {
  formControl: {
  },
  etypeSelect: {
    width: '70%',
    marginBottom: '10px'
  },
  reqTitle: {
    width: '80%',
  },
  reqPercent: {
    marginLeft: '8px',
    width: '10%',
  },
  reqRow: {
    marginBottom: '8px'
  },
  xbutton: {
    marginLeft: '8px',
    marginTop: '10px'
  },
  depInput: {
    width: '100%',
    marginBottom: '10px'
  },
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: 'white',
    boxShadow: 5,
    padding: 20,
    allignItems: 'center',
    justifyContent: 'center',
  },
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function AssignmentPage() {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);

  const [file, setFile] = useState();
  const [sAssignment, setSAssignment] = useState(assignmentInitial);
  const [aReq, setAReq] = useState(requirementInitial);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector(state => state.app.loading);
  const user = useSelector(state => state.user.currentUser);
  const employee = useSelector(state => state.employee.data);
  const assignment = useSelector(state => state.assignment.data)
  const array = useSelector(state => state.assignment.array)

  useEffect(() => {
    dispatch(fetchEmployee());
    dispatch(fetchAssignment());
  }, [])

  const addAssignmentClick = () => {
    console.log(sAssignment);
    let data = {
      ...sAssignment,
      createrId: user.id,
    }

    if (sAssignment.evaluationType === 1) data = { ...data, requirementArray: aReq }

    Axios.post(`/assign/${sAssignment.evaluationType}/create`, data)
      .then((res) => {
        if (res.status === 204) window.location.reload();
      })
      .catch(err => { console.log('ASIGN_CREATE_', err) })
  }

  const addReqClick = () => {
    console.log('adding req')
    setAReq([...aReq, { id: aReq.length, title: '', percent: '' }])
  }

  const delReqClick = (e, id) => {
    e.preventDefault()
    console.log('deleting req', id)
    setAReq(
      aReq.filter(req => req.id !== id)
    );
  }

  const reqChange = (e, id, key) => {
    console.log('changing', id, key)

    setAReq(
      aReq.filter(req => {
        if (req.id === id) {
          req[key] = e.target.value
        }
        return (req);
      })
    )
  }

  function selectButtonHandler(id) {
    assignment.filter(ass => {
      if (ass.id === id) {
        setSAssignment(ass);
      }
    })
  }

  if (loading) return <Loading />

  return (
    <GridContainer>
      <Modal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}></div>
      </Modal>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Миний ажлууд</h4>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Ажлын нэр", "Хугацаа", "Гүйцэтгэх", "Төлөв", ""]}
              tableData={array}
              selectButtonHandler={selectButtonHandler}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardBody>
            <h2>Ажил гүйцэтгэх</h2>
            <form>
              <InputLabel id="demo-simple-select-label">Үнэлгээний төрөл</InputLabel>
              <Select
                disabled
                labelid="demo-simple-select-label"
                id="demo-simple-select"
                InputLabelProps={{
                  shrink: true,
                }}
                className={classes.etypeSelect}
                value={sAssignment.evaluationType}
                onChange={(value) => setSAssignment({ ...sAssignment, evaluationType: value.target.value })}
              >
                <MenuItem value={0}>Үр дүнгээр үнэлэх</MenuItem>
                <MenuItem value={1}>Гүйцэтгэлээр үнэлэх</MenuItem>
              </Select>
              <TextField
                disabled
                value={sAssignment.name}
                onChange={(value) => setSAssignment({ ...sAssignment, name: value.target.value })}
                className={classes.depInput}
                label="Ажлын нэр"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                disabled
                value={sAssignment.act}
                onChange={(value) => setSAssignment({ ...sAssignment, act: value.target.value })}
                className={classes.depInput}
                label="Акт"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
              <TextField
                disabled
                value={sAssignment.capital}
                onChange={(value) => setSAssignment({ ...sAssignment, capital: value.target.value })}
                className={classes.depInput}
                multiline
                rows={2}
                label="Хөрөнгө"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                disabled
                value={sAssignment.currentSituation}
                onChange={(value) => setSAssignment({ ...sAssignment, currentSituation: value.target.value })}
                className={classes.depInput}
                multiline
                rows={2}
                label="Суурь түвшин"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {sAssignment.evaluationType === 1 ?
                <Card className={classes.depInput}>
                  <CardContent>
                    <Button onClick={addReqClick} color="success" size="sm">НЭМЭХ</Button>
                    {aReq.map((req, index) => {
                      return (
                        <div className={classes.reqRow} key={index}>
                          <TextField value={req.name} onChange={e => reqChange(e, req.id, 'name')} variant="outlined" className={classes.reqTitle} />
                          <TextField value={req.scale} onChange={e => reqChange(e, req.id, 'scale')} variant="outlined" className={classes.reqPercent} />
                          <button onClick={e => delReqClick(e, req.id)} className={classes.xbutton}>x</button>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card> : ''}
              {sAssignment.evaluationType === 0 ?
                <TextField
                  disabled
                  value={sAssignment.requirement}
                  onChange={(value) => setSAssignment({ ...sAssignment, requirement: value.target.value })}
                  className={classes.depInput}
                  label="Шалгуур үзүүлэлт"
                  multiline
                  rows={4}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                /> : ''}
              {sAssignment.evaluationType === '' ?
                <h2>Үнэлгээний төрлөө сонгоно уу?</h2> : ''
              }
              <TextField
                disabled
                value={sAssignment.goal}
                onChange={(value) => setSAssignment({ ...sAssignment, goal: value.target.value })}
                className={classes.depInput}
                multiline
                rows={2}
                label="Хүрэх түвшин"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                disabled
                type="date"
                value={sAssignment.startDate}
                onChange={value => { setSAssignment({ ...sAssignment, startDate: value.target.value }) }}
                className={classes.depInput}
                label="Эхлэх хугацаа"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                disabled
                type="date"
                value={sAssignment.endDate}
                onChange={value => { setSAssignment({ ...sAssignment, endDate: value.target.value }) }}
                className={classes.depInput}
                label="Дуусах хугацаа"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                value={sAssignment.endDate}
                onChange={value => { setSAssignment({ ...sAssignment, endDate: value.target.value }) }}
                className={classes.depInput}
                label="Үнэлгээ"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="file"
                onChange={value => setFile(value.target.files[0])}
                className={classes.depInput}
                label="Файл хавсаргах"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* <TextField
              value={sAssignment.role}
              onChange={(value) => setSAssignment({ ...sAssignment, role: value.target.value })}
              className={classes.depInput}
              select
              label="Хэрэглэгчийн түвшин"
              variant="outlined"
            >
              {employeeRoles && employeeRoles.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </TextField> */}
            </form>

            <Button
              onClick={addAssignmentClick}
              color="success"
              size="sm"
              round
            >
              Илгээх
          </Button>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
