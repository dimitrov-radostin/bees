// import Bee from "./Bee";

var c = document.getElementById("mainCanvas")
var ctx = c.getContext("2d")
console.log('start')

const testBee = new Bee ()

initMap(ctx )

const myHive = new Hive ()
myHive.releaseBees(ctx)


// testBee.fly(ctx)