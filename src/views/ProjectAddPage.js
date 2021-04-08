import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, MenuItem } from '@material-ui/core';
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

import Loading from './Loading';
import Table from "./EPES-components/EPEStable.js";

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
  }
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

  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {

    firestore().collection('test').doc('123').get().then((doc) => {
      console.log("doc ", doc.data());
    })

    fetch(`http://localhost:3001/departments/findAll/1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(resJSON => {
        console.log("DEPARTMENT_FETCH_", resJSON);
        var ddata = resJSON.dep;

        var darray = Object.keys(ddata).map(key => {
          var cname = '';
          if (ddata[key].head)
            if (ddata[key].head.name !== 0) {
              cname = ddata[key].head.name;
            } else {
              cname = '';
            }
          return [ddata[key].name, ddata[key].desc, cname, ddata[key].id];
        });

        setDarray(darray);
        setDepartmant(ddata);
        setLoading(false);
      },
        (err) => {
          console.log("DEPARTMENT_FETCH_ERR_", err)
        })
      .catch(err => { console.log(err) })

  }, []);




  if (loading) return <Loading />

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card className={classes.mainCard}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Төсөл шинээр үүсгэх</h4>
          </CardHeader>
          <CardBody>
            <GridContainer className={classes.projectBox}>
              calendar
            </GridContainer>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
