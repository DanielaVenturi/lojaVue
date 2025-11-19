<template>
    <form class="card form" @submit.prevent="onSubmit">
      <h3>{{ editing ? 'Editar produto' : 'Adicionar produto' }}</h3>
  
      <label>Nome</label>
      <input v-model="local.nome" required />
  
      <label>Preço (R$)</label>
      <input v-model.number="local.preco" type="number" step="0.01" min="0" required />
  
      <label>Categoria</label>
      <input v-model="local.categoria" />
  
      <div class="actions">
        <button type="submit">{{ editing ? 'Salvar' : 'Adicionar' }}</button>
        <button type="button" @click="onCancel" v-if="editing" class="btn-cancel">Cancelar</button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { reactive, toRefs, watch } from 'vue';
  const props = defineProps({
    modelValue: { type: Object, default: () => ({ nome: '', preco: null, categoria: '' }) },
    editing: { type: Boolean, default: false }
  });
  const emit = defineEmits(['submit', 'cancel', 'update:modelValue']);
  
  const local = reactive({ ...props.modelValue });
  
  watch(() => props.modelValue, (v) => {
    Object.assign(local, v || { nome: '', preco: null, categoria: '' });
  });
  
  function onSubmit() {
    if (!local.nome || local.preco == null) return;
    emit('submit', { nome: local.nome, preco: Number(local.preco), categoria: local.categoria });
    if (!props.editing) {
      Object.assign(local, { nome: '', preco: null, categoria: '' });
      emit('update:modelValue', { ...local });
    }
  }
  
  function onCancel() {
    emit('cancel');
  }
  </script>
  
  <style scoped>
  .card { padding: 12px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
  .form label { display:block; margin-top:8px; font-size:14px; }
  .form input { width:100%; padding:8px; margin-top:4px; border:1px solid #ddd; border-radius:6px; }
  .actions { margin-top:12px; display:flex; gap:8px; }
  button { padding:8px 12px; border-radius:8px; border:none; cursor:pointer; background:#3b82f6; color:#fff; }
  .btn-cancel { background:#ef4444; }
  </style>
  