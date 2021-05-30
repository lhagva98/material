import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import moment from 'moment';
import WorkIcon from '@material-ui/icons/Work';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { firestore } from 'firebase'
import { useParams } from "react-router";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TurnedIn from '@material-ui/icons/TurnedIn';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

// id: data.id,
// title: data.title,
// start: new Date(data.start),
// end: new Date(data.end)

const WorkEvent = ({ start, eventId, handleAddMaterial }) => {
    const [open, setOpen] = useState(false);
    const [activivites, setActivities] = useState([]);
    const { id } = useParams()
    useEffect(() => {
        firestore().collection(`projects/${id}/events/${eventId}/activities`).onSnapshot(snap => {
            if (!snap.empty) {
                let result = []
                snap.forEach(doc => {
                    result.push(doc.data());
                })
                setActivities(result)
            } else {
                setActivities([]);
            }
        })
    });

    return (
        <div>
            <ListItem button onClick={() => setOpen(!open)}>
                <ListItemAvatar>
                    <Avatar>
                        <WorkIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${moment(start).format('YYYY-MM-DD')}`} />
                {open ? <ExpandLess /> : <ExpandMore />}

            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit style={{ paddingLeft: 4, paddingRight: 10 }}>
                <List component="div" disablePadding>
                    {
                        activivites && activivites.map((item) => {
                            if (item.name && item.name !== "") {
                                return (
                                    <ListItem button onClick={() => {handleAddMaterial(item)}}>
                                        <ListItemIcon>
                                            <TurnedIn />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                )
                            } else {
                                return (<> </>)
                            }
                        })
                    }
                </List>
            </Collapse>
        </div>
    )
}

const UpcomingEvent = ({ events, handleAddMaterial }) => {
    const classes = useStyles();
    let filteredEvents = [];
    const now = new Date();
    if (events) {
        filteredEvents = events.filter((item) => {
            return item.start.getTime() >= now.getTime()
        }).sort((a, b) => a.start.getTime() - b.start.getTime())
    }
    return (
        <Card>
            <CardHeader
                title="Upcoming events"
                subheader={`Өнөөдөр: ${moment().format('YYYY-MM-DD')}`}
            />
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >
                {
                    filteredEvents && filteredEvents.map((item) => (<WorkEvent start={item.start} eventId={item.id}  handleAddMaterial={handleAddMaterial}/>))
                }

            </List>
        </Card>

    );
}

export default UpcomingEvent;