import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends React.Component {
    constructor(){
        super();
        this.state = {
            text:'',
            title:'',
            id:'',
            theme:false
        };
    }

    componentDidMount = () => {
        this.setState({
            text:this.props.selectedNote.body,
            title: this.props.selectedNote.title,
            id:this.props.selectedNote.id
        });
    }

    componentDidUpdate = () => {
        if(this.props.selectedNote.id !== this.state.id){
            this.setState({
                text:this.props.selectedNote.body,
                title: this.props.selectedNote.title,
                id:this.props.selectedNote.id
            });
        }
    }
    render(){
        const {classes} = this.props;

        return (
            <div className={`classes.root ${this.state.theme ? "classes.root_dark" : ""}`}>
                <div className={classes.editorContainer}>
                    <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
                    <img src='dark.jpg'  className={classes.darkIcon} onClick={() => this.darkMode()} alt="darkmode.png" width="20px" height="20px"/>
                    <input className={classes.titleInput}
                    placeholder='Note Title...'
                    value={this.state.title? this.state.title : ''}
                    onChange={(e)=> this.updateTitle(e.target.value)}></input>
                    <ReactQuill value={this.state.text} 
                    // we are just passing function here so this.updateBody works
                    onChange={this.updateBody}>
                    </ReactQuill>
                </div>
            </div>
        );
    }
    darkMode = () => {
        if(this.state.theme)
        this.setState({theme : false});
        else
        this.setState({theme : true});
        console.log('click');
        //this.setState({theme : !this.state.theme});

    }
    updateBody = async(val) => {
        await this.setState({text:val});
        // we are calling a function here so this.update() is called here
        this.update();
    };
    updateTitle = async (txt) => {
        await this.setState({title:txt});
        this.update();
    }
    update = debounce(
        () => {
            this.props.noteUpdate(
                this.state.id, {
                    title: this.state.title,
                    body: this.state.text
                }
            )
        }, 1500);
}
//classes  -> this.props.classes.className
export default withStyles(styles)(EditorComponent);