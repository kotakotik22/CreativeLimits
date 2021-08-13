const config = global.config.gearRotation
var activated = {}

function setTileData(block, tile, data) {
    tile.func_230337_a_(block.getBlockState(), data)
}

function removeActivated(world, pos, json) {
    let block = world.getBlock(pos.x, pos.y, pos.z)
    let data = block.getEntityData()
    let tile = block.getEntity()
    if(data.Network) {
        java("com.simibubi.create.content.contraptions.RotationPropagator").handleRemoved(world, tile.field_174879_c, tile)
    }
    delete activated[json]
}

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
    let tile = block.getEntity()
    // func_189515_b
    let data = block.getEntityData();
    console.info(data)
    if(!data.Network) {
        // translaton: tile.setNetwork(tile.getBlockPos().asLong())
        tile.setNetwork(tile.func_174877_v().func_218275_a())
        let network = java("com.simibubi.create.Create").TORQUE_PROPAGATOR.getOrCreateNetworkFor(tile)
        const capacity = config.generatedStress * config.generatedSpeed
        network.updateCapacityFor(tile, capacity) // idk...
        data = block.getEntityData(); // update data after its changed by the network
        // oh its so late i start writing comments instead of code again
        // probably gonna go sleep soon lol
        // network.updateNetwork()
        data.Network.Capacity = capacity // idk...
    }
    if(data.Speed == 0) {
        data.Speed = speed
    }
    setTileData(block, tile, data)
    tile.sendData()
    return data.Speed != 0
}

onEvent("block.break", event => {
    let toDelete = posToObj(event.getBlock().pos, event.getEntity().getWorld().getDimension())
    removeActivated(event.getEntity().getWorld(), toDelete, JSON.stringify(toDelete))
})

onEvent("block.right_click", event => {
    var blockId = event.block.getId()
    for(var i in config.blocks) {
        var id = config.blocks[i]
        if(id == blockId) {
            isRotatable = true        
            if(setSpeed(event.block, config.generatedSpeed)) {
                event.getPlayer().data.ftbquests.complete(config.quest)
                activated[posToObj(event.block.pos, event.block.getDimension())] = config.timeActivated;
            }
            break
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
            setSpeed(event.getWorld().getBlock(pos.x, pos.y, pos.z), config.generatedSpeed)
            if(ticks <= 0) {
                toDelete.push(posJson)
            }
        }
    }
    for(var del in toDelete) {
        removeActivated(event.world, JSON.parse(toDelete[del]), toDelete[del])
    }
})