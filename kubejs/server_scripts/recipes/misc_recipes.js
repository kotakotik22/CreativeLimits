onEvent("recipes", event => {
    event.recipes.createautomated.picking("minecraft:sand", Item.of("kubejs:sand_bit")
        .withChance(1)
        .withCount(6), event)

    event.remove({output: "createautomated:picker"})
    event.shaped("createautomated:picker", [
        "si ",
        "isi",
        " is"
    ], {
        s: "minecraft:string",
        i: "minecraft:iron_nugget"
    })

    event.remove({output: "create:sand_paper"})
    // why did i just suddenly decide to do the recipe keys in caps  
    event.shaped("create:sand_paper", [
        "SSS",
        "SPS",
        "SSS"
    ], {
        S: "kubejs:sand_bit",
        P: "minecraft:paper"
    })

    event.remove({output: "createautomated:ore_extractor"})
    event.recipes.create.mechanical_crafting('createautomated:ore_extractor', [
        "CGC",
        "BSB",
        "BSB",
        "B B"
      ], {
          C: "create:brass_casing",
          G: "create:cogwheel",
          S: "create:shaft",
          B: "create:brass_ingot"
      })
})