/*
For usage look how it's used in the programmes page
*/


$tabBar = $('.tab-bar')
$leftHotspot = $('.tab-bar .left.hotspot')
$rightHotspot = $('.tab-bar .right.hotspot')


/*
This can be used during initialization to have a tab open
*/
function activateTab(tabNumber){
	$('.tab-bar .tabulator-button:nth-child(' + tabNumber + ')').addClass('active');
	showTabContent(getTabId($('.tab-bar .active.tabulator-button')[0]))
}


function showTabContent(tabId){
	$('.tab-content').addClass('inactive')
	$('.tab-content').removeClass('active')
	const $tabContent = $('#'+tabId).closest('.tab-content')
	$tabContent.addClass('active')
	$tabContent.removeClass('inactive')
}


function scrollToTabContent(tabId){
	const $elAboveTabBar = $('main .header')  // header above tab-bar

	// We calculate the margin as the distance from the tab content to the header
	const $tabContent = $('#'+tabId).closest('.tab-content')
	const elAboveTabBarBottom = $elAboveTabBar.offset().top + $elAboveTabBar.height()
	const margin = $tabContent.offset().top - elAboveTabBarBottom

	$([document.documentElement, document.body]).animate({
        scrollTop: $tabContent.offset().top - margin
    }, 200);
}


function getTabId(tabulatorElement){
	return $(tabulatorElement).find('a').attr('href').replace('#', '')
}


function hideLeftHotspot(){
	$leftHotspot.addClass('hidden')
}


function showLeftHotspot(){
	$leftHotspot.removeClass('hidden')
}


function hideRightHotspot(){
	$rightHotspot.addClass('hidden')
}


function showRightHotspot(){
	$rightHotspot.removeClass('hidden')
}


function updateHotspots(){

	// Hide hotspots if everything fits horizontally
	if ($('.tab-bar').width() > $('.tab-bar .tabulator-buttons').width()){
		hideLeftHotspot()
		hideRightHotspot()
		return
	}

	// Handle left hotspot
	if ($tabBar.scrollLeft() == 0){
		hideLeftHotspot()
	} else {
		showLeftHotspot()
	}

	// Handle right hotspot
	$rightestTab = $('.tab-bar .tabulator-button').last()
	x = $rightestTab.position().left + $rightestTab.width()
	if (x > $tabBar.width()){
		showRightHotspot()
	} else {
		hideRightHotspot()
	}
}


function registerEvents(){

  // Make hotspots scrolling triggers
  // NOTE: Hover does not work on mobile since there's no cursor.
  $leftHotspot.hover(function(){
  	$tabBar.animate({
  		scrollLeft: '0px'
  	}, 300)
  })
  $rightHotspot.hover(function(){
  	$tabBar.animate({
  		scrollLeft: $tabBar[0].scrollWidth - $tabBar.width()
  	}, 300)
  })

  // Update hotspot visibility
  $tabBar.scroll(function(){
  	updateHotspots()
  })
  $(window).resize(function(){
  	updateHotspots()
  })

  // Make tabs to activate content when clicked
  $('.tab-bar .tabulator-button').click(function(event){
  	$('.tab-bar .tabulator-button').each(function(){
  		$(this).removeClass('active')
  	})
  	$(this).addClass('active')
		const tabId = getTabId(this)
  	showTabContent(tabId)
		scrollToTabContent(tabId)
  });
  $(".tab-bar .tabulator-button a").click(function(event) {
  	event.preventDefault();
  })
}


// Init
activateTab(1)
updateHotspots()
registerEvents()
