import React, { Component } from "react"
import "./Animal.css"
import dog from "./DogIcon.png"
import EmployeeDetail from "../employee/EmployeeDetail";


export default class AnimalDetail extends Component {
    render() {
        /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        const animal = this.props.animals.find(a => a.id === parseInt(this.props.match.params.animalId)) || {}
        const employee = this.props.employees.find(e => e.id === animal.employee) || ""
        console.log(employee);
        return (
            <section className="animal">
                <div key={animal.id} className="card">
                    <div className="card-body">
                        <h2 className="card-title">
                            <img src={dog} className="icon--dog" alt="dog" />
                            {animal.name}
                        </h2>
                            <h2>{employee.name}</h2>
                        <h4 className="card-title">{animal.breed}</h4>


                        <button
                            onClick={() => this.props.deleteAnimal(animal.id)
                                .then(() => this.props.history.push("/animals"))}
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}
