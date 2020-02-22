let zmq = require("zeromq"),
subscriber = zmq.socket("sub");

subscriber.connect("tcp://127.0.0.1:3000");
subscriber.subscribe("");

console.log("Subscriber connected to port 3000");

subscriber.on("message", function(topic) {
  console.log(
    "received a message related to:",
    topic.toString('hex'));
});

process.on('SIGINT', () => {
    subscriber.close()
    console.log('\nClosed')
})
