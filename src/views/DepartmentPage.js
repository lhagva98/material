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

  const handleAddDepClick = () => {
    const data = JSON.stringify({ name, desc, root, companyId: user.companyId })
    fetch(`http://localhost:3001/departments/add`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(res => {
        if (res.status === 204) {
          setAddModalOpen(false);
          window.location.reload();
        }
      })
  }

  function editButtonHandler(id) {
    const index = department.filter(dep => {
      if (dep.id === id) return (dep)
    })

    if (index[0]) {
      setdeId(index[0].id);
      setName(index[0].name);
      setDesc(index[0].desc);
      setRoot(index[0].root);
      setEditModalOpen(true);
    }
  }

  function deleteButtonHandler(id) {
    const index = department.filter(dep => {
      if (dep.id === id) return (dep)
    })

    console.log("idididi", id, index);

    if (index[0]) {
      setdeId(index[0].id);
      setName(index[0].name);
      setDesc(index[0].desc);
      setRoot(index[0].root);
      setDeleteModalOpen(true);
    }
  }

  const handleSaveButtonClick = () => {
    const data = JSON.stringify({ id: deId, name, desc, root, companyId: user.companyId })
    fetch(`http://localhost:3001/departments/edit/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    })
      .then(res => {
        if (res.status === 204) {
          setAddModalOpen(false);
          window.location.reload();
        }
      })
  }

  const handleDeleteButtonClick = () => {
    {
      const data = JSON.stringify({
        id: deId,
        name,
        desc,
        root,
        companyId: user.companyId
      });

      fetch(`http://localhost:3001/departments/delete/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: data
      })
        .then(res => {
          if (res.status === 204) {
            setAddModalOpen(false);
            window.location.reload();
          }
        })
    }
  }

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
      <Modal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Хэлтэс өөрчлөх</h2>
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
              {department && department.map((d) => {
                if (deId !== d.id) {
                  return (
                    <MenuItem key={d.id} value={d.id}>
                      {d.name}
                    </MenuItem>
                  )
                }
              })}
            </TextField>
          </form>

          <Button
            onClick={handleSaveButtonClick}
            color="success"
            size="sm"
            round
          >
            Хадгалах
          </Button>
        </div>
      </Modal>
      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Хэлтэс устгах</h2>
          <h4>Та дараах хэлтэсийг устгахдаа итгэлтэй байна уу?</h4>
          <form>
            <TextField disabled value={name} onChange={(value) => setName(value.target.value)} className={classes.depInput} label="Нэр" variant="outlined" />
            <TextField disabled value={desc} onChange={(value) => setDesc(value.target.value)} className={classes.depInput} label="Тайлбар" variant="outlined" />
            <TextField
              disabled
              value={root}
              onChange={(value) => setRoot(value.target.value)}
              className={classes.depInput}
              select
              label="Толгой хэлтэс"
              variant="outlined"
              helperText="Сонгоно уу?"
            >
              {department && department.map((d) => {
                if (deId !== d.id) {
                  return (
                    <MenuItem key={d.id} value={d.id}>
                      {d.name}
                    </MenuItem>
                  )
                }
              })}
            </TextField>
          </form>

          <Button
            onClick={handleDeleteButtonClick}
            color="danger"
            size="sm"
            round
          >
            Устгах
          </Button>
          <Button
            onClick={() => setDeleteModalOpen(false)}
            size="sm"
            round
          >
            Болих
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
            <Button onClick={() => {
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
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
