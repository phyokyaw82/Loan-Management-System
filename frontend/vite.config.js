import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // <-- set the port here
    strictPort: true, // optional: fail if port 3000 is already in use
  },
});
