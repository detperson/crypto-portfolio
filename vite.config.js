import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
        'process.env.WEATHER_APIKEY': JSON.stringify(env.WEATHER_APIKEY),
        // 'process.env.YOUR_BOOLEAN_VARIABLE': env.YOUR_BOOLEAN_VARIABLE,
        // If you want to exposes all env variables, which is not recommended
        // 'process.env': env
    },
  };
});
