import React, { useEffect, useState, useRef } from "react";
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
  Grid
} from '@material-ui/core';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import UpcomingEvent from "components/UpcomingEvent";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { firestore } from 'firebase';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Select from 'react-select';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CardIcon from "components/Card/CardIcon.js";
import Warning from "@material-ui/icons/Warning";
import Icon from "@material-ui/core/Icon";
import CardFooter from "components/Card/CardFooter.js";
import Danger from "components/Typography/Danger.js";
import Paper from '@material-ui/core/Paper';

import Loading from './Loading';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import materiallist from "materialList.json";
import { useParams } from "react-router";
import { useReactToPrint } from 'react-to-print';
import { moneyFormat } from 'utils';
const localizer = momentLocalizer(moment) // or globalizeLocalizer

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
  },
  materialStats: {
    padding: 20,
  },
};


const useStyles = makeStyles(styles);

export default function DepartmentPage() {
  const classes = useStyles();

  const { id } = useParams();

  const [modalStyle] = React.useState(getModalStyle);

  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [popup, setPopup] = useState(false);
  const [pcoordinate, setPcoordinate] = useState({ x: 600, y: 300 })
  const [activities, setActivities] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [activityInput, setActivityInput] = useState('');
  const [activeDate, setActiveDate] = useState(null);
  const [activeEvent, setActiveEvent] = useState(null);
  const [activeActivity, setActiveActivity] = useState(null);
  const [materialName, setMaterialName] = useState('');
  const [materialQuantity, setMaterialQuatity] = useState('');
  const [materialPrePrice, setMaterialPrePrice] = useState('');
  const [materialUnit, setMaterialUnit] = useState('');
  const [editTitle, setEditTitle] = useState(null);
  const [total, setTotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [saved, setSaved] = useState(0);
  const [mIndex, setMIndex] = useState(-1)
  const [iprice, setIprice] = useState('');
  const [itotal, setItotal] = useState('');
  const printTable = useRef();


  useEffect(() => {
    console.log("param ", id)
    // project data fetch
    firestore().doc(`projects/${id}`).onSnapshot(doc => {
      // is project exists
      if (doc.exists) {
        setProject(doc.data());

        // project events data fetch
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

        firestore().collectionGroup(`materials`)
          .where("projectId", "==", id)
          .onSnapshot(snapshot => {
            let rtotal = 0, rpaid = 0, rsaving = 0;
            snapshot.forEach(sDoc => {
              const data = sDoc.data();
              console.log("data ", parseInt(data.prePrice), parseInt(data.price), parseInt(data.quantity))
              rtotal = rtotal + (parseInt(data.prePrice) * parseInt(data.quantity));

              if (data.checked) {
                rpaid = rpaid + (parseInt(data.price) * parseInt(data.quantity));
                rsaving = rsaving + ((parseInt(data.prePrice) - parseInt(data.price)) * parseInt(data.quantity))
              }
            })

            console.log('muahdfa', rtotal, rpaid, rsaving)
            setTotal(rtotal);
            setPaid(rpaid);
            setSaved(rsaving);
          })
      }

    })

  }, []);

  const handlePrint = useReactToPrint({
    content: () => printTable.current
  })

  const handleSlotSelect = (slot) => {
    console.log("slot ", slot);
    // setPcoordinate({ x: slot.box.x, y: slot.box.y });

    if (popup) {
      setActiveDate(null);
      setPopup(false);
      setActivities([]);
      setActiveEvent(null);
    } else {
      setActiveDate(slot.start);
      setActiveEvent(null);
      setPopup(true);
    }
    // setEvents(events => ([...events, {
    //   title: `event ${events.length}`,
    //   start: slot.start,
    //   end: slot.end,
    //   allDay: true,
    // }]))
  }

  const fetchActivities = ({ eventId }) => {
    firestore().collection(`projects/${id}/events/${eventId}/activities`).get().then(snap => {
      if (!snap.empty) {
        let result = []
        snap.forEach(doc => {
          result.push(doc.data());
        })
        setActivities(result)
      } else {
        setActivities([]);
      }
    })
    // firestore().collection(`projects/${id}/events`)
    //   .where("start", "==", activeDate.toJSON())
    //   .onSnapshot(snap => {
    //     snap.forEach(doc => {
    //       console.log("dafsdsaf ", doc.data());
    //       setActiveEvent(doc.id);
    //     })
    //   })
  }

  const fetchMaterials = ({ activityId, eventId }) => {
    firestore().collection(`projects/${id}/events/${eventId ?? activeEvent}/activities/${activityId}/materials`).get().then(snap => {
      if (!snap.empty) {
        let result = []
        snap.forEach(doc => {
          result.push(doc.data());
        })
        setMaterials(result)
      } else {
        setMaterials([]) 
      }
    })
  }

  const handleEventSelect = (event) => {
    console.log("event ", event)
    // setPcoordinate()
    if (popup) {
      setActiveDate(null);
      setPopup(false);
    } else {
      setActiveDate(event.start);
      setActiveEvent(event.id);
      fetchActivities({ eventId: event.id });
      setPopup(true);
    }
  }

  const handleAddActivity = () => {
    console.log("activedate ", activeDate)

    if (activeEvent) {
      const newActivity = firestore().collection(`projects/${id}/events/${activeEvent}/activities`).doc();
      newActivity.set({
        id: newActivity.id,
        name: activityInput,
      }).then(() => {
        console.log("sucess")
        setActivityInput('');
      })
    } else {
      const newEvent = firestore().collection(`projects/${id}/events`).doc()
      newEvent.set({
        id: newEvent.id,
        title: 'Ажлын жагсаалт',
        start: activeDate.toJSON(),
        end: activeDate.toJSON(),
        allday: true,
      }).then(() => {
        const newActivity = newEvent.collection('activities').doc()
        newActivity.set({
          id: newActivity.id,
          name: activityInput,
        }).then(() => {
          console.log("sucess")
          setActivityInput('');
        })
      })
    }
  }

  const handleCalendarClick = e => {
    if (popup) {
      setPopup(false);
    }
    setPcoordinate({ x: e.pageX, y: e.pageY });
    console.log("e coordinate ", e.pageX, e.pageY)
  }

  const handleAddMaterial = (item, event) => {
    if (event) {
      setActiveEvent(event.id);
    }
    setActiveActivity(item);
    fetchMaterials({ activityId: item.id, eventId: event?.id })
    setEditModalOpen(true);
    // if (event) {
    //   setActiveDate(event.start);
    //   setActiveEvent(event.id);
    //   fetchActivities({ eventId: event.id }, () => {
    //     setActiveActivity(item);
    //     fetchMaterials({ activityId: item.id })
    //     setEditModalOpen(true);
    //   });
    // } else {
    //   setActiveActivity(item);
    //   fetchMaterials({ activityId: item.id })
    //   setEditModalOpen(true);
  }


  const handleMaterialAddClick = () => {
    const newMaterial = firestore().collection(`projects/${id}/events/${activeEvent}/activities/${activeActivity.id}/materials`).doc();
    newMaterial.set({
      id: newMaterial.id,
      name: materialName,
      unit: materialUnit,
      quantity: materialQuantity,
      prePrice: materialPrePrice,
      price: 0,
      total: 0,
      checked: false,
      activityId: activeActivity.id,
      projectId: id,
      eventId: activeEvent,
    }).then(() => {
      setMaterialName('');
      setMaterialPrePrice('');
      setMaterialQuatity('');
      setMaterialUnit('');
      console.log("success")
    })
  }

  const handleDeleteMaterial = item => {
    firestore().doc(`projects/${id}/events/${activeEvent}/activities/${activeActivity.id}/materials/${item.id}`).delete()
  }

  const handleMaterialCheck = (e, index, itemID) => {
    if (index !== mIndex) return
    console.log("hha", e.target.checked, index, itemID)
    firestore()
      .doc(`projects/${id}/events/${activeEvent}/activities/${activeActivity.id}/materials/${itemID}`)
      .update({
        checked: e.target.checked,
        price: e.target.checked ? iprice : 0,
        total: e.target.checked ? itotal : 0,
      })

  }



  const handleMaterialInputChange = (e, index, type, quantity) => {
    console.log("edfasdf", e.target.value, index, type)
    setMIndex(index);
    if (type === 'price') {
      setIprice(e.target.value);
      setItotal(parseInt(e.target.value) * parseInt(quantity))
      if (index !== mIndex) setItotal('')
    }
    if (type === 'total') {
      setItotal(e.target.value);
      if (index !== mIndex) setIprice('')
    }
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
            <h5>{activeActivity && activeActivity.name ? activeActivity.name : null}</h5>
            <span>Материал нэмэх</span>
            <Select
              isSearchable={true}
              options={materiallist}
              className={classes.selectInputStyle}
              onChange={(item) => {
                console.log("item ", item)
                setMaterialName(item.label);
                setMaterialUnit(item.unit);
              }}
            />
            <TextField value={materialName} onChange={e => setMaterialName(e.target.value)} className={classes.mInput} margin="dense" label="Материалын нэр" variant="outlined" />
            <TextField value={materialQuantity} onChange={e => setMaterialQuatity(e.target.value)} className={classes.mInput} margin="dense" label="Тоо хэмжээ" variant="outlined" />
            <TextField value={materialPrePrice} onChange={e => setMaterialPrePrice(e.target.value)} className={classes.mInput} margin="dense" label="Санал болгох үнэ" variant="outlined" style={{ marginBottom: 40 }} />

            <MButton
              size="large"
              color="primary"
              variant="contained"
              className={classes.addMaterialButton}
              onClick={handleMaterialAddClick}
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
            <div ref={printTable}>
              <div>
                Нийт материалууд
            </div>
              <div>
                <Table size="small"  >
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
                    {materials.length && materials.map((item, index) => (
                      <TableRow>
                        <TableCell classes="deleteIcon" className="deleteIcon" ><DeleteIcon onClick={() => handleDeleteMaterial(item)} style={{ cursor: 'pointer' }} /></TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.prePrice}</TableCell>
                        <TableCell>{item.checked ? item.price : <TextField size="small" value={index === mIndex ? iprice : ''} onChange={(e) => handleMaterialInputChange(e, index, 'price', item.quantity)} />}</TableCell>
                        <TableCell>{item.checked ? item.total : <TextField size="small" value={index === mIndex ? itotal : ''} onChange={(e) => handleMaterialInputChange(e, index, 'total', item.quantity)} />}</TableCell>
                        <TableCell style={{ padding: 0 }} >
                          <Checkbox
                            // checked={state.checkedB}
                            // onChange={handleChange}
                            name="checkedB"
                            checked={item.checked}
                            onChange={(e) => handleMaterialCheck(e, index, item.id)}
                            color="primary"
                            style={{ padding: 0 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div>
              {/* Нийт дүн: {materials.length && materials.reduce((a, b) => a.prePrice + b.prePrice)} */}
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
                onClick={handlePrint}
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
          backgroundColor: '#ffffff',
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
              {activities.length && activities.map((item, index) => (
                <div className={classes.activityRow}>
                  <div className={classes.indexCell} >{index + 1}</div>
                  <div className={classes.nameCell} >{item.name}</div>
                  <Chip label="Материал нэмэх" onClick={() => { handleAddMaterial(item) }} className={classes.addButtonCell} size="small" />
                  <Chip onDelete={() => firestore().doc(`projects/${id}/events/${activeEvent}/activities/${item.id}`).delete()} size="small" />
                </div>
              ))}
            </div>
          </CardHeader>
        </Card> : null}
        <Card className={classes.mainCard}>
          <CardHeader color="primary">
            {editTitle !== null ? (
              <div>
                <TextField value={editTitle} onChange={(e) => setEditTitle(e.target.value)} label="Төслийн гарчиг" />
                <Button onClick={() => { firestore().doc(`projects/${project.id}`).update({ title: editTitle }).then(() => setEditTitle(null)) }} >
                  <SaveIcon style={{ cursor: 'pointer' }} />
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex' }}>
                <h4 className={classes.cardTitleWhite}>{project && project.title ? project.title : 'Төслийн нэр'}</h4>
                <EditIcon onClick={() => setEditTitle(project.title)} style={{ cursor: 'pointer', marginLeft: 20 }} />
              </div>
            )}
          </CardHeader>
          <CardBody>
            <GridContainer className={classes.projectBox}>
              <div style={{ marginBottom: 20, width: '100%' }} >
                <GridContainer >
                  <GridItem md={4}>
                    <Paper className={classes.materialStats}>
                      <h6>Нийт материал:</h6>
                      <h2>{moneyFormat(total)}₮</h2>
                    </Paper>
                  </GridItem>
                  <GridItem md={4}>
                    <Paper className={classes.materialStats}>
                      <h6>Батлагдсан:</h6>
                      <h2>{moneyFormat(paid)}₮</h2>
                    </Paper>
                  </GridItem>
                  <GridItem md={4}>
                    <Paper className={classes.materialStats}>
                      <h6>Хэмнэсэн:</h6>
                      <h2>{moneyFormat(saved)}₮</h2>
                    </Paper>
                  </GridItem>
                </GridContainer>
              </div>
              <Grid container spacing={3} style={{ height: 700 }} onClick={handleCalendarClick}>
                <Grid item xs={12} md={8}>
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
                </Grid>
                <Grid item xs={12} md={3}>
                  <UpcomingEvent events={events} handleAddMaterial={handleAddMaterial} />
                </Grid>
              </Grid>
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer >
  );
}
