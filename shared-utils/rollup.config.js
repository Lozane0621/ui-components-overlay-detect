import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { resolve } from 'path';

export default {
  input: resolve(__dirname, 'src/index.ts'), // 入口文件
  output: [
    {
      file: resolve(__dirname, 'dist/index.cjs.js'), // 输出 CommonJS 格式
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: resolve(__dirname, 'dist/index.esm.js'), // 输出 ES Module 格式
      format: 'esm',
      sourcemap: true,
    },
    {
      file: resolve(__dirname, 'dist/index.umd.js'), // 输出 UMD 格式
      format: 'umd',
      name: 'IFrameAppOverlay', // 用于 UMD 格式的全局变量名称
      sourcemap: true,
    },
  ],
  external: ['tslib'], // 排除 tslib 等外部依赖
  plugins: [
    typescript({
      tsconfig: resolve(__dirname, 'tsconfig.json'), // 使用的 TypeScript 配置
      check: false, // 禁用类型检查
    }),
    // 启用 Terser 插件来压缩代码
    terser(),
  ],
};
