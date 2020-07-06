<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <zs-search-box
            @click="searchTheValue"
    >
      <template v-slot:default="">
        <a-form-item
                label="名称"
                v-bind="modalLayout"
        >
          <a-input
                  v-decorator="modRules.param1"
          ></a-input>
        </a-form-item>
        <a-form-item
                label="地址"
                v-bind="modalLayout"
        >
          <a-select
                  v-decorator="['key']"
          >
            <a-select-option :value="1">1</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
                label="地址1"
                v-bind="modalLayout"
        >
          <a-select
                  v-decorator="['key1']"
          >
            <a-select-option :value="1">1</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
                label="地址2"
                v-bind="modalLayout"
        >
          <a-select
                  v-decorator="['key2']"
          >
            <a-select-option :value="1">1</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
                label="地址3"
                v-bind="modalLayout"
        >
          <a-select
                  v-decorator="['key3']"
          >
            <a-select-option :value="1">1</a-select-option>
          </a-select>
        </a-form-item>
      </template>
    </zs-search-box>
    <a-form
            :form="form"
    >
      <a-form-item
              label="属性"
      >
        <params-input
                :drag="true"
                param1="d"
                param2="f"
                v-decorator="['aa']"
        ></params-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  const modalLayout = {
    labelCol: { class: 'modalLabelLayout' },
    wrapperCol: { class: 'modalWrapperLayout' },
  };
  const modRules = {
    param1: ['param1']
  };

export default {
  name: 'Home',
  data() {
    return {
      form: this.$form.createForm(this),
      modRules,
      modalLayout,
    }
  },
  methods: {
    searchTheValue(values) {
      console.log(values);
    },
  },
}
</script>
<style scoped>
.x{
  background:red;
}
/deep/.modalLabelLayout{
  width: 6em;
}
/deep/.modalWrapperLayout{
  width: calc(100% - 6em);
  display: inline-block;
  vertical-align: top;
}
</style>
