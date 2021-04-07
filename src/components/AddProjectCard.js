import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
// core components
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import AddIcon from '@material-ui/icons/Add';
import { useHistory } from "react-router";

const styles = {
  projectCard: {
    cursor: "pointer",
    height: 222,
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
    console.log("addProjectCardd clicked");
    history.push("add");
  }

  return (
    <GridItem xs={4} >
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