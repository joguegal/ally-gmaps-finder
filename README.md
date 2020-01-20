# Ally Google Maps coordinates retrieval

This project has been made for Ally internship code test. It consists on three docker containers (microservices) which:

- Database with MongoDB
- The backend one contains a node+express server that retrieve coordinates of a provided address.
- The frontend one consists of a webpage built with React which gets the data from the user and communicates with the server.

## Setting up the containers

To execute all the containers, you'll need to have installed:

- docker
- docker-compose

Simply, in the root folder of this project, open the terminal and type:

```bash
$ docker-compose up --build
```

It will automatically download all the required images from Docker Hub, including mongo and node. Then both backend and frontend projects will install all the necessary dependences.
This proccess should take up to 5 minutes, depending on your network.

To try the App, head to your main browser and type:

- http://localhost:3000/

## Using this application

- Write, for example, 'Tegnergatan 37, Stockholm' in the box.
- Click check, it will return the coordinates from the Google Maps API. Another text box should appear.
- Type there the name of the person you want to add to the database.
- Click Submit, the page will reload, and it will show the person you added before.
