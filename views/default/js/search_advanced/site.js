elgg.provide("elgg.search_advanced");

elgg.search_advanced.init = function() {
	$(document).on('click', '.elgg-menu-search-list > li > a', function(e) {
		var $child_menu = $(this).next('.elgg-child-menu');
		if ($child_menu.length) {
			// hide other submenus
			$('.elgg-menu-search-list .elgg-child-menu').hide();
			
			// show or hide submenu
			$child_menu.toggle();
		
			e.stopPropagation();
			e.preventDefault();
		}
	});
	
	$(document).click(function() {
		$('.elgg-menu-search-list .elgg-child-menu').hide();
	});
	
	$(document).on('change', 'select.search-advanced-search-types', function() {
		var url = $(this).val();
		if (elgg.search_advanced.ajax_load_url == undefined) {
			document.location = url;
		} else {
			elgg.search_advanced.ajax_load_url(url);
		}
	});

	$(document).on('click', '.search-advanced-search-sidebar-button', function() {
		$('.elgg-form-search-advanced-search').submit();
	});
	
	$(document).on('submit', 'form.elgg-form-search-advanced-search', function(event) {
		var $sidebar_input = $('.elgg-sidebar [name^="filter"]');
		if (!$sidebar_input.length) {
			return;
		}
		
		// fix select, jquery clone doesn't keep value for select
		var $clone = $sidebar_input.clone();
		var $clone_selects = $clone.filter('select');
		
		$sidebar_input.filter('select').each(function(index, elem) {
			$clone_selects.eq(index).val($(elem).val());
		});
		
		$(this).append($clone.hide());
	});
	
	$(document).on('keypress', '.elgg-sidebar [name^="filter"]', function(event) {
		if (event.keyCode !== 13) {
			return;
		}
		$('.elgg-form-search-advanced-search').submit();
	});
};

elgg.register_hook_handler('init', 'system', elgg.search_advanced.init);
