# Mini Project
This is the repo for my Software Engineering mini project which uses node JS.  This is basically a website where students and almuni can add their work and past experiences as a showcase.


Before proceeding you need to install nodejs and mongoDB

## Running Node
In this directory you will find a package.json file which contains the dependencies(packages)
that we need and are using in our project.  
So to install the dependencies in package.json you should run:

```
npm install
```
Then to run the project:

```
node server
```
You should now find the website running on http://127.0.0.1:8080/

### Quick look
This project uses the MVC concept which we used in our Game course semester 4.  
There are some sub directories in this project: 

1. routes
..* contains files which will have the routes. for example if we want to access the home page which is 
at http://127.0.0.1:8080/ . The server will go looking for that link in the routes.js file, then call a function accordingly.
2. views
..* contains the ejs files, which are html files but using a package called ejs which will help us pass variables to the html page.
3. models
..* this is where we keep our schemas, similar to DB1 course we specify the fields we want and their types
We will also use a model to connect to DB for fetching and inserting records



## GIT COMMANDS
For the initial pull:
```git
git clone https://github.com/ameniawy/meansquad.git
```

if you want to create a new branch:
```git
git checkout -b <branch_name>
```

if you want to switch to another existing branch:
```git
git checkout <branch_name>
```

when you want to save your work and upload:
```git
git add --all or git add .
git commit -m "add your commit message here"
git push origin <your_branch_name>
```

if you need to pull new changes to your local machine from a certain branch
```git
git pull origin <branch_name> 
```

for example I want to take the changes made to the master branch but I'm on branch meniawy
```git
git pull origin master
```


### IMPORTANT:
1. Always pull from master and fix conflicts before requesting a merge.
Solve your own conflicts
2. Always push to your branch only.
