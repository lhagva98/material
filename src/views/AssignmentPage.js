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
  CardActions
} from '@material-ui/core';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import Table from "./EPES-components/EPEStable.js";
import Loading from './Loading';

import { fetchEmployee } from "../actions/user-actions";

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

  const [loading, setLoading] = useState(true);
  const [sAssignment, setSAssignment] = useState(assignmentInitial);
  const [aReq, setAReq] = useState(requirementInitial);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [])

  const addAssignmentClick = () => {
    console.log(sAssignment);
    const data = {
      user,
      sAssignment,
      aReq
    }
    Axios.post('/asign/create', data)
    .then((res) => {
      console.log(res)
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
      <GridItem xs={12} sm={12} md={6} className="bm-10">
        <Card>
          <CardBody>
            <h2>Ажил нэмэх</h2>
            <form>
              <InputLabel id="demo-simple-select-label">Үнэлгээний төрөл</InputLabel>
              <Select
                labelid="demo-simple-select-label"
                id="demo-simple-select"
                className={classes.etypeSelect}
                value={sAssignment.evaluationType}
                onChange={(value) => setSAssignment({ ...sAssignment, evaluationType: value.target.value })}
              >
                <MenuItem value={1}>Үр дүнгээр үнэлэх</MenuItem>
                <MenuItem value={2}>Гүйцэтгэлээр үнэлэх</MenuItem>
              </Select>
              <TextField
                value={sAssignment.act}
                onChange={(value) => setSAssignment({ ...sAssignment, act: value.target.value })}
                className={classes.depInput}
                label="Акт"
                variant="outlined"
              />
              <TextField
                value={sAssignment.capital}
                onChange={(value) => setSAssignment({ ...sAssignment, capital: value.target.value })}
                className={classes.depInput}
                multiline
                rows={2}
                label="Хөрөнгө"
                variant="outlined"
              />
              <TextField
                value={sAssignment.currentSituation}
                onChange={(value) => setSAssignment({ ...sAssignment, currentSituation: value.target.value })}
                className={classes.depInput}
                multiline
                rows={2}
                label="Суурь түвшин"
                variant="outlined"
              />
              {sAssignment.evaluationType === 2 ?
                <Card className={classes.depInput}>
                  <CardContent>
                    <Button onClick={addReqClick} color="success" size="sm">НЭМЭХ</Button>
                    {aReq.map((req, index) => {
                      return (
                        <div className={classes.reqRow} key={index}>
                          <TextField value={req.title} onChange={e => reqChange(e, req.id, 'title')} variant="outlined" className={classes.reqTitle} />
                          <TextField value={req.percent} onChange={e => reqChange(e, req.id, 'percent')} variant="outlined" className={classes.reqPercent} />
                          <button onClick={e => delReqClick(e, req.id)} className={classes.xbutton}>x</button>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card> : ''}
              {sAssignment.evaluationType === 1 ?
                <TextField
                  value={sAssignment.requirement}
                  onChange={(value) => setSAssignment({ ...sAssignment, requirement: value.target.value })}
                  className={classes.depInput}
                  label="Шалгуур үзүүлэлт"
                  multiline
                  rows={4}
                  variant="outlined"
                /> : ''}
              {sAssignment.evaluationType === '' ?
                <h2>Үнэлгээний төрлөө сонгоно уу?</h2> : ''
              }
              <TextField
                value={sAssignment.goal}
                onChange={(value) => setSAssignment({ ...sAssignment, goal: value.target.value })}
                className={classes.depInput}
                multiline
                rows={2}
                label="Хүрэх түвшин"
                variant="outlined"
              />
              <TextField
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
              Нэмэх
          </Button>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Ажлууд</h4>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Дугаар", "Ажлын нэр", "Эхлэх огноо", "Дуусах огноо", "Үүсгэсэн", "Гүйцэтгэсэн", "Гүйцэтгэлийн хувь, "]}
              tableData={[
                ["1", "Төслийн шаардлагыг тодорхойлох тухай", "2020.02.02", "2020.03.22", "А.Тэргэл", "Б.Цэцэгмаа", "99",],
                ["1", "Төслийн шаардлагыг тодорхойлох тухай", "2020.02.02", "2020.03.22", "А.Тэргэл", "Б.Цэцэгмаа", "99",],
                ["1", "Төслийн шаардлагыг тодорхойлох тухай", "2020.02.02", "2020.03.22", "А.Тэргэл", "Б.Цэцэгмаа", "99",],
                ["1", "Төслийн шаардлагыг тодорхойлох тухай", "2020.02.02", "2020.03.22", "А.Тэргэл", "Б.Цэцэгмаа", "99",],
                ["1", "Төслийн шаардлагыг тодорхойлох тухай", "2020.02.02", "2020.03.22", "А.Тэргэл", "Б.Цэцэгмаа", "99",],
                ["1", "Төслийн шаардлагыг тодорхойлох тухай", "2020.02.02", "2020.03.22", "А.Тэргэл", "Б.Цэцэгмаа", "99",]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
