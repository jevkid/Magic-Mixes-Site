{"v":4,"t":["var indexController = function(){\n\n\tvar module = {};\n\tvar credentials;\n\n\tmodule.init = function(){\n    indexController.setupTemplates();\n\n\t};\n\n\tmodule.setupTemplates = function(){\n\n\t\tvar itemTemplate = helpers.compileRactive({\n\t\t\ttemplate: 'item',\n\t\t\toutlet: 'item',\n\t\t\tdata: {},\n\t\t\tviewDetails: false\n\t\t});\n\n\t\titemTemplate.on('viewToggle', function(target){\n\t\t\titemTemplate.toggle(target.keypath + '.viewDetails');\n\t\t});\n\n\t\tvar apiKey;\n\t\tvar shopName;\n\n\t\t$.ajax({\n\t\t\turl   : '/assets/info.json',\n\t\t\tasync : false,\n\t\t\ttype  : 'GET'\n\t\t}).done(function(data){\n\t\t\tvar credentials = JSON.stringify(data);\n\n\t\t\tapiKey = data[0].apiKey;\n\t\t\tshopName = data[1].shopName;\n\t\t});\n\n\t\t$.ajax({\n\t\t\turl: \"https://openapi.etsy.com/v2/shops/\" + shopName + \"/listings/active.js?api_key=\" + apiKey + \"&includes=MainImage&fields=url,price,title,shop_section_id,description&limit=100\",\n\t\t\tdataType: 'jsonp',\n\t\t\tsuccess: function(data){\n\t\t\t\titemTemplate.set('result', data.results);\n\t\t\t},\n\t\t});\n\n\t\tvar menuTemplate = helpers.compileRactive({\n\t\t\ttemplate: 'menu',\n\t\t\toutlet: 'menu',\n\t\t\tdata: {}\n\t\t});\n\n\t\t$.ajax({\n      url: \"https://openapi.etsy.com/v2/shops/\" + shopName + \"/sections.js?api_key=\" + apiKey,\n      dataType: 'jsonp',\n      success: function(data){\n      \tmenuTemplate.set('categories', data.results);\n      },\n    });\n\n\n\t};\n\n  return module;\n}();\n\n$(document).ready(function() {\n  indexController.init();\n});\n"]}