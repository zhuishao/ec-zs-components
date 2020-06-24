<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <zs-search-box
            :rules="modRules"
            @click="searchTheValue"
    >
      <template v-slot:default="{record, rules}">
        <a-form-item
                label="名称"
        >
          <a-input
                  v-decorator="rules.param1"
          ></a-input>
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
    param1: ['param1', {
      initialValue: 2,
    }]
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
