let zmq = require("zeromq"),
subscriber = zmq.socket("sub");

subscriber.connect("tcp://127.0.0.1:3000");
subscriber.subscribe("");

console.log("Subscriber connected to port 3000");

/*
subscriber.on("message", function() {
    let msg = []
    Array.prototype.slice.call(arguments).forEach(arg => {
        msg.push(arg.toString())
    })
  console.log(msg);
});
*/

subscriber.on("message", function(a, b) {
  console.log(a.toString(), '< >', b.toString());
});

process.on('SIGINT', () => {
    subscriber.close()
    console.log('\nClosed')
})
