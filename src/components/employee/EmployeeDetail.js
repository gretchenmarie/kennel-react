import React, { Component } from "react"
import "./Employee.css"



export default class EmployeeDetail extends Component {
    render() {
        /*
            Using the route parameter, find the employee that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        const employee = this.props.employees.find(a => a.id === parseInt(this.props.match.params.employeeId)) || {}

        return (
            <section className="employee">
                <div key={employee.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">

                            {employee.name}

                        </h4>
                        <h6 className="card-title">phone:{employee.phone}</h6>
                        <h6 className="card-title">hire date:{employee.hireDate}</h6>
                        <button
                            onClick={() => this.props.deleteEmployee(employee.id)
                                            .then(() => this.props.history.push("/employees"))}
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}