<template>
    <div class="card list">
      <h3>Produtos</h3>
      <table v-if="produtos && produtos.length">
        <thead>
          <tr><th>ID</th><th>Nome</th><th>Preço</th><th>Categoria</th><th>Ações</th></tr>
        </thead>
        <tbody>
          <tr v-for="p in produtos" :key="p.id">
            <td>{{ p.id }}</td>
            <td>{{ p.nome }}</td>
            <td>R$ {{ Number(p.preco).toFixed(2) }}</td>
            <td>{{ p.categoria || '-' }}</td>
            <td>
              <button @click="$emit('edit', p)">✏️</button>
              <button @click="$emit('delete', p.id)" class="del">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <p v-else>Nenhum produto cadastrado.</p>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({ produtos: { type: Array, default: () => [] } });
  const emit = defineEmits(['edit','delete']);
  </script>
  
  <style scoped>
  table { width:100%; border-collapse: collapse; }
  th, td { padding:8px; border-bottom:1px solid #eee; text-align:left; }
  button { margin-right:6px; padding:6px 8px; border-radius:6px; border:none; cursor:pointer; background:#10b981; color:#fff; }
  button.del { background:#ef4444; }
  .card { padding:12px; background:#fff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
  </style>
  