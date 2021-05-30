import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import Table from "./EPES-components/EPEStable.js";

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

  const [planData, setPlanData] = useState();
  const [planArray, setPlanArray] = useState([]);

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


  function fileViewButtonHandler(id) {
    window.open(planData[id-1].fileId);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
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
              tableHead={["№", "Хугацаа", "Төлөвлөгөө", "Төлөв"]}
              tableData={planArray}
              fileViewButtonHandler={fileViewButtonHandler}
            />
          </CardBody>
        </Card>
      </GridItem>
   </GridContainer>
  );
}
