import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  TextField,
  Button as MButton,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from '@material-ui/core';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import ProjectCard from "components/ProjectCard";
import AddProjectCard from "components/AddProjectCard";
import { firestore } from 'firebase';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Select from 'react-select';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import Loading from './Loading';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import materiallist from "materialList.json";
import { useParams } from "react-router";


const localizer = momentLocalizer(moment) // or globalizeLocalizer

const materialData = [
  {
    id: 1,
    name: 'Банз',
    unit: 'ш',
    quantity: 4,
    prePrice: 20000,
    price: 18000,
    total: 72000,
    done: true,
  },
  {
    id: 2,
    name: 'Цемент',
    unit: 'кг',
    quantity: 10,
    prePrice: 5000,
    price: 5000,
    total: 50000,
    done: false,
  },
  {
    id: 3,
    name: 'Плита',
    unit: 'м2',
    quantity: 50,
    prePrice: 3500,
    price: 0,
    total: 150000,
    done: false,
  },
]

const activityData = [
  {
    id: 1,
    name: 'Шал',
  },
  {
    id: 2,
    name: 'Хана',
  }
]

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "700",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  paper: {
    position: 'absolute',
    // width: 400,
    backgroundColor: 'white',
    boxShadow: 5,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  mainCard: {
    backgroundColor: "transparent",
    boxShadow: 'none',
  },
  projectBox: {
    alignItems: 'stretch',
    height: 900,
  },
  popupCircle: {
    width: 20,
    height: 20,
    borderRadius: '100%',
    backgroundColor: '#FF766B',
    position: 'relative',
    left: -10,
    top: -10,
  },
  activityRow: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 8,
  },
  indexCell: {
    marginRight: 5,
  },
  nameCell: {
    flex: 1,
  },
  addButtonCell: {
    marginRight: 24,
  },
  xCell: {
    marginRight: 8,
  },
  paperLeft: {
    width: 300,
  },
  paperRight: {
    width: 600,
    marginLeft: 20,
    height: '100%',
  },
  addMaterialButton: {
    width: '100%',
    alignSelf: 'flex-end',
  },
  mInput: {
    width: '100%',
  },
  materialRightButtonBox: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  selectInputStyle: {
    zIndex: 20,
  }
};

const useStyles = makeStyles(styles);

export default function DepartmentPage() {
  const classes = useStyles();

  const { id } = useParams();

  const [modalStyle] = React.useState(getModalStyle);

  const [loading, setLoading] = useState(false);
  const [department, setDepartmant] = useState();
  const [DArray, setDarray] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deId, setdeId] = useState('');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [root, setRoot] = useState('');
  const [events, setEvents] = useState([]);
  const [popup, setPopup] = useState(false);
  const [pcoordinate, setPcoordinate] = useState({ x: 600, y: 300 })
  const [activities, setActivities] = useState(activityData);
  const [editActivity, setEditActivity] = useState(true);
  const [materials, setMaterials] = useState(materialData);
  const [activityInput, setActivityInput] = useState('');
  const [activeDate, setActiveDate] = useState(null);

  useEffect(() => {
    console.log("param ", id)
    firestore().collection(`projects/${id}/events`).onSnapshot(snapshot => {
      let result = [];
      snapshot.forEach(doc => {
        let data = doc.data()
        console.log("data ", data)
        result.push({
          id: data.id,
          title: data.title,
          start: new Date(data.start),
          end: new Date(data.end),
          allday: true,
        })
      })
      setEvents(result);
    })
  }, []);


  const handleSlotSelect = (slot) => {
    console.log("slot ", events);
    // setPcoordinate({ x: slot.box.x, y: slot.box.y });

    if (popup) {
      setActiveDate(null);
      setPopup(false);

    } else {
      setActiveDate(slot.start);
      setPopup(true);
    }
    // setEvents(events => ([...events, {
    //   title: `event ${events.length}`,
    //   start: slot.start,
    //   end: slot.end,
    //   allDay: true,
    // }]))
  }

  const handleEventSelect = (event) => {
    console.log("event ", event)
    // setPcoordinate()
    if (popup) {
      setActiveDate(null);
      setPopup(false);

    } else {
      setActiveDate(event.start);
      setPopup(true);
    }
  }

  const handleAddActivity = () => {
    console.log("activedate ", activeDate)
    const newEvent = firestore().collection(`projects/${id}/events`).doc()

    newEvent.set({
      id: newEvent.id,
      title: 'Ажлын жагсаалт',
      start: activeDate.toJSON(),
      end: activeDate.toJSON(),
      allday: true,
    }).then(() => {
      console.log("sucess")
    })
  }

  const handleCalendarClick = e => {

    setPcoordinate({ x: e.pageX, y: e.pageY });
    console.log("e coordinate ", e.pageX, e.pageY)
  }

  if (loading) return <Loading />

  return (
    <GridContainer>
      {/* Modal */}
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {/* left side */}
          <div className={classes.paperLeft} >
            <h5>Хана</h5>
            <span>Материал нэмэх</span>
            <Select
              isSearchable={true}
              options={materiallist}
              className={classes.selectInputStyle}
            />
            <TextField className={classes.mInput} value={name} margin="dense" label="Материалын нэр" variant="outlined" />
            <TextField className={classes.mInput} value={desc} margin="dense" label="Тоо хэмжээ" variant="outlined" />
            <TextField className={classes.mInput} value={desc} margin="dense" label="Санал болгох үнэ" variant="outlined" style={{ marginBottom: 40 }} />

            <MButton
              size="large"
              color="primary"
              variant="contained"
              className={classes.addMaterialButton}
            >
              Нэмэх
            </MButton>
          </div>
          {/* right side */}
          <div className={classes.paperRight}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Button
                // onClick={handleSaveButtonClick}
                color="success"
                size="sm"
                round
              >
                Хадгалах
              </Button>
            </div>
            <div>
              Нийт материалууд
            </div>
            <div>
              <Table size="small" >
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Материалын нэр</TableCell>
                    <TableCell>х/Нэгж</TableCell>
                    <TableCell>Тоо ширхэг</TableCell>
                    <TableCell>Санал болгох үнэ</TableCell>
                    <TableCell>Авсан үнэ</TableCell>
                    <TableCell>Нийт</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {materials.map((item) => (
                    <TableRow>
                      <TableCell><DeleteIcon /></TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.prePrice}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.total}</TableCell>
                      <TableCell style={{ padding: 0 }} >
                        <Checkbox
                          // checked={state.checkedB}
                          // onChange={handleChange}
                          name="checkedB"
                          color="primary"
                          style={{ padding: 0 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              Нийт дүн: {() => { let total = 0; materials.forEach((item) => total += item.total); return <span>{total}</span> }}
            </div>
            <div className={classes.materialRightButtonBox}>
              <MButton
                size="large"
                color="secondary"
                variant="contained"
                className={classes.asd}
              >
                Буцах
              </MButton>
              <MButton
                size="large"
                color="default"
                variant="contained"
                className={classes.asd}
              >
                Хэвлэх
            </MButton>
            </div>
          </div>
        </div>
      </Modal>

      <GridItem xs={12}>
        {/* Popup */}
        {popup ? <Card style={{
          marginTop: 0,
          position: 'fixed',
          left: pcoordinate.x,
          top: pcoordinate.y,
          backgroundColor: '#ffffff90',
          border: '1px solid #000000',
          borderRadius: 5,
          width: 480,
          height: 300,
          zIndex: 10,
        }}>
          <div className={classes.popupCircle} />
          <CardHeader>
            <h6>Ажлын жагсаалт</h6>
            <div>
              <TextField label="Үйл ажиллагааны нэр" value={activityInput} onChange={e => setActivityInput(e.target.value)} margin="dense" id="outlined-basic" variant="outlined" size="small" />
              <Button onClick={handleAddActivity} variant="contained" color="primary" style={{ marginLeft: 12, alignSelf: 'flex-end' }} >
                Нэмэх
              </Button>
            </div>
            <div>
              {activities.map((item, index) => (
                <div className={classes.activityRow}>
                  <div className={classes.indexCell} >{index + 1}</div>
                  <div className={classes.nameCell} >{item.name}</div>
                  <Chip label="Материал нэмэх" onClick={() => { console.log("fjdklsjf"); setEditModalOpen(true) }} className={classes.addButtonCell} size="small" />
                  <Chip onDelete={() => console.log("deletechip ")} size="small" />
                </div>
              ))}
            </div>
          </CardHeader>
        </Card> : null}
        <Card className={classes.mainCard}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Төсөл шинээр үүсгэх</h4>
          </CardHeader>
          <CardBody>
            <GridContainer className={classes.projectBox}>
              <div style={{ height: 700, width: 1000 }}
                onClick={handleCalendarClick}
              >
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  selectable
                  // toolbar={false}
                  view="month"
                  views={{
                    month: true,
                  }}
                  onSelectSlot={handleSlotSelect}
                  onSelectEvent={handleEventSelect}
                />
              </div>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer >
  );
}
