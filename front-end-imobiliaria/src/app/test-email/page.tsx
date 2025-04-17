'use client';

import { useState } from 'react';

export default function TestEmail() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testEmail = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('Iniciando teste de email...');
      const response = await fetch('/api/testEmail');
      console.log('Resposta recebida:', response.status);
      
      const data = await response.json();
      console.log('Dados da resposta:', data);
      
      if (!response.ok) {
        throw new Error(data.details || data.error || 'Erro desconhecido');
      }
      
      setResult(data);
    } catch (err: any) {
      console.error('Erro ao testar email:', err);
      setError(err.message || 'Erro ao testar email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Teste de Envio de Email</h1>
      
      <div className="mb-4">
        <p className="mb-2">Esta página testa o envio de email usando o Resend.</p>
        <p className="mb-2">Email do atendente configurado: <strong>{process.env.NEXT_PUBLIC_ATTENDANT_EMAIL || 'Não configurado'}</strong></p>
      </div>
      
      <button 
        onClick={testEmail}
        disabled={loading}
        className="bg-[#702632] text-white px-4 py-2 rounded-lg hover:bg-[#8A2E3C] transition-colors disabled:opacity-50"
      >
        {loading ? 'Enviando...' : 'Testar Envio de Email'}
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
          <h2 className="font-bold">Erro:</h2>
          <p>{error}</p>
        </div>
      )}
      
      {result && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
          <h2 className="font-bold">Resultado:</h2>
          <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
} 