import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import './App.css'
import { Input, InputGroup, Button } from 'reactstrap'

class Address extends Component {

    constructor(props) {
        super(props)
        this.state = { address: [] }
        this.isSubmitted = false

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.defaultBox =
            <tbody>
                <tr>
                    <td>
                        <InputGroup>
                            <Input placeholder="Address" onChange={event => this.handleChange(event)}></Input>
                        </InputGroup>
                    </td>
                    <td>
                        <Button size="sm" color="primary" type="submit" onClick={(e) => this.handleSubmit(e)}>Check</Button>
                    </td>
                </tr>
            </tbody>
        this.submittedBox = ''
    }

    handleChange(event) {
        this.setState({ address: event.target.value })
    }

    setNamePerson(event) {
        this.setState({ address: this.state.address, name: event.target.value })
    }

    submitPerson() {

    }

    async handleSubmit(event) {
        event.preventDefault()
        //Not Working
        fetch(`api/getAddress/${this.state.address}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ address: data })
                console.log(data)
                console.log(this.state.address.latitude)
                if (data !== []) {
                    this.isSubmitted = true
                    this.submittedBox = <tbody>
                        <tr>
                            <td>{this.state.address.street} {this.state.address.number}, {this.state.address.city}</td>
                        </tr>
                        <tr>
                            <td>{this.state.address.latitude} {this.state.address.longitude}</td>
                        </tr>
                        <tr>
                            <td>
                                <InputGroup>
                                    <Input placeholder="Name" onChange={(event) => this.setNamePerson(event)}></Input>
                                </InputGroup>
                            </td>
                            <td>
                                <Button size="sm" color="primary" type="submit" onClick={() => this.submitPerson()}>Submit</Button>
                            </td>
                        </tr>
                    </tbody >
                }
                this.forceUpdate()
                //this.render()
            })
    }

    render() {
        if (!this.isSubmitted)
            return (
                this.defaultBox
            )
        else
            return (
                this.submittedBox
            )
    }

}

export default withRouter(Address)