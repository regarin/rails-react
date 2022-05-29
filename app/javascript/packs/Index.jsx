import React from 'react'
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from '../components/Home'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
   )
}


document.addEventListener('DOMContentLoaded', () => {
  const container = document.body.appendChild(document.createElement('div'));
  const root = createRoot(container);
  root.render(<App />);
})
