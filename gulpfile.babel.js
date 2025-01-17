/* jshint esnext: true */
'use strict';

// External dependencies.
import { parallel, watch, series } from 'gulp';

// Internal dependencies.
import styles, { editor_styles, editor_blocks, customizer_styles, minifyStyles } from './gulp/sass';
import stylesDocs from './gulp/kss';
import scriptsGlobal, { customizerPreview, customizerControls } from './gulp/scripts';
import compress from './gulp/zip';
import rtl from './gulp/rtl';
import toc from './gulp/toc';
import pot from './gulp/pot';
import optimizeSVG from './gulp/svg';
import criticalCSS from './gulp/critical';

export const build = series(
	parallel(
		styles,
		editor_styles,
		editor_blocks,
		customizer_styles,
		scriptsGlobal,
		customizerPreview,
		customizerControls,
		optimizeSVG
	),
	parallel(
		minifyStyles,
		rtl,
		toc,
		pot,
		criticalCSS,
		stylesDocs
	),
	compress
);
export const buildScripts = scriptsGlobal;
export const buildCustomizerPreview = customizerPreview;
export const buildCustomizerControls = customizerControls;
export const buildStyles = series( parallel( styles, editor_styles, editor_blocks, customizer_styles ), rtl, toc );
export const buildZip = compress;
export const buildRTL = rtl;
export const buildTOC = toc;
export const buildCritical = criticalCSS;
export const buildSVG = optimizeSVG;
export const buildPot = pot;
export const buildKSS = stylesDocs;

export const watchFiles = function( done ) {
	watch(
		[ '*.scss', './assets/sass/**/*.scss' ],
		series(
			parallel( styles, editor_styles, editor_blocks ),
			parallel( rtl, toc, stylesDocs )
		)
	);
	watch( './assets/sass/customizer/*.scss', customizer_styles );
	watch( './assets/scripts/src-global/*.js', scriptsGlobal );
	watch( './assets/scripts/src-customizer-preview/*.js', customizerPreview );
	watch( './assets/scripts/src-customizer-controls/*.js', customizerControls );
	watch( './assets/svg/src/*.svg', optimizeSVG );

	done();
};

export default series(
	buildStyles,
	buildScripts,
	watchFiles
);
