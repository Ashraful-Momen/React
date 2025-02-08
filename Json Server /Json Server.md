#install json server : 
----------------------
>>> sudo npm install -g json-server


#json file : 
------------
db.json => 
----------
{
  "posts": [
    { "id": 1, "title": "Hello World", "author": "John" },
    { "id": 2, "title": "JSON Server", "author": "Jane" }
  ]
}


#run the json server : 
-----------------------
>>> json-server --watch file_location/db.json --port 3003

or 

>>>  npx json-server --watch src/data/db.json --port 3003


#after run the json server show the endpoint : 
------------------------------------------------
Endpoints:
http://localhost:3003/posts

