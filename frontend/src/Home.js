import React, { Component } from 'react'
import './App.css'
import { Container, ListGroup, ListGroupItem, Table } from 'reactstrap'
import Address from './Address'
class Home extends Component {

    constructor(props) {
        super(props)
        this.state = { users: [] }
    }

    componentDidMount() {
        fetch('api/users')
            .then(response => response.json())
            .then(data => this.setState({ users: data }))
    }

    render() {
        const { users } = this.state

        const userList = users.map(user => {
            return <ListGroupItem><b>{user.name}</b> {user.address} {user.latitude} {user.longitude}</ListGroupItem>
        })

        return (
            <div>
                <Container>
                    <Table borderless>
                        <Address />
                    </Table>

                    <br />

                    <h3>Users</h3>
                    <ListGroup>{userList}</ListGroup>
                </Container>
            </div>
        )
    }
}

export default Home