import React, { useEffect, useState } from "react";
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
import { firestore } from "firebase";

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
  (mm > 9 ? '' : '0') + mm,
  (dd > 9 ? '' : '0') + dd
  ].join('-');
};

const styles = {
  projectCard: {
    cursor: "pointer",
    marginBottom: 25,
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
  const [progress, setProgress] = useState(null);

  const handleClick = () => {
    history.push(`project/${project.id}`);
  }

  useEffect(() => {
    firestore().collectionGroup(`materials`)
      .where("projectId", "==", project.id)
      .get()
      .then(snapshot => {
        let rtotal = 0, tcompleted = 0;
        snapshot.forEach(sDoc => {
          rtotal = rtotal + 1;
          const data = sDoc.data();

          if (data.checked) tcompleted = tcompleted + 1;
        })
        setProgress((tcompleted / rtotal) * 100)
      })
  }, [])

  return (
    <GridItem xs={3} >
      <Card
        onClick={handleClick}
        className={classes.projectCard}
      >
        <CardHeader>
          <div className={classes.headerDetails} >
            {/* barilgiin turul */}
            <Chip label={project.type ? project.type : null} size="small" />
            {/* Created Date */}
            {project.createdAt ? <div> {new Date(project.createdAt).yyyymmdd()}</div> : null}
          </div>
          {/* Title */}
          <div style={{ marginTop: 8 }}>
            <span className={classes.titleText} >{project.title ? project.title : null}</span>
          </div>
        </CardHeader>
        <CardBody>
          <div>
            {/* last edited */}
            <span className={classes.timeText} >15 минутын өмнө шинэчлэгдсэн</span>
          </div>
          <LinearProgressWithLabel value={progress} />
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