<template>
  <div>
    <i-form :model="formValidate" :rules='ruleValidate' ref="form">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="mail">
        <i-input v-model="formValidate.mail"></i-input>
      </i-form-item>
      <i-form-item label="协议" prop="xy">
        <i-checkbox-group v-model="formValidate.xy">
          <i-checkbox label="1">选项 1</i-checkbox>
          <i-checkbox label="2">选项 2</i-checkbox>
          <i-checkbox label="3">选项 3</i-checkbox>
        </i-checkbox-group>
      </i-form-item>
      <i-form-item label="协议2" prop="xy2">
        <i-radio-group v-model="formValidate.xy2">
          <i-radio label="1">选项 1</i-radio>
          <i-radio label="2">选项 2</i-radio>
          <i-radio label="3">选项 3</i-radio>
        </i-radio-group>
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>
<script>
  import iForm from '../components/form/form.vue'
  import iFormItem from '../components/form/form-item.vue'
  import iInput from '../components/input/input.vue'
  import iCheckboxGroup from '../components/checkbox/checkbox-group.vue'
  import iCheckbox from '../components/checkbox/checkbox.vue'
  import iRadioGroup from '../components/radio/radio-group.vue'
  import iRadio from '../components/radio/radio.vue'

  export default {
    components: { iForm, iFormItem, iInput, iCheckbox, iCheckboxGroup, iRadio, iRadioGroup },
    data () {
      return {
        formValidate: {
          name: '',
          mail: '',
          xy: ['1','3'],
          xy2: '1'
        },
        ruleValidate: {
          name: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
          ],
          xy: [
            { type: 'array', required: true, message: '请选择协议', trigger: 'change'}
          ],
        }
      }
    },
    methods: {
      handleSubmit () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            window.alert('提交成功')
          } else {
            window.alert('表单校验失败')
          }
        })
      },
      handleReset () {
        this.$refs.form.resetFields()
      }
    },
    watch: {
      formValidate: {
        handler: function(newValue, oldValue){
          console.log(newValue)
        },
        immediate: true,
        deep: true
      }
    }
  }
</script>
