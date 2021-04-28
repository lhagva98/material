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
  depInput: {
    width: '100%',
    marginBottom: '10px'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 5,
    padding: 20,
    alignItems: 'center',
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
  const [loading, setLoading] = useState(false);
  const [DArray, setDarray] = useState([]);

  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {

    firestore().collection('projects').onSnapshot(snapshot => {
      let result = [];
      snapshot.forEach(doc => {
        result.push(doc.data());
      })
      setDarray(result);
    })


  }, []);


  if (loading) return <Loading />

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card className={classes.mainCard}>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Нийт төслүүд</h4>
            {/* <p className={classes.cardCategoryWhite}>
              Байгууллагын хэлтсүүдийн тухай дэлгэрэнгүй мэдээлэл
            </p> */}
          </CardHeader>
          <CardBody>
            <GridContainer className={classes.projectBox}>
              {DArray.map(item => {
                return (<ProjectCard project={item} />)
              })}
              <AddProjectCard />
            </GridContainer>

            {/* <Button onClick={() => {
              setdeId('');
              setName('');
              setDesc('');
              setRoot('');
              setAddModalOpen(true)
            }} color="success" size="sm" round>
              Нэмэх
            </Button>
            <Table
              styles
              editButtonHandler={editButtonHandler}
              deleteButtonHandler={deleteButtonHandler}
              tableHeaderColor="primary"
              tableHead={["Нэр", "Тайлбайр", "Толгой Хэлтэс", '']}
              tableData={DArray}
            /> */}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
