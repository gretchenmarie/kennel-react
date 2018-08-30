import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Animal.css"

export default class AnimalEdit extends Component {
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
    editTheAnimal = evt => {
        evt.preventDefault()
         {
            const animal = {
                name: this.state.animalName,
                breed: this.state.breed,

            }

            this.props.editAnimal(animal).then(() => this.props.history.find("/animals"))
        }
    }


      render() {

          return (
              <React.Fragment>

            <section className="editinganimals">
                {
                    this.props.animals.map(animal =>
                        <div key={animal.id} className="card">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {animal.name}
                                    <Link className="nav-link" to={`/animals/${animal.id}`}>edit</Link>
                                    <button onClick={() => this.props.editAnimal(animal.id)}
                                        className="card-link">Edit Animal</button>
                                </h5>

                            </div>
                        </div>
                    )
                }
            </section>
            </React.Fragment>


          )}
   };
