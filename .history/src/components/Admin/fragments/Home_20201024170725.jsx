import React, { Component } from 'react';
const useStyles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});
        

class HomeFragment extends Component {
    constructor() {
        super();
        this.state = {
            render: '',
            open: false,
            home: true,
        }
        // this.handleHotelClick = this.handleHotelClick.bind(this);    
    }
     
    render() {
        
       
       
        return (
            <div className={classes.root}>
            </div>

        );
      
        
    
    }
   
}
export default withStyles(useStyles)(HomeFragment)