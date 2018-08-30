const prepareHive = ctx => {
    const hive = Array(HIVE_POPULATION).fill(0).map(empty => new Bee())
    console.log(hive);
    hive.forEach(bee => bee.fly(ctx))
}