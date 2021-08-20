const webSocket = require("ws");

let server = new webSocket.Server({port:1234});

let clientsArray = [];


server.on("connection", (client) => {
    console.log("Client connected");
    clientsArray.push(client);
    client.on("message", (data) => {
        console.log("Received submit" , data.toString());
        for(let i = 0; i < clientsArray.length; ++i){
          if(clientsArray[i] !== client){
            clientsArray[i].send(data.toString());
          }
        }
    });
});

