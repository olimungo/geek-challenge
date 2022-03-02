# geek-challenge

This project is a playground for building a web application.

It is composed of:

-   a Redis database (with persistence)
-   a back-end using nodejs and express
-   a front-end using React (TypeScript), TailwindCSS, daisyUI and React-icons

The front-end and the back-end communicate using an HTTP REST API.

Your machine should be configured at least with: git, nodejs, docker and docker-compose.

Once this project has been pull out from GitHub, execute the following command in the front-end and back-end folder:

```
> npm i
```

## Development

All the commands below assume that you're in the root directory of this project.

### Redis

To start the Redis container for the database:

```
> npm start
```

To stop the same container:

```
> npm stop
```

### Back-end

To start the back-end server which is configured to restart each time a file is modified:

```
> npm run back-end
```

To stop it, just use CTRL-C.

### Front-end

To start the front-end server which is configured to restart each time a file is modified and update the browser:

```
> npm run front-end
```

To stop it, just use CTRL-C.

## Test

When you'd like to check if the project works when packed into containers:

```
> npm test
```

This will launch the build of the front-end and back-end, then creates the images for docker, and lastly will launch the docker-compose command to start-up the containers. Don't forget to stop the Redis container that you started while developing (=> npm stop).

The web application should be available at: http://localhost:8080  
The back-end should be available at: http://localhost:9100

To stop the containers:

```
> npm run stop-test
```

## Production

### Build and push images to DockerHub

For this step to work, you should be logged in to your DockerHub account.

To build the containers for the Raspberry Pi and push the images to dockerhub, type:

:exclamation::exclamation::exclamation: Don't forget to update the _rpi_version_ (section _config_) in the package.json files in the front-end and back-end folders :exclamation::exclamation::exclamation:

```
> npm run build-rpi
```

### Pull images from the Raspberry Pi

Connect with ssh to the Raspberry Pi and make sure docker and docker-compose are installed properly.

If it does not yet exist, create a file docker-compose.yml and copy the content of the file docker-compose.prod.yml in the root directory of this project. Don't forget to update the version of the image that you'd like to pull and use on the Pi. It should fit the version number that you just used when building the containers for the Pi.

Then type:

```
> docker-compose up -d
```
