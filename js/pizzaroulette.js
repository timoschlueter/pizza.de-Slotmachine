$(document).ready(function() {
	
	var selectedArea = "";
	
	$('input.typeahead').typeahead({
		onSelect: function(item) {
	        if (item.value) {
		        selectedArea = item.value;
		        console.log(selectedArea);
		        $(".roulette-button").attr("disabled", false);
	        } else {
		        $(".roulette-button").attr("disabled", true);
	        }
	        
	    },
	    ajax: {
	        url: "proxy_area.php",
	        timeout: 500,
	        displayField: "name",
	        triggerLength: 1,
	        method: "get",
	        loadingClass: "loading-circle"
	    }
	});
	
	$(".roulette-button").click(function() {
		
		var request = $.getJSON("proxy_stores.php", {area: selectedArea});
		
		request.done(function(response) {
			var allTheStores = new Array();
			var storeContainer = $(response.data);
			
			var storeList = storeContainer.children("li").children(".srow");
	
			storeList.each(function() {
				var store = $(this);
				var storeName = store.find(".sname").html();
				var storeLink = store.find(".sname").attr("href");
				var storeThumb = store.children(".pdv").children().children("img").attr("src");
				
				var storeOpeningTime = store.find(".ozt").children("span").html();
				
				if (store.find(".ozt").children("span.red").length > 0) {
					var storeCurrentlyOpen = false;
				} else {
					var storeCurrentlyOpen = true;
				}
				
				var storeDeliveryCosts = store.find(".afk").html();
				var storeOrderMin = store.find(".mbw").html();
				var storeAddress = store.find(".sadress-container").html();
				
				var storeDetails = {
					storeNames: storeName,
					storeLink: storeLink,
					storeThumb: "http://pizza.de/" + storeThumb,
					storeAddress: storeAddress,
					storeDeliveryCosts: storeDeliveryCosts,
					storeOrderMin: storeOrderMin,
					storeOpening: storeOpeningTime,
					storeCurrentlyOpen: storeCurrentlyOpen
					
				}
				
				if (storeCurrentlyOpen) {
					allTheStores.push(storeDetails);
				}
				
			});	
			
			var storeCount = allTheStores.length;			
			var randomStore = allTheStores[Math.floor(Math.random() * allTheStores.length)]
			console.log(randomStore);
			
			$(".store-link").attr("href", randomStore.storeLink);
			$(".store-thumb").attr("src", randomStore.storeThumb);
			$(".store-name").html("<a target=\"_blank\" href=\"" + randomStore.storeLink + "\" class=\"store-link\">" + randomStore.storeNames + "</a>");
			$(".store-opening").html(randomStore.storeOpening);
			$(".store-order-min").html(randomStore.storeOrderMin);
			$(".store-delivery-cost").html(randomStore.storeDeliveryCosts);
			
			$(".store-details").show();
			
		});
	});

});