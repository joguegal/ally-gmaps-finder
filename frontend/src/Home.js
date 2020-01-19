import React, { Component } from 'react'
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
                    <h2><img src={logo} alt='Ally logo' width='128' /> Google Maps Finder / Person Register</h2>
                    <br/>
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