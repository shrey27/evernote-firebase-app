const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: 'auto',
      boxShadow: '0px 0px 2px black'
    },
    root_dark: {
      backgroundColor: 'rgb(246, 250, 249)',
      height: 'calc(100% - 35px)',
      position: 'absolute',
      left: '0',
      width: 'auto',
      boxShadow: '0px 0px 2px black',
      color: '#FF8C00'
    },
    titleInput: {
      height: '50px',
      boxSizing: 'border-box',
      border: 'none',
      padding: '5px',
      fontSize: '24px',
      width: 'calc(100% - 35vh)',
      backgroundColor: '#29487d',
      color: 'white',
      paddingLeft: '50px'
    },
    editIcon: {
      position: 'fixed',
      left: '230px',
      top: '15px',
      color: 'white'
    },
    darkIcon: {
      position: 'absolute',
      right : '10px',
      top: '12px',
    },
    editorContainer: {
      height: '100%',
      boxSizing: 'border-box'
    },
    position: {
      display: 'flex'
    }
  });
  
  export default styles;