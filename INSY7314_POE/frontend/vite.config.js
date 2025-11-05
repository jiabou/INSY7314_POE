import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert' //(npm, 2025)

// https://vite.dev/config/
export default defineConfig({
  server: { //(npm, 2025)
    https: true //(npm, 2025)
  },
  plugins: [react(), mkcert()], //(npm, 2025)
})

/*
Reference list:

npm, 2025. vite-plugin-mkcert. [online] Available at: <https://www.bing.com/ck/a?!&&p=797b29a2426dfab7c03f27a1634ba600fa5131035c0d47a050fced6a48a210c0JmltdHM9MTc2MjMwMDgwMA&ptn=3&ver=2&hsh=4&fclid=3227c8fe-cdf0-6c19-0c38-dea0cc676dd2&u=a1aHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2Uvdml0ZS1wbHVnaW4tbWtjZXJ0> [Accessed 5 November 2025].

*/