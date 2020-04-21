import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

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

export default function EmployeePage() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Нийт ажилчдын жагсаалт</h4>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
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
            <Button color="default" size="sm" round>
              Филтер
            </Button>
            <Table
              tableHeaderColor="primary"
              tableHead={["Овог", "Нэр", "Албан тушаал", "Утасны дугаар", "И-Мэйл"]}
              tableData={[
                ["Батсүх", "Тэргэл", "Захирал", "99164071", "batsukhtergel@company.com"],
                ["Уланбаяр", "Цэцэгмаа", "Менежер", "45645678", "tstststs@dfasdf.com"],
                ["Энхжаргал", "Бат-Эрдэнэ", "Ажилтан", "79878999", "sdaffdsaf@dfadafsf.com"],
                ["Жавхлант", "Батмөнх", "Ажилтан", "99885236", "dfasdfsf@dfadd.com"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
 </GridContainer>
  );
}
