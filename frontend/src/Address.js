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
                    <td width='100%'>
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
                    this.setUpdatedBox()
                }
                this.forceUpdate()
                //this.render()
            })
    }

    setUpdatedBox() {
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

    submitPerson() {
        if (this.state.name === undefined || this.state.name === '') {
            console.log('Name must not be empty')
            return 1
        }

        let person = {
            name: this.state.name,
            address: this.state.address.street + ' ' + this.state.address.number + ', ' + this.state.address.city,
            latitude: this.state.address.latitude,
            longitude: this.state.address.longitude
        }

        fetch('api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        })
            .then(response => {
                if (response.status === 201)
                    window.location.reload()
            })
    }

    render() {
        if (!this.isSubmitted)
            return this.defaultBox
        else
            return this.submittedBox
    }

}

export default withRouter(Address)