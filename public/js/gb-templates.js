this["JST"] = this["JST"] || {};

Handlebars.registerPartial("gridCell", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<td id=\"grid-"
    + container.escapeExpression(((helper = (helper = helpers.cellName || (depth0 != null ? depth0.cellName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"cellName","hash":{},"data":data}) : helper)))
    + "\">&nbsp;</td>";
},"useData":true}));

Handlebars.registerPartial("gridHeaders", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <td class=\"head-"
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "</td>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<thead>\n<tr>\n    <td></td>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.gridHeaders : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</tr>\n</thead>";
},"useData":true}));

Handlebars.registerPartial("gridRows", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "  <tr>\n  <td>"
    + container.escapeExpression(((helper = (helper = helpers.rowName || (depth0 != null ? depth0.rowName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"rowName","hash":{},"data":data}) : helper)))
    + "</td>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.gridCells : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </tr>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.gridCell,depth0,{"name":"gridCell","data":data,"indent":"      ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.gridRows : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true}));

this["JST"]["handlebars/gridGroups.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper;

  return "  <h2>"
    + container.escapeExpression(((helper = (helper = helpers.groupName || (depth0 != null ? depth0.groupName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"groupName","hash":{},"data":data}) : helper)))
    + "</h2>\n  <table class=\"table\">\n"
    + ((stack1 = container.invokePartial(partials.gridHeaders,depth0,{"name":"gridHeaders","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + ((stack1 = container.invokePartial(partials.gridRows,depth0,{"name":"gridRows","data":data,"indent":"    ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "  </table>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.gridList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});

this["JST"]["handlebars/message.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"message-header\">\n    <span class=\"glyphicon glyphicon-time\"></span>\n    <span>"
    + alias4(((helper = (helper = helpers.ts || (depth0 != null ? depth0.ts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ts","hash":{},"data":data}) : helper)))
    + "</span>\n    <span class=\"glyphicon glyphicon-user\"></span>\n    <strong>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + ":</strong>\n    <div class=\"message\">"
    + alias4(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</div>\n</div>\n";
},"useData":true});

this["JST"]["handlebars/streamInstagram.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\"media\">\n    <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"hidden-xs\">\n        <img src=\"//cdn.suayan.com/dist/img/ks-logo.svg\" data-src=\""
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.pictures : depth0)) != null ? stack1.low_resolution : stack1)) != null ? stack1.url : stack1), depth0))
    + "\" class=\"instagram lazy\"/>\n    </a>\n    <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" class=\"visible-xs\">\n        <img src=\"//cdn.suayan.com/dist/img/ks-logo.svg\" data-src=\""
    + alias4(alias5(((stack1 = ((stack1 = (depth0 != null ? depth0.pictures : depth0)) != null ? stack1.standard_resolution : stack1)) != null ? stack1.url : stack1), depth0))
    + "\" class=\"instagram lazy\"/>\n    </a>\n    <div class=\"caption\">\n        <span class=\"label label-primary\">Instagram</span>\n        <span class=\"when\">"
    + alias4(((helper = (helper = helpers.ago || (depth0 != null ? depth0.ago : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ago","hash":{},"data":data}) : helper)))
    + "</span>\n        <h2>"
    + alias4(((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper)))
    + "</h2>\n    </div>\n</div>";
},"useData":true});

this["JST"]["handlebars/streamTwitter.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.permalink || (depth0 != null ? depth0.permalink : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"permalink","hash":{},"data":data}) : helper)))
    + "\" class=\"permalink\" target=\"_blank\">"
    + alias4(((helper = (helper = helpers.permalink || (depth0 != null ? depth0.permalink : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"permalink","hash":{},"data":data}) : helper)))
    + "</a>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"media\">\n    <div class=\"caption twitter\">\n        <span class=\"label label-primary\">Twitter</span>\n        <span class=\"when\">"
    + alias4(((helper = (helper = helpers.ago || (depth0 != null ? depth0.ago : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ago","hash":{},"data":data}) : helper)))
    + "</span>\n        <a href=\"http://twitter.com/"
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "\" class=\"handle\">@"
    + alias4(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"user","hash":{},"data":data}) : helper)))
    + "</a>\n        <h2>"
    + alias4(((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper)))
    + "</h2>\n        "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.permalink : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    </div>\n</div>";
},"useData":true});

this["JST"]["handlebars/streamVimeo.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function";

  return "<div class=\"media\">\n    <div class=\"caption\">\n        <div class=\"vimeo\">"
    + ((stack1 = ((helper = (helper = helpers.body || (depth0 != null ? depth0.body : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"body","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n        <span class=\"label label-primary\">Vimeo</span>\n        <span class=\"when\">"
    + container.escapeExpression(((helper = (helper = helpers.ago || (depth0 != null ? depth0.ago : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ago","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n</div>\n";
},"useData":true});

this["JST"]["handlebars/systemMessage.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"message\">"
    + container.escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"message","hash":{},"data":data}) : helper)))
    + "</div>\n";
},"useData":true});

this["JST"]["handlebars/tile.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<p>"
    + ((stack1 = container.lambda(depth0, depth0)) != null ? stack1 : "")
    + "</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "  <span class=\"label label-primary\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<h2>"
    + alias4(((helper = (helper = helpers.pageTitle || (depth0 != null ? depth0.pageTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pageTitle","hash":{},"data":data}) : helper)))
    + "</h2>\n<h3>"
    + alias4(((helper = (helper = helpers.subhead || (depth0 != null ? depth0.subhead : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subhead","hash":{},"data":data}) : helper)))
    + "</h3>\n<p class=\"description\">"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.body : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<div class=\"indent\">\n  <span class=\"label\">Tech:</span>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.tech : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["JST"]["handlebars/user-label.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<span class=\"label "
    + alias4(((helper = (helper = helpers.labelType || (depth0 != null ? depth0.labelType : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"labelType","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</span>\n";
},"useData":true});

this["JST"]["handlebars/vimeo.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"media\">\n    <div class=\"media-heading\">\n        <h2><a href=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</a>, "
    + alias4(((helper = (helper = helpers.ago || (depth0 != null ? depth0.ago : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ago","hash":{},"data":data}) : helper)))
    + "</h2>\n    </div>\n    <div class=\"media-body\">\n        "
    + ((stack1 = container.lambda(((stack1 = (depth0 != null ? depth0.embed : depth0)) != null ? stack1.html : stack1), depth0)) != null ? stack1 : "")
    + "\n    </div>\n</div>\n";
},"useData":true});