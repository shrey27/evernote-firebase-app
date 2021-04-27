import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

class SidebarComponent extends React.Component{
    constructor() {
        super();
        this.state ={
            addingNote:false,
            title:null
        };
    }
    render(){
        const { notes, classes, selectedNoteIndex} = this.props;
        //its an ES6 notation 
        // we can also write, const notes = this.props.notes; and so on for other variable as well
        //this type of declaration means de-structuring od props
        //props are passed as arguements to component declaration
        //classes is provided as arguement by withstyles, so we dont have to provide them separately as props
        if(notes){
        return (
            //classes.sidebarContainer is part of @material-ui/withStyles
            //check the related styles.css file for CSS styling
            <div className={classes.sidebarContainer}>
                <Button
                onClick={this.newNoteBtnClick}
                className={classes.newNoteBtn}>{ this.state.addingNote ? 'Cancel' : 'New Note' }
                </Button>
                {
                    this.state.addingNote ?  
                    <div>
                        <input type="text"
                            className={classes.newNoteInput}
                            placeholder='Enter note Title'
                            onKeyUp={(e) => this.updateTitle(e.target.value)}>
                        </input>
                        <Button 
                        className={classes.newNoteSubmitBtn}
                        onClick={this.newNote}>Submit Note</Button>
                    </div> : 
                    null
                }
                <List>
                    {
                      notes.map((note,index) => {
                          return (
                              <div key={index}>
                                  <SidebarItemComponent
                                  note={note}
                                  index={index}
                                  selectedNoteIndex={selectedNoteIndex}
                                  selectNote={this.selectNote}
                                  deleteNote={this.deleteNote}>
                                  </SidebarItemComponent>
                                  <Divider></Divider>
                              </div>
                          )
                      })  
                    }
                    </List>
                </div>
            );
        }
        else{
            return (<div></div>);
        }
        }

    newNoteBtnClick = () => {
        this.setState({addingNote: !this.state.addingNote, title:null});
    }

    updateTitle = (text) => {
        this.setState({title:text});
    }
    newNote = () => {
        this.props.newNote(this.state.title);
        this.setState({ title:null,addingNote:false});
    }
    selectNote = (n, i) => this.props.selectNote(n, i);
    deleteNote = (note) => this.props.deleteNote(note);
}

export default withStyles(styles)(SidebarComponent);