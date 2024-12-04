import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// Plugin list
export default defineConfig({
  plugins: [react()],
})
