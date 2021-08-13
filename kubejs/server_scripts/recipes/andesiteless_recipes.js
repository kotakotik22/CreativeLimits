onEvent("recipes", event => {
    function casing(out, material) {
        event.shaped("4x " + out, [
            "ppp",
            "ili",
            "ppp"
        ], {
            p: "#minecraft:planks",
            i: material,
            l: "#minecraft:logs"
        })
    }

    event.remove({output: "create:mechanical_pump"})
    event.shaped("create:mechanical_pump", [
        "g",
        "p"
    ], {
        g: "creategears:gear",
        p: "create:fluid_pipe"
    })

    event.remove({output: "create:depot"})
    event.shaped("create:depot", [
        "i",
        "c"
    ], {
        i: "minecraft:iron_ingot",
        c: "kubejs:iron_casing"
    })

    event.remove({output: "create:andesite_alloy"})
    function andesiteMixCrafting(nugget) {
        event.shaped("kubejs:andesite_mix", [
            "na",
            "an"
        ], {
            n: nugget,
            a: "minecraft:andesite"
        })
    }
    andesiteMixCrafting("minecraft:iron_nugget")
    andesiteMixCrafting("create:zinc_nugget")
    function andesiteMixMixing(nugget) {
        event.recipes.create.mixing("kubejs:andesite_mix", [
            "minecraft:andesite",
            nugget
        ])
    }
    andesiteMixMixing("minecraft:iron_nugget")
    andesiteMixMixing("create:zinc_nugget")
    event.recipes.create.filling("create:andesite_alloy", [
        "kubejs:andesite_mix",
        Fluid.of("minecraft:lava", 25)
    ])

    event.remove({output: "create:copper_casing"})
    casing("create:copper_casing", "create:copper_ingot")

    casing("kubejs:iron_casing", "minecraft:iron_ingot")
})