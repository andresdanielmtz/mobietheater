/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import {config} from "dotenv";

config();


export default defineConfig({
    plugins: [react(), tailwindcss()],
})
