<!-- checkbox.vue，部分代码省略 -->
<template>
  <label>
    <slot></slot>
  </label>
</template>
<script>
  import { findComponentsDownward } from '../../util/assist.js'
  import Emitter from '../../minxins/emitter.js'

  export default {
    name: 'iRadioGroup',
    mixins: [Emitter],
    props: {
      value: {
        type: [Boolean, String],
        default: function(){
          return false
        }
      }
    },
    data () {
      return {
        currentValue: this.value,
      };
    },
    methods: {
      updateModel(update){
        const children = findComponentsDownward(this, 'iRadio')
        // 拿到父组件传过来的value值（默认值）
        const { value } = this
        if(children){
          children.forEach(child => {
            child.model = value
          })
        }
      },
      change (data) {
        this.currentValue = data
        this.$emit('input', data)
        this.$emit('on-change', data)
        this.dispatch('iFormItem', 'on-form-change', data)
      }
    },
    mounted () {
      this.updateModel(true)
    },
    watch: {
      value () {
        this.updateModel(true)
      }
    }
  }
</script>