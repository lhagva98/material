import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, MenuItem, Chip } from '@material-ui/core';
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

import Loading from './Loading';
import Table from "./EPES-components/EPEStable.js";
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment) // or globalizeLocalizer

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
};

const useStyles = makeStyles(styles);

export default function DepartmentPage() {
  const classes = useStyles();

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
  const [popup, setPopup] = useState(true);
  const [pcoordinate, setPcoordinate] = useState({ x: 600, y: 300 })
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: 'Шал',
    },
    {
      id: 2,
      name: 'Хана',
    }
  ])

  useEffect(() => {

  }, []);


  const handleSlotSelect = (slot) => {
    console.log("slot ", slot);
    setPcoordinate({ x: slot.box.x, y: slot.box.y });
    setPopup(!popup);
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
  }

  if (loading) return <Loading />

  return (
    <GridContainer>
      <GridItem xs={12}>
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
              <TextField margin="dense" id="outlined-basic" label="Үйл ажиллагааны нэр" variant="outlined" size="small" />
              <Button variant="contained" color="primary" style={{ marginLeft: 12 }} >
                Нэмэх
              </Button>
            </div>
            <div>
              {activities.map((item, index) => (
                <div className={classes.activityRow}>
                  <div className={classes.indexCell} >{index + 1}</div>
                  <div className={classes.nameCell} >{item.name}</div>
                  <Chip label="Материал нэмэх" onClick={() => console.log("fjdklsjf")} className={classes.addButtonCell} size="small" />
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
                onClick={e => console.log("e coordinate ", e.pageX, e.pageY)}
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
    </GridContainer>
  );
}
