import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetWebFonts,
	presetWind4,
	transformerDirectives,
	transformerVariantGroup,
	transformerCompileClass,
} from "unocss"

export default defineConfig({
	presets: [
		presetWind4(),
		presetAttributify(),
		presetIcons(),
		presetTypography(),
		presetWebFonts(),
	],
	transformers: [transformerDirectives(), transformerVariantGroup(), transformerCompileClass()],
	shortcuts: {
		"flex-center": "flex items-center justify-center",
		"flex-between": "flex items-center justify-between",
	},
	theme: {
		colors: {
			// custom colors can be defined here
		},
	},
})
