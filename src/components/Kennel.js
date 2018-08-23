import React, { Component } from 'react'
import EmployeeList from "./employee/EmployeeList" // Import EmployeeList component
import LocationList from "./locations/LocationList" // Import EmployeeList component



export default class Kennel extends Component {
    render() {
        return (
            <div>
                <h3>Student Kennels</h3>
                <h4>See our new location</h4>
                <h5>North and South locations open</h5>
                <EmployeeList />
                <LocationList/>
            </div>
        );
    }
}