import React from 'react';
import './App.css';
import { firestore,timestamp } from './firebaseConfig.js';
import SideBarComponent from './sidebar/sidebar.js';
import EditorComponent from './editor/editor.js';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  render() {  
    return (
    <div className="app-container">
      <SideBarComponent 
      selectedNoteIndex={this.state.selectedNoteIndex}
      notes={this.state.notes}
      newNote={this.newNote}
      deleteNote={this.deleteNote}
      selectNote={this.selectNote}>
      </SideBarComponent>
      {
        this.state.selectedNote ? 
        <EditorComponent 
        selectedNote={this.state.selectedNote}
        selectedNoteIndex={this.state.selectedNoteIndex}
        notes={this.state.notes}
        noteUpdate={this.noteUpdate}>
        </EditorComponent> : null
      }
      </div>
    ); 
  }

  /* componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). 
  Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, 
  this is a good place to instantiate the network request.*/

  /**
   * //  onSnapshot is called whenever 'notes' collection is updated
    // and a function written inside onSnapshot is called
   // severUpdate is a varibale passed to snapShot function, it represents an update to collections is made 
   */  
  componentDidMount = () => {
    firestore.collection('notes')
    .onSnapshot(
      (serverUpdate) => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log(notes);
        this.setState({notes : notes});
      }
    );
  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });
  
  noteUpdate = (id, noteObj) => {
    firestore.collection('notes').doc(id).update({
      title:noteObj.title,
      body:noteObj.body,
      timestamp: timestamp()
    });
    }

  newNote = async (title) => {
    const note = {
      title:title,
      body:''
    };
    const newFromDB = await firestore.collection('notes').add({
      title:note.title,
      body : note.body,
      timestamp: timestamp()
    });

  const newId = newFromDB.id;
  //... its a sread operator which is used to get all the array elements together that are saved in the notes array
  await this.setState({ notes: [...this.state.notes] });
  const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(note => note.id === newId)[0])
  this.setState({selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex});
  }

  deleteNote = async (_note) => {
    var noteIndex = this.state.notes.indexOf(_note);
    var selectIndex = this.state.selectedNoteIndex;
    if(selectIndex === noteIndex){
      this.setState({ selectedNoteIndex:null,selectedNote: null }); 
    }
    else if(selectIndex > noteIndex){
      this.setState({ selectedNoteIndex:selectIndex-1, selectedNote:this.state.notes[selectIndex] });
      /**
      selectedNote: it is the note that is active on editor. So once delete is invoked, on a note which is not
      the selected note ->  this.state.notes[selectIndex] actually picks the selected note object from the notes list 
      and puts it back into the editor component.
      selectedNoteIndex: it is decreased by 1, as it has to update the notes list items in sidebar. As we delete the 
      note that note is removed from the list and so the length of notes also decreases by 1, so the note which was 
      selected so far also shifts up hence its index has to be updated by decreaseing its value. But this doesn't 
      affect the selectedNote object, as it only needs the last selected note and that last selected note is picked 
      from the notes list and re-updated into the editor. 
      */
    }
    firestore.collection('notes').doc(_note.id).delete();
  }
}

export default App;
