// priority: 1000

var filterField = java("net.minecraftforge.fml.common.ObfuscationReflectionHelper").findField(java("dev.latvian.kubejs.script.ScriptManager"), "classFilter")

var startup = filterField.get(java("dev.latvian.kubejs.KubeJS").startupScriptManager.classFilter)
// console.log(JSON.stringify(java("dev.latvian.kubejs.KubeJS").startupScriptManager))
startup.allow("java.lang.reflect.InvocationHandler")