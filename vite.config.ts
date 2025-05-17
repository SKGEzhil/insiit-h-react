import { defineConfig } from 'vite'
import { config } from 'dotenv';
import react from '@vitejs/plugin-react'

config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'global': {},
    'process.env': process.env
  },
  // server: {port: 80}
})
