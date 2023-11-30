# City Manager

### Prerequisites
1. Download and install Node.js (LTS version preferably) from [here](https://nodejs.org/en/download)
2. Verify the installation is completed by executing the following commands after restarting the computer. You should see version numbers for both.
   - **node -v**
   - **npm -v**
4. Download the files from the repository (or clone it). If you downloaded the archive - unpack it in a selected directory.

### How to run the application
1. Open a Terminal or Command Prompt in Windows
2. Navigate to the directory where you placed the files from the repository
3. Execute command **npm install** to download all the dependencies
4. Execute command **node index.js**
5. Once you see the message *Server is running on port 3000* you can access the application through a browser (or Postman for example)
   with the following URL: **http://localhost:3000/getData**

### How to sort the cities and filter by keyword
You can sort the cities by name, area, or population. To do that, you have to add **sortBy=name** query parameter to the **/getData** endpoint.
Example URL: **http://localhost:3000/getData?sortBy=name**
Additionally, you can set the order of the sort to descending by adding **order=descending** query parameter.
Example URL: **http://localhost:3000/getData?sortBy=name&order=descending**

*Note: If the order query parameter is not provided, the data is sorted in ascending order by default.*

To filter the cities by a keyword, you need to provide the **keyword** query parameter with the string
by which you wish to filter the data.
Example URL: **http://localhost:3000/getData?keyword=na** This will output all cities which have the string 'na' in their name

*Note: filter and sort can be used simultaneously.*

### How to add new city
To add a new city to the file, you need to make a POST request to the **localhost:3000/addCity** endpoint by providing
the name, area and population details in the request body. This can be done by using Postman for example.
