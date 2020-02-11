# dockerized-mircoservices
Two dockerized microservices (emphasis on the micro) that provide a JSON API over HTTP.

# Depolyment details
Run `docker-compose up --build` to deploy on your local machine. 

If deploying to a swarm cluster run `docker stack deploy -c stack.yml dockerized-api`.
This will require the images to have be created already. 
Ensure swarm is initialised using `docker swarm init`

Note: specify `-d` flag to run either of the above commands in detached mode.

# Perform POST request /api
`curl -X POST -H "Content-Type:application/json" http://localhost:8080/api -d '{"message": "Hi again, World"}'`

# Perform POST request /reverse
`curl -X POST -H "Content-Type:application/json" http://localhost:8081/reverse -d '{"message": "Hi again, World"}'`

# CI/CD
To deploy this application to a production environment, it would be recommended you create a CI/CD pipline. This could be done using AWS CodePipeline. The ideal flow would look as such...

code->build->test->release->deploy

(See `Pipeline-for-dockerized-microservices.png` for an visualisation of how this could be implemented in AWS)

**code:** Code for the application would need to be stored in version control, either GitHub or AWS Code Commit. Every change to the source code should trigger a new build so fast feedback can be delivered to the developers.

**build:** Involves building the image/s for the application can ustilise AWS CodeBuild. This is an artifact that we can store and version.

**test:** Ideally there would be a testing phase that creates a container based on the image. Tests can thnen be perform against this container to see if the appliation is running as desired.

**release:** Once we are happy that the image has passed all the tests and is fit for pupose, we can create a new release for the image and push the new image to a container registry (Amazon ECR).

**deploy:** The final stage is to deploy to production, Amazon ECS can be levereaged to orchestrate container deployments

# Avoid system downtime
To avoid system downtime in a production enviornment, deployment stategy such as blue-green deployment could be implemented. 

Blue-green deployment will consist of two identical environments, in front of which there is a load balancer that allows you to direct traffic to the appropriate environment. All currrent traffic could be routed to one environment, say blue, whislt the new release release could be routed to the other environment, say green. Once we are happy the deployment to the green environemnt is successful we can routing traffic to the green environment. This should mitigate system downtime.
