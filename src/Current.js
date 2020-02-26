import React, { Component } from 'react'

class Current extends Component {
    constructor(){
        super();
        this.state = {
            lat : '',
            lng: '',
            pos: ''
        };
    }
    render() {
        navigator.geolocation.getCurrentPosition((position) => {
                this.setState({lat: position.coords.latitude,
                                lng:position.coords.longitude,
                                pos: position}) ;
                                            
                            });
        return (
            <div>
                {console.log(this.state.pos)}
                
            </div>
        )
    }
}
export default Current;