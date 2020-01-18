import React, { Component } from 'react'
import './App.css'
import { Input, InputGroup, Button } from 'reactstrap'

class Address extends Component {

    constructor(props) {
        super(props)
        this.state = { address: '' }
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
        this.submittedBox = <tbody><tr><td>{this.state.address}</td></tr><tr><td>Hola</td></tr></tbody>
    }

    handleChange(event) {
        this.setState({ address: event.target.value })
    }

    async handleSubmit(event) {
        event.preventDefault()
        //Not Working
        await fetch('http://localhost:6000/api/address/' + this.state.address)
            .then(data => {
                this.setState({ address: data })
                this.isSubmitted = true
                this.render()
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

export default Address