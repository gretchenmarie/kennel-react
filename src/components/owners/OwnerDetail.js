import React, { Component } from "react"
import "./Owners.css"



export default class OwnerDetail extends Component {
    render() {
        /*
            Using the route parameter, find the employee that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        const owner = this.props.owners.find(a => a.id === parseInt(this.props.match.params.ownerId)) || {}

        return (
            <section className="owner">
                <div key={owner.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">

                            {owner.name}
                        </h4>
                        <h6 className="card-title">{owner.phone}</h6>
                        
                        <button
                            onClick={() => this.props.deleteowner(owner.id)
                                            .then(() => this.props.history.push("/owners"))}
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}