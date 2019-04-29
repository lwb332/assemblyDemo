<!-- checkbox.vue -->
<template>
  <label>
    <span>
      <input
            v-if="group"
            type="checkbox"
            :disabled="disabled"
            :value='label'
            @change="change"
            v-model="model"
      />
      <input
            v-else
            type="checkbox"
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
    name: 'iCheckbox',
    mixins: [ Emitter ],
    props: {
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
      label: {
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
      // 是否使用了iCheckboxGroup
      this.parent = findComponentUpward(this, 'iCheckboxGroup');
      if(this.parent){
        // 存在iCheckboxGroup
        this.group = true
      }

      if (this.group) {
        this.parent.updateModel(true);
      } else {
        this.updateModel();
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
        currentValue: this.value,
        model: [],
        parent: null,
        group: false
      }
    },
    methods: {
      updateModel(){
        this.currentValue = this.value === this.trueValue
      },
      change (event) {
        console.log(this.model)
        if (this.disabled) {
          return false
        }

        const checked = event.target.checked
        this.currentValue = checked

        const value = checked ? this.trueValue : this.falseValue
        if (this.group) {
          this.parent.change(this.model)
        } else {
          this.$emit('on-change', value)
          this.dispatch('iFormItem', 'on-form-change', value)
        }
      }
    }
  }
</script>