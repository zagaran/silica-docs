
function set(obj, path, value) {
  /**
   * set is a helper function which allows us to dynamically target and set values within an object, allowing
   * v-init to interpret a model like 'listPullParams.housing_type' as context['listPullParams']['housing_type']
   */
    var schema = obj;
    var pList = path.split('.');
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
        var elem = pList[i];
        if( !schema[elem] ) schema[elem] = {}
        schema = schema[elem];
    }

    schema[pList[len-1]] = value;
}


Vue.directive('init', {
  bind (el, binding, vnode) {
    var vModel = vnode.data.directives.find(d => d.rawName === "v-model")
    if (vModel) {
      set(vnode.context, vModel.expression, binding.value);
      vnode.context.$forceUpdate();
    }
  }
})