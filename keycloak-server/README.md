A demo Keycloak server for local dev work on the RH Product Trials SPA.

In order to run this server you must have Docker and Docker Compose installed on your local system.

## Setup

* Change directory into the project directory and run `docker-compose up -d`
* The `docker-compose.yml` will set up the server and import the realm we need for the SPA.
* This import creates a test user with the name:password of test:test.
* To make changes to the server visit http://localhost:8080/ and log in with admin:admin

## Export Realm Changes

If you make changes to the realm run the `export-realm.sh` script.

`./export-realm.sh`

## Resources

* [Docker Hub - jboss/keycloak](https://registry.hub.docker.com/r/jboss/keycloak)
* A helpful post on Keycloak [Authorise React Routes & Component with Keycloak](https://cagline.medium.com/authenticate-and-authorize-react-routes-component-with-keycloak-666e85662636).
