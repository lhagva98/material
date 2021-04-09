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
import { useHistory } from "react-router";

import { AttachFile } from '@material-ui/icons';

const styles = {
  projectCard: {
    cursor: "pointer",
    marginBottom: 0,
    marginTop: 0,
  },
  headerDetails: {
    display: "flex",
    justifyContent: 'space-between',
  },
  footerDetails: {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attachIcon: {
  },
  timeText: {
    color: "#a2a2a2",
    fontSize: 11
  },
  titleText: {
    fontSize: 18,
    fontWeight: "500",
  },
}

const useStyles = makeStyles(styles);

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default ({ project }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(`project/${project.id}`);
  }

  return (
    <GridItem xs={3} >
      <Card
        onClick={handleClick}
        className={classes.projectCard}
      >
        <CardHeader>
          <div className={classes.headerDetails} >
            <Chip label={project.type ? project.type : null} size="small" />
            <div>
              Due: {project.due ? project.due : null}
            </div>
          </div>
          <div style={{ marginTop: 8 }}>
            <span className={classes.titleText} >{project.title ? project.title : null}</span>
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <span className={classes.timeText} >15 минутын өмнө шинэчлэгдсэн</span>
          </div>
          <LinearProgressWithLabel value={project.percent ? project.percent : null} />
          <div className={classes.footerDetails}>
            <AvatarGroup max={4}>
              <Avatar alt="Remy Sharp" src={require('assets/img/tim_80x80.png')} />
              <Avatar alt="Travis Howard" src={require('assets/img/tim_80x80.png')} />
              <Avatar alt="Cindy Baker" src={require('assets/img/tim_80x80.png')} />
            </AvatarGroup>
            <AttachFile className={classes.attachIcon} />
          </div>
        </CardBody>
      </Card>
    </GridItem>
  )
}