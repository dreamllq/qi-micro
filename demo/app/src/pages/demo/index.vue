<template>
  <div>
    <div>{{ $t('确认') }}</div>
    <el-button @click="onCommand(Language.EN)">en</el-button>
    <el-button @click="onCommand(Language.JA)">ja</el-button>
    <el-button @click="onCommand(Language.ZH_CN)">zh-cn</el-button>
  </div>
</template>

<script setup lang="ts">
import {  setLanguage, Language, i18n } from 'llqm-framework-sdk';
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