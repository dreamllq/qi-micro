<template>
  <div>
    <div>{{ $t('确认') }}</div>
    <el-button @click="onCommand('en')">en</el-button>
    <el-button @click="onCommand('ja')">ja</el-button>
    <el-button @click="onCommand('zh-CN')">zh-cn</el-button>
    <el-button @click="onCommand('de')">de</el-button>
  </div>
</template>

<script setup lang="ts">
import {  setLanguage, i18n } from 'llqm-framework-sdk';
import { nextTick } from 'vue'
const onCommand = async (command) => {
  setLanguage(command);
  // sessionStorage.removeItem('alsi-scope-aps-router-tab');
  window.location.reload();
};
</script>

<style scoped>

</style>

<route>
  {
    "name": "app-demo",
    "meta": {
      "title": "demo1"
    }
  }
</route>