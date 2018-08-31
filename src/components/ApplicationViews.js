import { Route, Redirect } from "react-router-dom"
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import AnimalDetail from './animal/AnimalDetail'
import AnimalManager from '../modules/AnimalManager'
import EmployeeForm from './employee/EmployeeForm'
import AnimalForm from './animal/AnimalForm'
import AnimalEdit from './animal/AnimalEdit'
import EmployeeManager from '../modules/EmployeeManager'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import EmployeeDetail from './employee/EmployeeDetail'
import OwnerList from './owners/OwnerList'
import OwnerDetail from './owners/OwnerDetail'
import Login from './login/Login'
import "./nav/NavBar.css"
import "./animal/Animal.css"

export default class ApplicationViews extends Component {
    isAuthenticated = () => localStorage.getItem("credentials") !== null
    state = {
        locations: [],
        animals: [],
        employees: [],
        owners: [],
        isLoaded: false,
    }

    componentDidMount() {
        const newState = {}

        AnimalManager.getAll()
            .then(animals => newState.animals = animals)
        EmployeeManager.getAll()
            .then(employees => newState.employees = employees)
            .then(() => fetch("http://localhost:5002/locations")
                .then(r => r.json()))
            .then(locations => newState.locations = locations)
            .then(() => fetch("http://localhost:5002/owners")
                .then(r => r.json()))
            .then(owners => newState.owners = owners)
            .then(() => this.setState(newState))


    }
    addAnimal = animal => AnimalManager.post(animal)
        .then(() => AnimalManager.getAll())
        .then(animals => this.setState({
            animals: animals
        }))
    editAnimal = animal => AnimalManager.edit(animal)
        .then(() => AnimalManager.getAll())
        .then(animals => this.setState({
            animals: animals
        }))

    deleteAnimal = id => {
        return fetch(`http://localhost:5002/animals/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/animals`))
            .then(e => e.json())
            .then(animals => this.setState({
                animals: animals
            }))
    }

    addEmployee = employee => EmployeeManager.post(employee)
        .then(() => EmployeeManager.getAll())
        .then(employees => this.setState({
            employees: employees
        }))

    deleteEmployee = id => {
        return fetch(`http://localhost:5002/employees/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/employees`))
            .then(e => e.json())
            .then(employees => this.setState({
                employees: employees
            }))
    }
    deleteOwner = id => {
        return fetch(`http://localhost:5002/owners/${id}`, {
            method: "DELETE"
        })
            .then(e => e.json())
            .then(() => fetch(`http://localhost:5002/owners`))
            .then(e => e.json())
            .then(owners => this.setState({
                owners: owners
            }))
    }
    render() {
        return (
            <div className="stylenavbar">

                <React.Fragment>
                    <Route path="/login" component={Login} />
                    <Route exact path="/" render={(props) => {
                        return <LocationList locations={this.state.locations} />
                    }} />
                   
                    <Route exact path="/employees" render={props => {
                        if (this.isAuthenticated()) {
                            return <EmployeeList {...props}
                                deleteEmployee={this.deleteEmployee}
                                employees={this.state.employees} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }} />
                    <Route path="/employees/:employeeId(\d+)" render={(props) => {
                        return <EmployeeDetail {...props}
                            deleteEmployee={this.deleteEmployee}
                            employees={this.state.employees} />
                    }} />
                    <Route path="/employees/new" render={(props) => {
                        return <EmployeeForm {...props}
                            addEmployee={this.addEmployee} />
                    }} />
                    <Route exact path="/animals" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <AnimalList {...props}
                                deleteAnimal={this.deleteAnimal}
                                animals={this.state.animals} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }} />
                    <Route path="/animals/:animalId(\d+)" render={(props) => {
                        return <AnimalDetail {...props}
                            deleteAnimal={this.deleteAnimal}
                            animals={this.state.animals}
                            employees={this.state.employees} />
                    }} />
                    <Route path="/animals/new" render={(props) => {
                        return <AnimalForm {...props}
                            addAnimal={this.addAnimal}
                            employees={this.state.employees} />
                    }} />
                    <Route path="/animals/:animalId(\d+)" render={(props) => {
                        return <AnimalEdit {...props}
                            animals={this.state.animals}
                            editAnimal={this.editAnimal} />
                    }} />
                    <Route exact path="/owners" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <OwnerList {...props}
                                deleteOwner={this.deleteOwner}
                                owners={this.state.owners} />
                        } else {
                            return <Redirect to="/login" />
                        }
                    }} />
                    <Route path="/owners/:ownerId(\d+)" render={(props) => {
                        return <OwnerDetail {...props}
                            deleteOwner={this.deleteOwner}
                            owners={this.state.owners} />
                    }} />

                </React.Fragment>
            </div>
        )
    }
}
