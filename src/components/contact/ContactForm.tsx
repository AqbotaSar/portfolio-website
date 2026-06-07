'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormProps {
  labels: {
    name: string;
    email: string;
    message: string;
    send: string;
    success: string;
    error: string;
  };
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm({ labels }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Simulate send (replace with EmailJS when configured)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1.5 block">{labels.name}</label>
        <Input
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
          placeholder="..."
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block">{labels.email}</label>
        <Input
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
          placeholder="email@example.com"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1.5 block">{labels.message}</label>
        <Textarea
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          required
          rows={5}
          placeholder="..."
        />
      </div>

      {status === 'success' && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" /> {labels.success}
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4" /> {labels.error}
        </div>
      )}

      <Button type="submit" disabled={status === 'loading'} className="w-full">
        {status === 'loading' ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Send className="w-4 h-4 mr-2" />
        )}
        {labels.send}
      </Button>
    </form>
  );
}
