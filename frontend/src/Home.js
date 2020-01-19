import React, { Component } from 'react'
import './App.css'
import { Container, ListGroup, ListGroupItem, Table } from 'reactstrap'
import Address from './Address'
import logo from './logo.svg'
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
        const userList = (users.length === 0) ?
            <ListGroupItem><b>User list is empty!</b></ListGroupItem>
            :
            users.map(user => {
                return <ListGroupItem><b>{user.name}</b> {user.address} {user.latitude} {user.longitude}</ListGroupItem>
            })

        return (
            <div>
                <Container>
                    <Table borderless>
                        <tbody>
                            <td>
                                <img src={logo} alt='Ally logo' width='128' />
                            </td>
                            <td>
                                <h4>User coordinates App</h4>
                            </td>
                        </tbody>
                    </Table>
                    <Table borderless>
                        <Address />
                    </Table>

                    <br />

                    <h3>Users</h3>
                    <ListGroup variant="flush">{userList}</ListGroup>
                </Container>
            </div>
        )
    }
}

export default Home