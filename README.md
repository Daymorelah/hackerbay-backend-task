
# Solution to the back-end task

A simple stateless microservices in Node.js that has functionalities that include: 
- Authentication
- JSON patching
- Image Thumbnail Generation

Features:
- User can signup and signin to the microservice
- User can apply json patch to a json object to update it
- User can resize an image to a thumbnail size and get  the thumbnail-sized image back
- User can view the list of users already registered on the microservice


### API Documentation
The Documentation for the PostIt Restful API: 
The documentation is currenly being worked on.

## TECHNOLOGIES
#### Backend
This microservice was implemented using: 
 * [Node](https://nodejs.org/en/) Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine
 * [Express](https://expressjs.com/) Express is a minimal and flexible Node.js web application framework 
 * [Sequelize](http://docs.sequelizejs.com/) Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL
 * [Postgres](https://www.postgresql.org/) A powerful, open source object-relational database system.

### INSTALLATION
  * install [Node js](https://nodejs.org/en/) and [Postgress](https://www.postgresql.org/)
  * Clone the repository `git clone https://github.com/Daymorelah/hackerbay-backend-task`
  * Navigate to the location in your terminal
  * Run `npm install` to install dependencies
  * Setup Postgres, create a database `backend-task` and set it to any port number [Setup postgress](http://certek.com/kb4/install-server-postgresql-and-pgadmin-on-windows/)
  * Install sequelize-cli, Run `npm install -g sequelize-cli` (note: sudo install on ubuntu or MAC)
  * In terminal run $ sequelize db:migrate
  * Run `npm start` to get the app started on your local machine
  
## TESTING
#### Server side
To run tests for the server side
* Navigate to the project location in your terminal
* Run `npm run test`

### Contributing
1. Fork this [repository](https://github.com/Kenec/PostIt.git) 
2. Clone to your local environment: `https://github.com/Kenec/PostIt.git`
3. Create your feature branch: `git checkout -b my-new-feature`
4. Commit your changes: `git commit -am 'Add some feature'`
5. Write test for the new features
6. Push to the branch: `git push origin my-new-feature`
7. Submit a pull request against the `staging` branch


## FAQ
* Is this project an open source?
   * Yes it is
* Can I use this app for commercial purpose
   * This project is license under the MIT licence, hence you can use it for commercial purpose

## ISSUES
To report an issue or give feedback, Click link
[Issues and Feedback](https://github.com/Kenec/PostIt/issues)

## Authors
* Ademola Hussain

## Licence 
