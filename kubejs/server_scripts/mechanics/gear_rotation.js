const gearId = 'creategears:gear'
const tagId = "kubejs:rotatable"

var activated = {}

function posToObj(pos, world) {
    return JSON.stringify({
        x: pos.getX(),
        y: pos.getY(),
        z: pos.getZ(),
        "world": world 
    })
}

function setSpeed(block, speed) {
    // func_189515_b
    const tile = block.getEntity()
    // func_189515_b
    const data = block.getEntityData();
    if(data.Speed == 0) {
        console.log(block.pos)
        data.Speed = speed
        const d = java('dev.latvian.kubejs.util.MapJS').nbt(data)
        tile.func_230337_a_(block.getBlockState(), d)
        tile.notifyUpdate()
        console.info(data)
        return true
    }
    return false
}

onEvent('block.tags', event => {
    event.add(tagId, gearId)
  })

onEvent("block.break", event => {
    delete activated[posToObj(event.getBlock().pos, event.getEntity().getWorld().getDimension())]
})

onEvent("block.right_click", event => {
    if(event.block.hasTag(tagId)) {
        if(setSpeed(event.block, 16)) {
            activated[posToObj(event.block.pos, event.block.getDimension())] = 60;
        }
    }
})

onEvent("world.tick", event => { // TODO: optimize by using server.tick and getting the world instance in there, instead of checking the dimension in every single dimension
    var toDelete = []
    for (var posJson in activated) {
        pos = JSON.parse(posJson)
        if(event.getWorld().getDimension() == pos.world) {
            activated[posJson]--;
            var ticks = activated[posJson]
            setSpeed(event.getWorld().getBlock(pos.x, pos.y, pos.z), ticks)
            if(ticks <= 0) {
                toDelete.push(posJson)
            }
        }
    }
    for(var del in toDelete) {
        delete activated[toDelete[del]]
    }
})