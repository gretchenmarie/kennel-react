import React, { Component } from 'react'
import "./Employee.css"

class EmployeeList extends Component {
    render() {
        return (
            <section className="employees">
                {
                    this.props.employees.map(employee =>
                        <div key={employee.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {employee.name}
                                    <a onClick={() => this.props.deleteEmployee(employee.id)}
                                        className="card-link">Fire Employee</a>
                                </h5>
                            </div>
                        </div>
                    )
                }
            </section>

        )
    }
}

export default EmployeeList