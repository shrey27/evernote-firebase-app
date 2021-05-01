import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItemComponent extends React.Component{

    render(){
        const  {index, note, classes, selectedNoteIndex} = this.props;

        return(
            <div key={index}>
                <ListItem
                className={classes.listItem}
                selected={selectedNoteIndex === index}
                align-item='flex-start'>
                    <div 
                        className={classes.textSection}
                        onClick={() => this.selectNote(note,index)}>
                            <ListItemText
                            primary={note.title}
                            secondary={removeHTMLTags(note.body.substring(0,20)) + '...'}>
                            </ListItemText>
                    </div>
                    <DeleteIcon onClick={() => this.deleteNote(note)}
                    className={classes.deleteIcon}></DeleteIcon>
                </ListItem>
            </div>
        )
    }
    selectNote = (n,i) => {
        this.props.selectNote(n,i);
    }
    deleteNote = (note)  => {
        // `` or double ticks allow user to enter string along with JSX syntax inside JS functions
        if( window.confirm(`You are about to delete note: ${note.title}`)){
            this.props.deleteNote(note);
        }
    }
}

export default withStyles(styles)(SidebarItemComponent);

