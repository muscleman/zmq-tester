let zmq = require("zeromq"),
dealer = zmq.socket("dealer");
const { fromEvent } = require('rxjs');

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


function startZMQ() {
    dealer.identity = randomString();
    dealer.connect("tcp://127.0.0.1:3000");

    console.log("dealer connected to port 3000");
    const zmqDirector = fromEvent(dealer, "message");

    zmqDirector.subscribe(x => {
                        console.log(JSON.parse(x.toString()));
                    })
}

var sendMessage = function(type, address) {
    if (type === 'getinfo') {
        let getinfo = {"jsonrpc": "2.0",
                       "id": "1",
                       "method": "get_info",
                       "params": {}}
        dealer.send(["", JSON.stringify(getinfo)]);
    }
    if (type === 'get_block_template') {
        let getblocktemplate = {"jsonrpc":"2.0",
                                "id":"0",
                                "method":"get_block_template",
                                "params":{"reserve_size":17,
                                           "wallet_address":address} }

        dealer.send(["", JSON.stringify(getblocktemplate)]);
    }

}

startZMQ();
sendMessage('get_block_template', 'your**wallet**address')

process.on('SIGINT', () => {
    dealer.close()
    console.log('\nClosed')
})
