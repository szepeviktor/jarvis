<?php
/**
 * Add support for the GiveWP plugin.
 *
 * @package Jarvis
 */

/**
 * Remove some of the default Give styles.
 *
 * The styles are taken care of by the theme styles, so custom styles are not
 * required.
 */
function jarvis_remove_give_stylesheets() {

	wp_dequeue_style( 'give-styles' );

}

add_action( 'wp_enqueue_scripts', 'jarvis_remove_give_stylesheets', 100 );
