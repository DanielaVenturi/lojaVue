<template>
  <div class="app">
    <header class="hero">
      <h1>Loja Simples</h1>
      <p>CRUD de produtos com Vue + seu backend</p>
    </header>

    <main class="main">
      <div class="col left">
        <ProductForm
          :model-value="formModel"
          :editing="isEditing"
          @submit="handleSubmit"
          @cancel="cancelEdit"
          @update:modelValue="val => formModel = val"
        />
      </div>

      <div class="col right">
        <div class="top-actions">
          <button @click="loadProdutos">Carregar Produtos</button>
          <button @click="resetForm">Novo produto</button>
        </div>

        <ProductList
          :produtos="produtos"
          @edit="startEdit"
          @delete="confirmDelete"
        />

        <div v-if="loading" class="info">Carregando...</div>
        <div v-if="error" class="error">{{ error }}</div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import ProductForm from './components/ProductForm.vue';
import ProductList from './components/ProductList.vue';
import { fetchProdutos, createProduto, updateProduto, deleteProduto } from './services/api';

const produtos = ref([]);
const loading = ref(false);
const error = ref(null);

let formModel = reactive({ nome: '', preco: null, categoria: '' });
const isEditing = ref(false);
let editingId = ref(null);

async function loadProdutos() {
  loading.value = true;
  error.value = null;
  try {
    produtos.value = await fetchProdutos();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

async function handleSubmit(payload) {
  error.value = null;
  try {
    if (isEditing.value) {
      await updateProduto(editingId.value, payload);
      isEditing.value = false;
      editingId.value = null;
    } else {
      await createProduto(payload);
    }
    resetForm();
    await loadProdutos();
  } catch (e) {
    error.value = e.message;
  }
}

function startEdit(prod) {
  isEditing.value = true;
  editingId.value = prod.id;
  formModel = { nome: prod.nome, preco: prod.preco, categoria: prod.categoria };
}

function cancelEdit() {
  isEditing.value = false;
  editingId.value = null;
  resetForm();
}

function resetForm() {
  formModel = { nome: '', preco: null, categoria: '' };
}

async function confirmDelete(id) {
  if (!confirm('Deletar esse produto?')) return;
  try {
    await deleteProduto(id);
    await loadProdutos();
  } catch (e) {
    error.value = e.message;
  }
}

onMounted(loadProdutos);
</script>

<style>

</style>
