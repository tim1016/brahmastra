<?php

/*
 This is triggered upon plugin delete
*/

if(!defined('WP_UNINSTALL_PLUGIN')){
    die('You can only delete the plugin from the wordpress');
}

// Method 1: Clear database stored data
$books = get_posts( array(
    'post_type' => 'book',
    'numberposts' => -1
));
foreach($books as $book){
    wp_delete_post($book->ID, true);
}

// Method 2: Using WPDB - more powerful method but more risky
// Access the database via SQL

global $wpdb;
$wpdb->query("DELETE FROM wp_posts WHERE post_type = 'book'");
$wpdb->query("DELETE FROM wp_postmeta WHERE post_id NOT IN (SELECT id  FROM wp_posts)");
$wpdb->query("DELETE FROM wp_term_relationships WHERE object_id NOT IN (SELECT id  FROM wp_posts)");