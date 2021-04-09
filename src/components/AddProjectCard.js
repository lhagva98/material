import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import { firestore } from 'firebase';

import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router";

const styles = {
  gridStyle: {
    alignSelf: 'stretch',
  },
  projectCard: {
    cursor: "pointer",
    height: "100%",
    marginBottom: 0,
    marginTop: 0,
    backgroundColor: '#E3E7EF',
    border: '2px dashed #838383',
    justifyContent: 'center',
    alignItems: 'center',
  },
  round: {
    display: 'flex',
    width: 75,
    height: 75,
    backgroundColor: '#00A38915',
    borderRadius: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 100
  }
}

const useStyles = makeStyles(styles);

export default () => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    const newDoc = firestore().collection('projects').doc()

    newDoc.set({
      id: newDoc.id,
      title: 'Шинэ төсөл',
      due: '11-р сар',
      type: 'Барилга',
      percent: 85,
    }).then(() => {
      console.log("addProjectCardd clicked");
      history.push(`project/${newDoc.id}`);
    })
  }

  return (
    <GridItem xs={3} >
      <Card
        onClick={handleClick}
        className={classes.projectCard}
      >
        <div className={classes.round}>
          <AddIcon fontSize="large" />
        </div>
      </Card>
    </GridItem>
  )
}