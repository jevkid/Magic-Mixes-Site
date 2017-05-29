var indexController = function(){

	var module = {};

	module.init = function(){
    indexController.setupTemplates();
    console.log('setup');
	};

	module.setupTemplates = function(){

		var template = helpers.compileRactive({
			template: 'item',
			outlet: 'item',
			data: {}
		});
    
    var apiKey = 'tz1wjg6wvmvezr1o3xv4rom6';
    var shopName = 'VelvetFoxStudio';

    $.ajax({
      url: "https://openapi.etsy.com/v2/shops/" + shopName + "/listings/active.js?api_key=" + apiKey + "&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100",
      dataType: 'jsonp',
      success: function(response){
        template.set('result', response.results);
        console.log(template.get('result'));
      },
    });
	};

  return module;
}();

$(document).ready(function() {
  indexController.init();
});