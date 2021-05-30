import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

import { storage } from '../firebase';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from '@material-ui/core';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import Table from "./EPES-components/EPEStable.js";
import { planInitial } from "../constants";

const styles = {
  depInput: {
    width: '100%',
    marginBottom: '10px'
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

export default function PlanPage() {
  const classes = useStyles();

  const [file, setFile] = useState();
  const [planData, setPlanData] = useState();
  const [planArray, setPlanArray] = useState([]);
  const [plan, setPlan] = useState(planInitial);
  const [progress, setProgress] = useState(0);

  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    Axios.get(`/plans/findAll/${user.companyId}`)
      .then(res => {
        setPlanData(res.data.plan);
        console.log('PLAN_DATA_FETCH_', res);

        var ddata = res.data.plan;
        var darray = Object.keys(ddata).map(key => {
          const date = `${ddata[key].startDate.substring(0, 6)} - ${ddata[key].endDate.substring(0, 6)}`
          return [ddata[key].id, date, ddata[key].name, ddata[key].id]
        })
        setPlanArray(darray);
      })
      .catch(err => { console.log('PLAN_DATA_FETCH_', err) })
  }, [])

  const addPlanClick = () => {
    const date = new Date().toISOString().substring(0, 19);
    const fileRef = `uploads/file-${date}-${file.name}`;
    const uploadTask = storage.ref(fileRef).put(file);


    uploadTask.on('state_changed',
      (snap) => {
        const percent = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
        setProgress(percent);
      },
      (err) => {
        console.log("PLAN_FILE_UPLOAD_", err)
      },
      () => {
        storage.ref(fileRef).getDownloadURL()
          .then(url => {
            const data = {
              ...plan,
              fileId: url,
              ownerId: user.id,
              companyId: user.companyId
            }
            Axios.post('plans/add', data)
              .then(res => {
                if (res.status === 204)
                  window.location.reload();
              })
              .catch(err => { console.log('EMP_ADD_', err) })
          })
      }
    )
  }

  function fileViewButtonHandler(id) {
    window.open(planData[id-1].fileId);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Төлөвлөгөө</h4>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["№", "Хугацаа", "Төлөвлөгөө", ""]}
              tableData={planArray}
              fileViewButtonHandler={fileViewButtonHandler}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={4}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Төлөвлөгөө нэмэх</h4>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <CardBody>
            <form encType="multipart/form-data">
              <TextField
                value={plan.name}
                onChange={value => { setPlan({ ...plan, name: value.target.value }) }}
                className={classes.depInput}
                label="Төлөвлөгөөний нэр"
                variant="outlined"
              />
              <TextField
                type="date"
                value={plan.startDate}
                onChange={value => { setPlan({ ...plan, startDate: value.target.value }) }}
                className={classes.depInput}
                label="Эхлэх хугацаа"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="date"
                value={plan.endDate}
                onChange={value => { setPlan({ ...plan, endDate: value.target.value }) }}
                className={classes.depInput}
                label="Дуусах хугацаа"
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
            </form>
            <Button onClick={addPlanClick}>Нэмэх</Button>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
