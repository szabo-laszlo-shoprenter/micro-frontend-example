export default {
    // A bind egyszer fut, amikor a direktíva először csatlakozik az elemhez
    bind(el, binding) {
        const propName = binding.arg;   // például 'userData'
        el[propName] = binding.value;   // beállítjuk a property-t
    },
    // Az update minden alkalommal fut, amikor az érték (binding.value) változik
    update(el, binding) {
        const propName = binding.arg;
        el[propName] = binding.value;
    }
}

