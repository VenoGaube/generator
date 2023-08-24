# Steps to test the application and plugin

git clone https://github.com/VenoGaube/generator.git

# Install Angular Project and Run Local Ganache Blockchain

## Installing Angular Project
1. Ensure that you have Node.js and npm (Node Package Manager) installed on your system.
2. Open a terminal or command prompt.
3. Navigate to the directory where you want to create your Angular project.
4. Run the following command to install the Angular CLI globally **Check that the version is 16.2.0 otherwise there will be dependency issues**:  
```
npm install -g @angular/cli
```
5. Once the installation is complete, create a new Angular project using the Angular CLI:  
```
ng new project-name
```
6. Change the directory to your newly created project:  
```
cd project-name
```
7. Run the development server with the following command:
```
ng serve or npm start
```
8. Open your web browser and visit `http://localhost:4200/` to see your Angular project running.

## Running Local Ganache Blockchain
1. Install Node.js and npm if you haven't already (refer to the previous section for instructions).
2. Open a terminal or command prompt.
3. Install Ganache CLI globally by running the following command:
```
npm install -g ganache-cli
```
4. Start the Ganache blockchain by executing the following command:  
```
ganache-cli
```
This will start a local blockchain with default settings and display the generated accounts and private keys.
5. You can also customize the Ganache configuration by providing additional command-line options. Refer to the Ganache CLI documentation for more details.
6. With the Ganache blockchain running, you can connect your applications or development environment to it using the provided endpoint, typically `http://localhost:8545`.

## Setting up a test example project
```
ng new testProject
```
- Add Angular routing
- Pick the CSS stylesheets
  
![image](https://github.com/VenoGaube/mag/assets/56171229/290c1c2d-529f-4240-9d1a-eb4e2e7e2ccf)

- Open Visual Studio Code and in the sidemenu select the "Run and Debug" option and click on "Run extension".

OR

- Open Visual Studio Code, open the magistrskaGenerator folder and install the dependencies using
 
```
npm install
``` 
- Then run the extension with the F5 key.
  
![image](https://github.com/VenoGaube/mag/assets/56171229/0e3a5aae-f04c-4d63-a44c-54a1d8533194)

- Shortcut Ctrl + Shift + P takes you to the extension menu, search for "Generate Marketplace".
  
![image](https://github.com/VenoGaube/mag/assets/56171229/027035af-17ff-4b29-8e85-1c5a7b9dce36)

- Select the src/app folder

![image](https://github.com/VenoGaube/mag/assets/56171229/c6c7564c-4d27-4f47-af47-0b53061906db)

- Select the ecosystem to generate (for now it is only the NFT Marketplace)

![image](https://github.com/VenoGaube/mag/assets/56171229/0653f13f-3550-4d36-8736-81e65a3f55a2)

- Select the desired components

![image](https://github.com/VenoGaube/mag/assets/56171229/31ca9020-a0de-42be-a7b3-01c4f2509e7f)

- If you've selected the Profile component an extra menu pops up to decide on the upload features

![image](https://github.com/VenoGaube/mag/assets/56171229/fa38f981-a61b-4e22-8e47-df24194331a2)

- Then your files will get generated to the src/app location.

![image](https://github.com/VenoGaube/mag/assets/56171229/1a2034c9-32db-46ea-907d-b1bedb6e84c4)

- Run the setup commands in your projects root folder (testProject in this example)

```
npm install
truffle compile
truffle migrate
```

- If any of the 2 truffle commands fail, make sure that you are running the Ganache blockchain locally.

![image](https://github.com/VenoGaube/mag/assets/56171229/d30b4212-66ef-45bc-88f9-dc08ced4afd5)

- After that go to the app.component.html file and remove the by default added code and add the navbar, router outlet and footer components if you've added them

![image](https://github.com/VenoGaube/mag/assets/56171229/6cd952a0-1fe5-4c04-a92c-09865cb1d60b)

- Now run the command and go to http://localhost:4200

```
npm start
```

- Login into your Metamask account and connect to the local Ganache database
- Import an account into the Metamask wallet from the Ganache blockchain

![image](https://github.com/VenoGaube/mag/assets/56171229/1ffdab84-8575-462e-ba6f-b19dfb58dc3b)

- Connect the Ganache account to Metamask

![image](https://github.com/VenoGaube/mag/assets/56171229/dbd0d561-12ea-4c31-beb9-669a744c2f07)

- If you refresh the page on the localhost:4200 link, the account will get displayed and automatically logged in from the Metamask wallet

  - Marketplace
![image](https://github.com/VenoGaube/mag/assets/56171229/89143d8d-891a-4738-b96c-629aefd6df6f)

  - Profile
![image](https://github.com/VenoGaube/mag/assets/56171229/7f9959b3-c01c-44b8-b5e5-39acb09807dc)


## Common errors with npm install

If your **angular version and primeng version do not match you** will need to change the primeng 
or the angular CLI version so that they both match.

![image](https://github.com/VenoGaube/mag/assets/56171229/496cd1b9-5d68-496c-a73b-c805050e7010)
![image](https://github.com/VenoGaube/mag/assets/56171229/4d5d1da8-b03a-4ea5-be39-1edff4fafd86)

You can update install the latest Angular CLI version with the commands

```
npm uninstall -g angular-cli
npm install -g @angular/cli@latest
```

**Remove any unused files**
![image](https://github.com/VenoGaube/mag/assets/56171229/e3b060a1-ea71-4862-88ee-5cf358622084)


## Additional Resources
- [Angular Documentation](https://angular.io/docs)
- [Angular CLI GitHub Repository](https://github.com/angular/angular-cli)
- [Ganache CLI Documentation](https://github.com/trufflesuite/ganache-cli)

Feel free to explore these resources for more information on Angular and Ganache CLI.
