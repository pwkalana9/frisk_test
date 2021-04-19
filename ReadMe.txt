System setup
------------
1) Database setup
   a) Setup postgresql, and setup user 'postgres' with password 'postgres'
   b) Run frisk_db.sql (found in the repository) to create the database and the table.
2) cd frisk_api, node index.js to run the express based API backend.(in the prodcution machine this is installed as frisk_backend.service)
3) Copy the contents of the frisk_hello/build directory into the Apache web directory 
4) Access the pages as below
  a) http://localhost <-- home page with form to submit messages
  b) http://localhost/list <-- List the messages and allows to download the unique emails as CSV
  c) http://localhost:3000/getmessages <-- api for retrieving the messages
  d) http://localhost:3000/exportcsv <-- api for exporting the unique emails as CSV
5) Please see screenshots directory for the working system

Things to complete
------------------
1) reveal feature for message to displayed only when pin is entered 
2) test listing page with other browsers (api response was not working properly when tested within the virtualbox)
fetch(url) does not work correctly within the virtualbox environment, tested natively which worked fine.


Recommendations
---------------
1) Form field validation
2) Only pass the messages into frontend when the user enters the pin (currently all data is sent from the backend to frontend)
3) Use HTTPS for security
4) Implment unit testing for all backend apis, and field validation
5) Handle exception conditions both in the front and backend.
6) Secure access details to the database user/password (currenlty it is hard coded) 
   