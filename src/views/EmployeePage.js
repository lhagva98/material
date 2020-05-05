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
import Axios from "axios";

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
    password:'',
    companyId:''
  });
  const [department, setDepartment] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    Axios.get(`employees/findAll/${user.companyId}`)
    .then( res => {
      var ddata = res.data.emp;
      var darray = Object.keys(ddata).map(key => {
        if (ddata[key].department)
          if (ddata[key].department.name !== 0) {
            var cname = ddata[key].department.name;
          } else {
            var cname = '';
          }
        return [ddata[key].lastname, ddata[key].firstname, cname, employeeRoles[ddata[key].role - 1].name, ddata[key].id];
      });
      setEarray(darray);
      setEdata(ddata);
      setLoading(false);

      setSeEmp({...seEmp, companyId: user.companyId});
    })
    .catch(err => { console.log('EMP_DATA_FETCH_', err) })

    Axios.get(`departments/findAll/${user.companyId}`)
    .then( res => {
      setDepartment(res.data.dep);
    })
    .catch(err => { console.log('DEP_DATA_FETCH_', err) })
  }, []);

  const addEmployeeClick = () => {
    const data = JSON.stringify(seEmp)
    

    Axios.post('employees/add', seEmp)
    .then(res => {
      console.log(res);
    })
  }

  if (loading) return <Loading />

  return (
    <GridContainer>
      {console.log(seEmp)}
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
              onChange={(value) => setSeEmp({...seEmp, lastname: value.target.value})} 
              className={classes.depInput} 
              label="Овог" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.firstname} 
              onChange={(value) => setSeEmp({...seEmp, firstname: value.target.value})} 
              className={classes.depInput} 
              label="Нэр" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.username} 
              onChange={(value) => setSeEmp({...seEmp, username: value.target.value})} 
              className={classes.depInput} 
              label="Хэрэглэгчийн нэр" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.role} 
              onChange={(value) => setSeEmp({...seEmp, role: value.target.value})} 
              className={classes.depInput} 
              select
              label="Хэрэглэгчийн түвшин" 
              variant="outlined" 
            >
              {employeeRoles && employeeRoles.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField 
              value={seEmp.dateOfBirth} 
              type="date"
              onChange={(value) => setSeEmp({...seEmp, dateOfBirth: value.target.value})} 
              className={classes.depInput} 
              label="Төрсөн он сар өдөр" 
              variant="outlined" 
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField 
              value={seEmp.registrationNo} 
              onChange={(value) => setSeEmp({...seEmp, registrationNo: value.target.value})} 
              className={classes.depInput} 
              label="Регистрийн дугаар" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.phoneNumber} 
              onChange={(value) => setSeEmp({...seEmp, phoneNumber: value.target.value})} 
              className={classes.depInput} 
              label="Утасны дугаар" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.email} 
              onChange={(value) => setSeEmp({...seEmp, email: value.target.value})} 
              className={classes.depInput} 
              label="И-мэйл" 
              variant="outlined" 
            />
            <TextField 
              value={seEmp.departmentId} 
              onChange={(value) => setSeEmp({...seEmp, departmentId: value.target.value})} 
              className={classes.depInput} 
              select
              label="Хэлтэс" 
              variant="outlined" 
            >
              {department && department.map((d) => (
                <MenuItem key={d.id} value={d.id}>
                  {d.name}
                </MenuItem>
              ))}
            </TextField>
          </form>

          <Button
            onClick={addEmployeeClick}
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
