# dockerized-mircoservices
Two dockerized microservices that provide a JSON API over HTTP.

# Prerequisites
 - Ensure `Docker` is installed
 - Ensure `docker-compose` is installed

# Depolyment details
Run `docker-compose up --build` to deploy on your local machine. 

If deploying to a docker swarm cluster:

 - Ensure swarm is initialised using `docker swarm init`
 - To build images run `docker-compose build`
 - Then to deploy `docker stack deploy -c stack.yml dockerized-microservices`.

Note: This project is just a use case, for production deployment ideally images should be stored in public/private registry.

# Perform POST request /api
`curl -X POST -H "Content-Type:application/json" http://localhost:8080/api -d '{"message": "Hello World"}'`

# Perform POST request /reverse
`curl -X POST -H "Content-Type:application/json" http://localhost:8081/reverse -d '{"message": "Hello World"}'`

# CI/CD
To deploy this application to a production environment, it would be recommended you create a CI/CD pipline. This could be done using **AWS CodePipeline**. The ideal flow would look as such...

![aws-pipeline-for-dockerized-microservices](https://github.com/robertpountney92/dockerized-mircoservices/blob/master/aws-pipline-for-dockerized-microservices.png)

The above image can be broken down into the following steps:

**code->build->test->release->deploy**

**code:** Code for the application would need to be stored in version control, either GitHub or **AWS CodeCommit**. Every change to the source code should trigger a new build so fast feedback can be delivered to the developers.

**build:** Involves building the image/s for the application can ustilise **AWS CodeBuild**. This is an artifact that we can store and version.

**test:** Ideally there would be a testing phase that creates a container based on the image. Tests can thnen be perform against this container to see if the appliation is running as desired.

**release:** Once we are happy that the image has passed all the tests and is fit for pupose, we can create a new release for the image and push the new image to a container registry (**AWS ECR**).

**deploy:** The final stage is to deploy to production, **AWS ECS** can be levereaged to orchestrate container deployments

# Avoid system downtime
To avoid system downtime in a production enviornment, deployment stategy such as Canary deployment could be implemented. 

Canary deployments are a pattern for rolling out releases to a subset of users or servers. The idea is to first deploy the change to a small subset of servers, test it, and then roll the change out to the rest of the servers.

Canary deployments can be implemented across containers (or pods in k8s) within a cluster by utilising **rolling updates**. This involves deploying new containers to the cluster and slowly over time decommissioning the old containers and re-reouting all requests to the new containers. This approach should acheive zero downtime.
