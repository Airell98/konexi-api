# Deployment Docs

- Push the code to the GitHub repository.
- Create an EC2 instance on AWS with free tier.
- Download the .pem keys on the EC2 instance.
- Obtain the SSH command on AWS and connect your local system to the EC2 instance via the terminal `ssh -i "path_to_your_key" ec2-user@ec2-13-229-71-108.ap-southeast-1.compute.amazonaws.com`.
- Once connected, install Node.js, Git, and MongoDB using the yum package manager.
- Clone the repository on the EC2 instance inside the /home/ec2-user directory.
- Redirect the incoming requests from port 80 to port 3000 with this command: sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000
- Build the Nest JS project `sudo yarn build`.
- Set up all the required environment values to run the project.
- Install PM2 `sudo npm install pm2`.
- Run the project in the background with PM2 `sudo pm2 start pm2 start dist/main.js --name <application_name>`.
