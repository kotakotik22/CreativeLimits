onEvent("block.registry", event => {
    event.create('iron_casing')
        .material('iron')
        .hardness(3)
        .displayName('Iron Casing')
})

onEvent("item.registry", event => {
    event.create("andesite_mix")
        .displayName("Andesite Mix")
})