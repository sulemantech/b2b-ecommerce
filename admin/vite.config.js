import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

const { REACT_APP_RESOURCE_SERVER_HOST } = process.env;
export default defineConfig({
  plugins: [react()],
  define: {
    // Make environment variables accessible in your code
    'process.env.REACT_APP_RESOURCE_SERVER_HOST': JSON.stringify(REACT_APP_RESOURCE_SERVER_HOST)
    //'process.env.REACT_APP_API_KEY': JSON.stringify(REACT_APP_API_KEY),
  },
});