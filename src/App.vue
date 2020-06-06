<template>
  <div id="app">
    <img src="./assets/logo.png">
    <button @click="handleClick">add storage</button>
  </div>
</template>

<script>
import StorageManager from './storage-manager';
export default {
  name: 'app',
  methods: {
    handleClick(){
      const storage = new StorageManager({expire : 10000, local : true, group : 'heyuxin'});
      storage.setStore('age',22,{group:'heyuxin'})
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
