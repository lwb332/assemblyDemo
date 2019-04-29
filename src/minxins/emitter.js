function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}
export default {
  methods: {
    // 子组件 传递事件至 父组件
    dispatch(componentName, eventName, params) {
      //找到上级父组件
      let parent = this.$parent || this.$root
      //上级父组件的name，name唯一
      let name = parent.$options.name

      //当父级组件存在并且（不存在父组件或者父组件name不等于索引的name）
      // 一直循环直至找到对应父组件的name
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) {
          name = parent.$options.name
        }
      }
      // 然后通过apply方法把eventName传递到目标父组件，并传入参数params
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params))
      }
    },

    //这是父组件 传递事件至 子组件
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    }
  }
}
