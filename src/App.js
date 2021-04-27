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
  await this.setState({ notes: [...this.state.notes, note] });
  const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(note => note.id === newId)[0])
  this.setState({selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex});
  }

  deleteNote = async (_note) => {
    const noteIndex = this.state.notes.indexOf(_note);
  
    await this.setState({notes: this.state.notes.filter(note => note !== _note)});

    if(this.state.selectedNoteIndex === noteIndex){
      this.setState({ selectedNoteIndex:null,selectedNote: null }); 
    }
    else{
      this.state.notes.length > 1 ? this.selectNote(this.state.notes[noteIndex-1], noteIndex-1) : 
      this.setState({ selectedNoteIndex:null, selectedNote:null });
    }
    firestore.collection('notes').doc(_note.id).delete();
  }
}

export default App;
