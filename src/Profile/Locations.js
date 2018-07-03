import React, { Component } from 'react'
import { Card, Grid, Typography } from '@material-ui/core'
import { Chip } from 'react-materialize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../Profile/Profile.css'

class Locations extends Component {

    constructor(props){
        super(props)
        this.state = {
            locations: [],
            userHome: ''
        }
    }

    setUserLocation = () => {
        //Get active user
        let ActiveUser = JSON.parse(localStorage.getItem("ActiveUser"))

        //fetch active users home location
        fetch(`http://localhost:8088/users/${ActiveUser.id}`)
        .then(r => r.json())
        .then(activeUser => {
            //console.log("active user", activeUser)
            this.setState({
                userHome: activeUser.city + ", " + activeUser.state
            })

            //fetch active user's locations of interest
            return fetch(`http://localhost:8088/locations?userId=${ActiveUser.id}`)
        })
        .then(r => r.json())
        .then(locations => {
            this.setState({
                locations: locations
            })
            console.log(this.state)
        })
    }
    //Fetch interests from interest table in Api belonging to the active user
    componentDidMount(){
        this.setUserLocation()
    }

    render(){
        const button =                        <FontAwesomeIcon className="icon" icon="times-circle" size="lg" />
     
        return(
            <Grid item className="locations" xs={12}>
                <Grid container direction="row" spacing={16}>
                    <Grid item xs={12}>
                        <Typography variant="subheading"> My Locations</Typography>
                    </Grid>
                    <Grid item xs={12} >
                        <Card className="locations-card" raised>
                            <Grid container direction="row" justify="flex-start" alignItems="center" wrap="wrap" spacing={0}>
                                <Grid item xs>
                                    <Chip className="chip"> {this.state.userHome}
                                     {button} 
                                    </Chip>
                                </Grid>
                               
                                {this.state.locations.map(location => {
                                    return <Grid key={location.id} item xs><Chip className="chip" key={location.id}>{location.location} {button}</Chip> </Grid>
                                })}
                            </Grid>
                        </Card>

                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default Locations