import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Animal.css"
export default class EditAnimal extends Component {
    // Set initial state
    state = {
        animalName: "",
        breed: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
    constructEditAnimal = evt => {
        evt.preventDefault()
            const animal = {
                name: this.state.animalName,
                breed: this.state.breed            }

            // Create the employee and redirect user to employee list
            this.props.editAnimal(animal).then(() => this.props.history.push("/animals"))
        }

  render() {
    return (
      <form onSubmit={this.constructEditAnimal}>
        <h1>Edit Animal</h1>
        <label htmlFor="inputName">Animal Name</label>
        <input
          value={this.state.name}
          onChange={this.handleFieldChange}
          type="text"
          id="animalName"
          placeholder="Name"
          required=""
          autoFocus=""
        />
        <label htmlFor="inputBreed">Animal Breed</label>
        <input
          value={this.state.breed}
          onChange={this.handleFieldChange}
          type="text"
          id="breed"
          placeholder="Breed"
          required=""
        />
        <button type="submit">Update</button>
      </form>
    );
  }
}
