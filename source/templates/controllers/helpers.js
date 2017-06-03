var helpers = function(){
	var module = {};

	module.compileRactive = function(name) {
    var template = $('[data-template="' + name.template + '"]').html();

    return new Ractive({
      el: '[data-outlet="' + name.outlet + '"]',
      template: template,
      data: name.data ? name.data : {},
      computed: name.computed ? name.computed : {}
    });
  };

  module.loadFile = function(type) {
    $.getJSON('/assets/info.json', function(data){
      var credentials = JSON.stringify(data);

      var apiKey = credentials[0].apiKey;
      var shopName = credentials[0].shopName;
      if(type === apiKey){
        return apiKey;
      }
      if(type === shopName){
        return shopName;
      }
    });
  };

  return module;
}();
