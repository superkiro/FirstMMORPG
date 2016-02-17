/**
 * Created by Kerolos on 2/13/2016.
 */
var now = require('performance-now');
var _ = require('underscore');

module.exports = function(){

    //These objects will be added at runtime...
    //this.socket = {}
    //this.user = {}

    var client = this;

    //Initialization
    this.initiate = function(){


        client.socket.write(packet.build(["HELLO", now().toString()]));

        console.log("Client initiated");
    }

    //Client function

    this.enterroom = function(selected_room){

        maps[selected_room].clients.forEach(function(otherClient){
            otherClient.socket.write(packet.build(["ENTER", client.user.username, client.user.pos_x, client.user.pos_y]))
        })

        maps[selected_room].clients.push(client);

    }

    this.broadcastroom = function(packetData){

        maps[client.user.current_room].clients.forEach(function(otherClient){
            if(otherClient.user.username != client.user.username){
                otherClient.socket.write(packetData);
            }
        });

    }

    this.data = function(data){
        packet.parse(client, data);
    }

    this.error = function(err){
        console.log("Client error " + err.toString());
    }

    this.end = function(){
        console.log("Client ended");
    }


}
