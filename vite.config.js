import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })




//https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/CurrencyConverter/', // Use your repository name here
})