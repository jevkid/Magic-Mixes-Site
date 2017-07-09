{"v":4,"t":["var sectionController = function(){\n\n\tvar module = {};\n\n\tmodule.init = function(){\n    sectionController.setupTemplates();\n\t};\n\n\tmodule.setupTemplates = function(){\n\t\tvar apiKey = 'tz1wjg6wvmvezr1o3xv4rom6';\n\t\tvar shopName = 'VelvetFoxStudio';\n\n\t\tvar template = helpers.compileRactive({\n\t\t\ttemplate: 'dropdown',\n\t\t\toutlet: 'dropdown',\n\t\t\tdata: {}\n\t\t});\n\n\t\ttemplate.on('searchText', function(){\n\t\t\ttemplate.toggle('searchInput');\n\t\t});\n\n\t\ttemplate.on('searchProducts', function(target){\n\t\t\tconsole.log(target);\n\t\t});\n\n    $.ajax({\n      url: \"https://openapi.etsy.com/v2/shops/\" + shopName + \"/sections.js?api_key=\" + apiKey,\n      dataType: 'jsonp',\n      success: function(response){\n        template.set('sections', response.results);\n      },\n    });\n\n\t};\n\n  return module;\n}();\n\n$(document).ready(function() {\n  sectionController.init();\n});\n"]}