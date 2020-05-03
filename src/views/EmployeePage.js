import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Modal, TextField, MenuItem } from '@material-ui/core';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import Table from "./EPES-components/EPEStable.js";
import Loading from './Loading';


import { employeeRoles } from '../constants';

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
    allignItems: 'center',
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

  const [modalStyle] = React.useState(getModalStyle);

  const [loading, setLoading] = useState(true);
  const [edata, setEdata] = useState('');
  const [earray, setEarray] = useState([]);
  const [seEmp, setSeEmp] = useState({
    id: '',
    username: '',
    lastname: '',
    firstname: '',
    dateOfBirth: null,
    registrationNo: '',
    phoneNumber: '',
    email: '',
    departmentId: '',
    role: '',
    password:''
  });
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    fetch(`http://localhost:3001/employees/findAll/${user.companyId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(resJSON => {
        console.log("EMPLOYEE_FETCH_", resJSON);
        var ddata = resJSON.emp;

        var darray = Object.keys(ddata).map(key => {
          if (ddata[key].department)
            if (ddata[key].department.name !== 0) {
              var cname = ddata[key].department.name;
            } else {
              var cname = '';
            }
          return [ddata[key].lastname, ddata[key].firstname, cname, employeeRoles[ddata[key].role].name, ddata[key].id];
        });

        console.log(darray);
        setEarray(darray);
        setEdata(ddata);
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
      <Modal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Ажилтан нэмэх</h2>
          <form>
            <TextField 
              value={seEmp.lastname} 
              onChange={(value) => setSeEmp({...setSeEmp, last: value.target.value})} 
              className={classes.depInput} 
              label="Овог" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.firstname} 
              onChange={(value) => setSeEmp({...setSeEmp, firstname: value.target.value})} 
              className={classes.depInput} 
              label="Нэр" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.username} 
              onChange={(value) => setSeEmp({...setSeEmp, username: value.target.value})} 
              className={classes.depInput} 
              label="Нэр" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.dateOfBirth} 
              onChange={(value) => setSeEmp({...setSeEmp, dateOfBirth: value.target.value})} 
              className={classes.depInput} 
              label="Нэр" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.registrationNo} 
              onChange={(value) => setSeEmp({...setSeEmp, registrationNo: value.target.value})} 
              className={classes.depInput} 
              label="Нэр" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.phoneNumber} 
              onChange={(value) => setSeEmp({...setSeEmp, phoneNumber: value.target.value})} 
              className={classes.depInput} 
              label="Нэр" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.email} 
              onChange={(value) => setSeEmp({...setSeEmp, email: value.target.value})} 
              className={classes.depInput} 
              label="Нэр" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.departmentId} 
              onChange={(value) => setSeEmp({...setSeEmp, departmentId: value.target.value})} 
              className={classes.depInput} 
              select
              label="Нэр" 
              variant="outlined" 
              helperText="Сонгоно уу?"
            />
            {/* <TextField value={desc} onChange={(value) => setDesc(value.target.value)} className={classes.depInput} label="Тайлбар" variant="outlined" />
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
            </TextField> */}
          </form>

          <Button
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
            <h4 className={classes.cardTitleWhite}>Нийт ажилчдын жагсаалт</h4>
            {/* <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p> */}
          </CardHeader>
          <CardBody>
            <Button onClick={() => {setAddModalOpen(true)}} color="success" size="sm" round>
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
              tableData={earray}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
