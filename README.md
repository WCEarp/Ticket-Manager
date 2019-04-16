# Ticket-Manager
CS499 Group Project: Theater Ticket Manager

Here is a short description of each file in this project

main.js:      runs the webserver and initializes the databse objects
json files:   imports the packages we are using, notably nodejs

/db folder/
accountLogin.js: handles a user logging in
database.db:     the actual database file
database.js:	   handles all the database functions and includes the sql statements that work with the db
emailer.js:	     handles the 'notify to renew' button for season ticket holders and sends a REAL email to everyone
exporter.js:	   handles exporting tables from the db into a csv file
show.js:	       handles managing show objects and interacts with the database
ticket.js:	     handles managing ticket objects and interacts with the database
user.js:         handles managing user objects and interacts with the database

/html folder/
404.html:	            html for error page
aboutUs.html:	        html for about us page
index.html:	          html for home page
login.html:	          html for how the login button looks
managementTools.html:	html for the manage page
navbar.html:	        html for the navbar at the top of each page
tickets.html:       	html for the buy tickets page

/public folder/
css:	       folder that contains our css styling files
img:         folder that contains the images which are used on the website
scripts:	   folder that includes the javascript files that run the buy tickets page and manage page
tickets.csv: default export file
users.csv:   default export file

/routes folder/
home_route.js:       routes to the home page of the website
login_route.js:      handles login requests and calls the database
management_route.js: handles database requests from the manage page
register_route.js:   handles new users
ticket_route.js:     handles database requests from the manage page
