// import Bee from "./Bee";

var c = document.getElementById("mainCanvas")
var ctx = c.getContext("2d")
console.log(Bee, ctx)

const testBee = new Bee()

testBee.fly(ctx)