<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <zs-search-box>
      <div class="x">
        <label>name</label><input type="input"/>
      </div>
      <div class="x">
        <label>email</label><input type="email"/>
      </div>
      <div class="x">
        <label>name</label><input type="input"/>
      </div>
      <div class="x">3</div>
      <div class="x">4</div>
      <div class="x">5</div>
      <div class="x">6</div>
      <div class="x">7</div>
    </zs-search-box>
  </div>
</template>

<script>


export default {
  name: 'Home',
}
</script>
<style scoped>
.x{
  background:red;
}
</style>
