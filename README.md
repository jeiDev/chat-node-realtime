# Chat in node realtime

#### This is a small chat created in node, for now it is still in development and you will be adding functions according to the time. This chat has a login system with good animation and its global chat area.

## Instructions:

* Install node js

* Clone this repository which contains the api of the db in loopback. Here I leave your url:  
  https://github.com/jeiDev/backend-chat-node-realtime-in-loopback  
  
* Once you have cloned the repositories, you must install your dependancies. Open the console and go first to the folder of the loopback api and type nmp install, when you finish installing all your dependencies go to the folder that contains the web page, I mean this and also write npm install. When the installation is finished we will be ready to start.

* Run the two servers the one of the api and the one of the page writing node.

#### Open your browser and go to localhost or your ip. When you address yourself, the first thing that will appear is to register. Register and log in automatically. And then you'll just log in.


Note:  
That doing this will only work local if you want to upload it to a web server you should change the following ip. Go to the folder of the web page and open the server folder in it you will find a file called routes.js open it. Look for the varible called apiBackend and where it says localhost ("http: // localhost: 3000 / api /") change by your ip. Beware if your web server has https replace http for https, otherwise leave it that way. localhost refers to your local ip you must change it to the ip of the web server and where it says 3000 is the port where the api runs, leave it that way unless you change them the port to the api they can change it.
Then go to the folder public/assets/js/main.js open that file and look for the variable api and do the same procedure above in it.

## Images

![alt text] https://i.pinimg.com/originals/60/36/c7/6036c784bd1d249a16cf04d24b40500b.jpg

![alt text] https://i.pinimg.com/originals/27/df/3a/27df3a5c32442e41d1d7c8eac5d68f89.jpg

![alt text] https://i.pinimg.com/originals/12/95/e7/1295e7d6da7ecef6f3e9b82a2ebcc09a.jpg

![alt text] https://i.pinimg.com/originals/f6/57/ef/f657efc82d5f9b74fd0e66964eb5a432.jpg

![alt text] https://i.pinimg.com/originals/59/d4/b1/59d4b18a8bb64286f0761d08bca51a5d.jpg
