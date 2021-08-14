// console.info(JavaAdapter.init)
// console.info(java("dev.latvian.mods.rhino.JavaAdapter"))

// JavaAdapter.init(java("net.minecraft.block.Block"), {
//     hasTileEntity: function(state) {
// 		return true
// 	}
// }, "eee");

// global.complexBuilder = () => {
//     conf = (b) => {}
    
//     function configure(c) {
//         conf = (b) => {
//             this.conf()
//             c()
//         }
//         return this
//     }

//     function build() {
//         return this.conf(java("java.lang.reflect.Proxy"))
//     }
// }

var handler = java("java.lang.reflect.InvocationHandler").construct({
    invoke: function(proxy, method, args){
        
    }
});
proxyClass = java("java.lang.reflect.Proxy").getProxyClass(
    java("java.lang.Object").getClassLoader(), java("net.minecraft.block.Block"));
// f = proxyClass.
    // getConstructor(InvocationHandler.clas).
    // newInstance(new Object[] { handler });