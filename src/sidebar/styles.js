const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: '300px',
      boxShadow: '0px 0px 2px black'
    },
    newChatBtn: {
      borderRadius: '0px'
    },
    unreadMessage: {
      color: 'red',
      position: 'absolute',
      top: '0',
      right: '5px'
    },
    newNoteBtn: {
      width: '100%',
      height: '5vh',
      borderBottom: '1px solid black',
      borderRadius: '0px',
      backgroundColor: '#29487d',
      color: 'white',
      'font-size' : '15px',
      '&:hover': {
        textDecoration: 'none',
        color: '',
      }
      
    },
    sidebarContainer: {
      marginTop: '0px',
      width: '35vh',
      height: '100vh',
      boxSizing: 'border-box',
      float: 'left',
      overflowY: 'scroll',
      overflowX: 'hidden'
    },
    newNoteInput: {
      width: '100%',
      margin: '0px',
      height: '35px',
      outline: 'none',
      border: 'none',
      paddingLeft: '5px'
    },
    newNoteSubmitBtn: {
      width: '100%',
      height : '5vh',
      backgroundColor: '#28787c',
      borderRadius: '0px',
      color: 'white',
      'font-size' : '15px'
    }
  });
  
  export default styles;