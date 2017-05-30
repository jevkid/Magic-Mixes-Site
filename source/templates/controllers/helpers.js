var helpers = function(){
	var module = {};

	module.compileRactive = function(options) {
    var template = $('[data-template="' + options.template + '"]').html();

    return new Ractive({
      el: '[data-outlet="' + options.outlet + '"]',
      template: template,
      data: options.data ? options.data : {},
      computed: options.computed ? options.computed : {}
    });
  };

  module.compileHandlebars = function(options, overwrite) {
    var template = document.querySelector('[data-template="' + options.template + '"]').innerHTML;

    var hbsTemplate = Handlebars.compile(template);
    var compiledTemplate = hbsTemplate(options.data ? options.data : {});

    if(!options.$outlet) {
      options.$outlet = $('[data-outlet="' + options.outlet + '"]');
    }

    if(overwrite) {
      options.$outlet.html($(compiledTemplate));
    } else {
      options.$outlet.append($(compiledTemplate));
    }


  };

  module.loadJson = function(callback){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/assets/info.json', true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == "200") {
          // .open will NOT return a value but simply returns undefined in async mode so use a callback
          callback(xobj.responseText);
      }
    }
    xobj.send(null);
  };

  module.loadFile = function(type) {
    $.getJSON('/assets/info.json', function(data){
      var credentials = JSON.stringify(data);
      console.log(data[0]);
      console.log(data.apiKey);
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