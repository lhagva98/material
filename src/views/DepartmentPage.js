import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, MenuItem } from '@material-ui/core';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import Button from "components/CustomButtons/Button.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

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
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    boxShadow: 5,
    padding: 20,
    allignItems: 'center',
    justifyContent: 'center',
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

  const [modalStyle] = React.useState(getModalStyle);

  const [loading, setLoading] = useState(true);
  const [department, setDepartmant] = useState();
  const [DArray, setDarray] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [root, setRoot] = useState('')

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
        var ddata = resJSON.dep;

        var darray = Object.keys(ddata).map(key => {
          return [ddata[key].name, ddata[key].desc, ddata[key].root];
        });

        setDarray(darray);
        setDepartmant(ddata);
        setLoading(false);
      },
        (err) => {
          console.log("DEPARTMENT_FETCH_ERR_")
        })
      .catch(err => { console.log(err) })


  }, []);

  const handleAddDepClick = () => {
    const data = JSON.stringify({ name, desc, root })
    fetch(`http://localhost:3001/departments/add`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
    .then(res => {
      if(res.status === 204) {
        setAddModalOpen(false);
        window.location.reload();
      }
    })
  }

  if (loading) return null;

  return (
    <GridContainer>
      <Modal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Хэлтэс нэмэх</h2>
          <form>
            <TextField value={name} onChange={(value) => setName(value.target.value)} className={classes.depInput} label="Нэр" variant="outlined" />
            <TextField value={desc} onChange={(value) => setDesc(value.target.value)} className={classes.depInput} label="Тайлбар" variant="outlined" />
            <TextField
              value={root}
              onChange={(value) => setRoot(value.target.value)}
              className={classes.depInput}
              select
              label="Толгой хэлтэс"
              variant="outlined"
              helperText="Сонгоно уу?"
            >
              {department && department.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </TextField>
          </form>

          <Button
            onClick={handleAddDepClick}
            color="success"
            size="sm"
            round
          >
            Нэмэх
          </Button>
        </div>
      </Modal>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Хэлтэсүүд</h4>
            <p className={classes.cardCategoryWhite}>
              Байгууллагын хэлтсүүдийн тухай дэлгэрэнгүй мэдээлэл
            </p>
          </CardHeader>
          <CardBody>
            <Button onClick={() => setAddModalOpen(true)} color="success" size="sm" round>
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
              tableData={DArray}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
