onEvent("item.registry", event => {
    event.create("sand_bit")
        .displayName("Sand Bit")

    event.create("tea_bit")
        .displayName("Tea Bit")
})

onEvent("block.registry", event => {
    event.create('tea_node')
        .material('dirt')
        .hardness(0.5)
        .displayName('Tea Node')
})

onEvent('worldgen.add', event => {
    event.addOre(ore => {
        ore.block = "kubejs:tea_node"
        ore.spawnsIn.blacklist = false
        ore.spawnsIn.values = [
            "#minecraft:dirt"
        ]

        ore.clusterMinSize = 3
        ore.clusterMaxSize = 4
        ore.clusterCount = 1 
        ore.minHeight = 0
        ore.maxHeight = 256 
        ore.squared = true 
        ore.chance = 4
    })
})