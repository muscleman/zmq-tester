let zmq = require("zeromq"),
dealer = zmq.socket("dealer");

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomString() {
  var source = 'abcdefghijklmnopqrstuvwxyz'
  var target = [];
  for (var i = 0; i < 20; i++) {
    target.push(source[randomBetween(0, source.length)]);
  }
  return target.join('');
}

dealer.identity = randomString();
dealer.connect("tcp://127.0.0.1:3000");

console.log("dealer connected to port 3000");


dealer.on("message", function() {
    let msg = []
    Array.prototype.slice.call(arguments).forEach(arg => {
        msg.push(arg.toString())
    })
  console.log(msg);
});

var sendMessage = function() {
    dealer.send(["", "getblocktemplate"]);
}

sendMessage()

process.on('SIGINT', () => {
    dealer.close()
    console.log('\nClosed')
})
