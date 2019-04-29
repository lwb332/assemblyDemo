<!-- checkbox.vue -->
<template>
  <label>
    <span>
      <input
            v-if="group"
            type="radio"
            :disabled="disabled"
            v-model="model"
            :value="label"
            @change="change" />
      <input
            v-else
            type="radio"
            :disabled="disabled"
            :checked="currentValue"
            @change="change" />
    </span>
    <slot></slot>
  </label>
</template>
<script>
  import { findComponentUpward } from '../../util/assist.js'
  import Emitter from '../../minxins/emitter'
  export default {
    name: 'iRadio',
    mixins: [ Emitter ],
    props: {
      label: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: function(){
          return false
        }
      },
      value: {
        type: [String, Number, Boolean],
        default: false
      },
      trueValue: {
        type: [String, Number, Boolean],
        default: true
      },
      falseValue: {
        type: [String, Number, Boolean],
        default: false
      }
    },
    mounted(){
      this.parent = findComponentUpward(this, 'iRadioGroup')
      if(this.parent){
        this.group = true
      }


    },
    watch: {
      value: {
        handler: function(newValue, oldValue){
          if(newValue === this.trueValue || newValue === this.falseValue){
            this.updateModel()
          }else{
            throw 'Value should be trueValue or falseValue.'
          }
        },
        immediate: true,
      }
    },
    data () {
      return {
        model: null,
        group: false,
        parent: null,
        currentValue: this.value
      }
    },
    methods: {
      updateModel(){
        this.currentValue = this.value === this.trueValue
      },
      change (event) {
        if (this.disabled) {
          return false
        }

        const checked = event.target.checked
        this.currentValue = checked

        const value = checked ? this.trueValue : this.falseValue
        if(this.group){
          // 单选框组
          this.parent.change(this.model)
        }else{
          this.$emit('input', value)
        }
        
        this.$emit('on-change', value)
        //this.dispatch('iFormItem', 'on-form-change', value)
      }
    }
  }
</script>