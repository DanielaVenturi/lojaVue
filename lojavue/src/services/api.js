const BASE_URL = 'http://localhost:3000/produtos';

export async function fetchProdutos() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Erro ao carregar produtos');
  return res.json();
}

export async function createProduto(produto) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Erro ao criar produto');
  }
  return res.json();
}

export async function updateProduto(id, produto) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(produto)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Erro ao atualizar produto');
  }
  return res.json();
}

export async function deleteProduto(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Erro ao deletar');
  }
  return res.json();
}
