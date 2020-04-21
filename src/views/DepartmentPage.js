import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
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

export default function DepartmentPage() {
  const classes = useStyles();

  const [dep, setDep] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/departments/findAll`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(resJSON => {
        console.log("DEPARTMENT_FETCH_", resJSON);
        setDep(resJSON.dep);
      },
        (err) => {
          console.log("DEPARTMENT_FETCH_ERR_")
        })
      .catch(err => { console.log(err) })
  }, []);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Хэлтэсүүд</h4>
            <p className={classes.cardCategoryWhite}>
              Байгууллагын хэлтсүүдийн тухай дэлгэрэнгүй мэдээлэл
            </p>
          </CardHeader>
          <CardBody>
            <Button color="success" size="sm" round>
              Нэмэх
            </Button>
            <Button color="warning" size="sm" round>
              Өөрчлөх
            </Button>
            <Button color="danger" size="sm" round>
              Устгах
            </Button>
            <Table
              styles
              tableHeaderColor="primary"
              tableHead={["Нэр", "Тайлбайр", "Толгой Хэлтэс"]}
              tableData={[
                ["Удирдлага", "Тайлбаргүй", ""],
                ["Санхүү", "Тайлбаргүй", "Удирдлага"],
                ["Мэдээлэл технологийн алба", "Тайлбаргүй", "Удирдлага"],
                ["Аппликейшн хөгжүүлэлтийн алба", "Тайлбаргүй", "МТА"],
                ["Контент хөгжүүлэлтийн алба", "Тайлбаргүй", "Удирдлага"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
