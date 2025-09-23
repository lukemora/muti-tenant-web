import Unocss from '@unocss/vite'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
	// 判断是否为生产环境构建
	const isProduction = command === 'build'

	return {
		// 模块解析配置
		resolve: {
			// 路径别名配置 - 简化导入路径，提高代码可读性和维护性
			alias: {
				'@': resolve(__dirname, 'src'), // 根目录别名，最常用
				'@components': resolve(__dirname, 'src/components'), // 组件目录别名
				'@assets': resolve(__dirname, 'src/assets'), // 静态资源目录别名
				'@views': resolve(__dirname, 'src/views'), // 页面视图目录别名
				'@stores': resolve(__dirname, 'src/stores'), // 状态管理目录别名
				'@utils': resolve(__dirname, 'src/utils'), // 工具函数目录别名
				'@services': resolve(__dirname, 'src/services'), // API 服务目录别名
				'@types': resolve(__dirname, 'src/types'), // 类型定义目录别名
				'@composables': resolve(__dirname, 'src/composables'), // 组合式函数目录别名
			},
			// 文件扩展名解析顺序 - 影响模块查找性能
			extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
			// 条件导出解析 - 支持现代 ES 模块的 package.json exports 字段
			conditions: ['import', 'module', 'browser', 'default'],
			// 主字段解析顺序 - 优先使用 ES 模块版本，提升 Tree Shaking 效果
			mainFields: ['module', 'jsnext:main', 'jsnext'],
		},
		// CSS 处理配置
		css: {
			// 开发环境启用 CSS source map，便于调试样式问题
			devSourcemap: !isProduction,
			preprocessorOptions: {
				scss: {
					// 禁用字符集声明 - 现代浏览器默认使用 UTF-8，避免不必要的警告
					charset: false,
					additionalData: `
          @use "/src/assets/styles/_variables.scss" as *;
          @use "/src/assets/styles/_mixins.scss"  as *;
        `,
					// 启用现代 Sass 编译器 - 提供更好的性能和最新的语法支持
					api: 'modern-compiler',
				},
				postcss: {
					plugins: [
						// 自动添加浏览器前缀 - 确保跨浏览器兼容性
						autoprefixer(), // 使用 package.json 中的 browserslist 配置
						// 生产环境 CSS 压缩 - 减少文件大小，提升加载性能
						...(isProduction ? [cssnano()] : []),
					],
				},
			},
		},
		// 插件配置
		plugins: [
			// Vue 3 支持插件
			vue(),

			// 自动导入插件 - 减少手动导入，提升开发效率
			AutoImport({
				resolvers: [
				ElementPlusResolver({
										importStyle: 'sass',
										exclude: new RegExp(/^(ElIcon|ElLoading|ElMessage|ElMessageBox|ElNotification)$/),
									}),],
				imports: ['vue', 'vue-router', 'pinia'],
				dirs: ['src/composables'], // 自动导入自定义函数和组合式函数
				dts: 'src/auto-imports.d.ts', // 生成 TypeScript 类型声明文件
				vueTemplate: true, // 在 Vue 模板中启用自动导入
				eslintrc: {
					enabled: false, // 关闭 ESLint 配置生成，减少扫描时间
				},
			}),

			// 组件自动注册插件 - 无需手动注册组件
			Components({
				resolvers: [
				ElementPlusResolver({
										importStyle: 'sass',
										exclude: new RegExp(/^(ElIcon|ElLoading|ElMessage|ElMessageBox|ElNotification)$/),
									}),],
				dirs: ['src/components'], // 自动注册自定义组件
				deep: true, // 深度扫描子目录
				extensions: ['vue'], // 只支持 Vue 文件，移除 md 支持
				dts: 'src/components.d.ts', // 生成组件类型声明文件
				include: [
				'element-plus/es',
								'@element-plus/icons-vue',/\.vue$/, /\.vue\?vue/], // 只扫描 Vue 文件
				exclude: [
					/[\\/]node_modules[\\/]/,
					/[\\/]\.git[\\/]/,
					/[\\/]\.nuxt[\\/]/,
					/[\\/]examples[\\/]/, // 排除示例组件目录
				], // 排除不需要扫描的目录
				// 限制扫描深度，避免过度扫描
				directoryAsNamespace: false, // 不使用目录作为命名空间，减少复杂度
			}),

			// UnoCSS 原子化 CSS 引擎 - 提供高性能的原子化 CSS 解决方案
			Unocss(),

			// 打包分析插件 - 仅在分析模式下启用，避免开发环境性能损耗
			...(mode === 'analyze'
				? [
						visualizer({
							filename: 'dist/stats.html', // 分析报告输出路径
							open: true, // 构建完成后自动打开报告
							gzipSize: true, // 显示 gzip 压缩后的大小
							brotliSize: true, // 显示 brotli 压缩后的大小
							template: 'treemap', // 使用树状图模板，更直观地展示包大小
							title: `项目打包分析报告 - ${new Date().toLocaleString('zh-CN')}`, // 报告标题，包含构建时间点
						}),
					]
				: []),
		],
		// 依赖预构建优化配置 - 提升开发环境启动速度
		optimizeDeps: {
			// 预构建的依赖 - 这些依赖会被提前构建，减少开发时的转换时间
			// 预构建的依赖 - 只预构建核心依赖，避免重复和冗余
			include: [
				'element-plus/es',
								'@element-plus/icons-vue','vue', 'vue-router', 'pinia', 'axios'],
			// 仅在依赖变化时重新预构建，提升开发体验
			cacheDir: 'node_modules/.vite', // 预构建缓存目录
		},
		// 生产构建配置
		build: {
			// 构建目标 - ES2015 提供良好的浏览器兼容性和现代特性支持
			target: 'es2015',
			// 构建输出目录
			outDir: 'dist',
			// 启用 CSS 代码拆分 - 将 CSS 按需加载，提升首屏加载性能
			cssCodeSplit: true,
			// 构建前清空输出目录 - 确保构建产物干净
			emptyOutDir: true,
			// 构建后是否生成 source map 文件 - 生产环境关闭以保护源码
			sourcemap: !isProduction,
			// 设置 chunk 大小警告的限制 - 超过 1000KB 时发出警告
			chunkSizeWarningLimit: 1024,
			reportCompressedSize: false, // 关闭压缩大小报告，减少构建时间
			write: true, // 确保写入文件
			assetsInlineLimit: 1024 * 4, // 小于 4KB 的资源内联为 base64
			// 自定义底层的 Rollup 打包配置
			rollupOptions: {
				// 入口文件配置
				input: {
					main: resolve(__dirname, 'index.html'),
				},
				// 并行构建配置 - 提升构建速度
				maxParallelFileOps: 5,
				// 外部化 Node.js 模块 - 避免将 Node.js 内置模块打包到浏览器代码中
				external: id => {
					// 外部化 Node.js 内置模块列表
					const nodeModules = ['http', 'https', 'url', 'fs', 'path', 'os', 'crypto', 'stream', 'util', 'events', 'assert', 'tty', 'zlib', 'querystring', 'buffer']
					return nodeModules.includes(id)
				},
				output: {
					// 静态资源分类打包配置 - 使用 contenthash 优化浏览器缓存策略
					chunkFileNames: 'assets/js/[name]-[hash].js', // 代码分割后的 chunk 文件命名
					entryFileNames: 'assets/js/[name]-[hash].js', // 入口文件命名
					assetFileNames: assetInfo => {
						if (!assetInfo.name) return 'assets/[name]-[hash].[ext]'
						const info = assetInfo.name.split('.')
						const ext = info[info.length - 1]

						// JavaScript 相关文件 - 统一放在 js 目录
						if (/\.(js|mjs|ts)(\?.*)?$/i.test(assetInfo.name)) {
							return `assets/js/[name]-[hash].${ext}`
						}
						// CSS 文件 - 统一放在 css 目录
						if (/\.(css)(\?.*)?$/i.test(assetInfo.name)) {
							return `assets/css/[name]-[hash].${ext}`
						}
						// 媒体文件 - 统一放在 media 目录
						if (/\.(mp4|webm|ogg|mp3|wav|aac)(\?.*)?$/i.test(assetInfo.name)) {
							return `assets/media/[name]-[hash].${ext}`
						}
						// 图片文件 - 统一放在 images 目录
						if (/\.(png|jpe?g|gif|svg|webp|ico)(\?.*)?$/i.test(assetInfo.name)) {
							return `assets/images/[name]-[hash].${ext}`
						}
						// 字体文件 - 统一放在 fonts 目录
						if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
							return `assets/fonts/[name]-[hash].${ext}`
						}
						// 其他静态资源 - 放在根 assets 目录
						return `assets/[name]-[hash].${ext}`
					},
					// 手动分包策略 - 将相关依赖打包到同一个 chunk 中，优化缓存和加载性能
					manualChunks: {
				'element-plus': ['element-plus', '@element-plus/icons-vue'],
						// Vue 生态系统 - 核心框架相关
						vue: ['vue', 'vue-router'],
            utils: [
				'moment',
				'lodash',]
					},
				},
			},
			// 代码压缩配置 - 使用 esbuild 进行更快的压缩
			minify: isProduction ? 'esbuild' : false,
			// esbuild 配置 - 生产环境优化
			esbuild: {
				// 生产环境移除 console 和 debugger
				drop: isProduction ? ['console', 'debugger'] : [],
			},
		},
		// 缓存配置
		cacheDir: 'node_modules/.vite',
		// 开发服务器配置
		server: {
			port: 3000, // 指定开发服务器端口
			strictPort: false, // 端口被占用时自动尝试下一个可用端口
			open: true, // 启动时自动打开浏览器
			cors: true, // 启用跨域资源共享，便于开发时的 API 调用
			hmr: {
				// 热模块替换配置 - 提升开发体验
				overlay: true, // 在浏览器中显示错误覆盖层
				port: 24678, // HMR WebSocket 端口，避免与主服务端口冲突
			},
			proxy: {
				// API 代理配置 - 解决开发环境跨域问题
				'/api': {
					target: 'http://localhost:3000', // 代理目标地址，需要根据实际后端服务修改
					changeOrigin: true, // 改变请求头中的 origin 字段
					rewrite: path => path.replace(/^\/api/, ''), // 重写请求路径，移除 /api 前缀
				},
			},
		},
	}
})
