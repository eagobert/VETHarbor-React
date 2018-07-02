import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import Profile from '../Profile/Profile'
import EventList from '../Events/EventList'
import Search from '../Search/Search'
import '../UserView/UserView.css'
import { Grid } from '@material-ui/core'


class UserView extends Component{
    constructor(props){
        super(props)
        this.state = {
            eventId: '',
            ActiveUser: JSON.parse(localStorage.getItem("ActiveUser"))
        }
    }
    
    
    handleEventSave = (evt) => {

        //fetch events and post user's saved events
        fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: (evt.currentTarget.id),
                userId: this.state.ActiveUser.id
            })
        })
        .then(r => r.json())
        .then(event => {
            this.setState({
                eventId: event.id
            })
        })

        console.log("event target id", evt.currentTarget.id)
    }

    render(){
        return(
        <Grid container className="user-view" spacing={40}>

                {/* These components are grid items */}
                <Navbar showView={this.props.showView}/>
                <Profile key={this.state.ActiveUser.id}/>
                <Search handleEventSave={this.handleEventSave}/>
                <EventList key={this.state.eventId}/>
   
           
        </Grid>
        )
    }
}

export default UserView