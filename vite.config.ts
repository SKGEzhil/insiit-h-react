import { defineConfig } from 'vite'
import { config } from 'dotenv';
import react from '@vitejs/plugin-react'
import fs from 'fs';

config();

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    plugins: [react()],
    define: {
      'global': {},
      'process.env': process.env
    },
    server: {
      https: {
        key: fs.readFileSync('./certs/key.pem'),
        cert: fs.readFileSync('./certs/cert.pem'),
      }
    }
  }
})
