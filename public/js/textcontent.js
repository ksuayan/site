
var TextContent = Backbone.Model.extend({
    defaults : {
        text        : '',
        name        : '',
        locale      : 'en_US',
        contentType : 'text/html',
        dateCreated : new Date()
    },
    idAttribute: '_id',
    validate: function(attrs, options) {
        var name = attrs.name;
        if (name.match(/\s+/g) != null) {
            return "invalid name attribute";
        }
    },
    initialize: function(){
        this.on("change", function(model){});
        this.on("invalid", function(){});
    }
});

var TextList = Backbone.Collection.extend({
    model : TextContent,
    url: "/api/text",
    idAttribute: '_id',
    initialize: function() {
        _.bindAll(this,'retrieve');
        this.retrieve();
    },
    retrieve: function() {
        var self = this;
        this.fetch({
            success: function(collection, response, options) {
                self.reset();
                self.add(response);
                self.trigger("change");
            },
            error: function(collection, xhr, options){}
        });
    }
});

var TextContentView = Backbone.View.extend({
    tagName: "div",
    className: "well well-small",
    initialize: function() {
        _.bindAll(this,'render');
        this.model.bind('change', this.render);
    },
    render: function () {
        var textObj = {
            id: this.model.get("_id"),
            name: this.model.get("name"),
            text: this.model.get("text")
        };
        this.$el.append(_.template($("#list2-text-template").html(), textObj));
        return this;
    }
});

var TextListView = Backbone.View.extend({
    el: "#text-list-form",
    // tagName: 'form',
    // id: 'text-list-form',
    initialize: function() {
        _.bindAll(this, 'render','renderTextRow','renderTemplate',
            'addText','editText','deleteText','saveText','cancelEditText');
        this.collection = new TextList();
        this.collection.bind('change', this.render, this);
        this.collection.bind('remove', this.render, this);
    },

    events:{
        "click .add-text-button":"addText",
        "click .edit-text-button":"editText",
        "click .save-edit-button":"saveText",
        "click .cancel-edit-button":"cancelEditText",
        "click .delete-text-button":"deleteText"
    },

    render: function () {

        var self = this;
        this.$el.html("");
        this.$el.append(this.renderTemplate("#add-text-template",{}));


        _(this.collection.models).each(
            function(item){
                self.renderTextRow(item);
            }, this);

        return this;
    },

    renderTemplate: function(name, obj) {
        var template = _.template($(name).html(), obj);
        return template;
    },

    renderTextRow: function(item) {
        var textItem = new TextContentView({model:item});
        $('#text-list-form').append(textItem.render().el);
    },

    addText: function(e) {
        e.preventDefault();
        var newText = new TextContent({
            name: $('#text-name').val(),
            text: $('#text-value').val()
        });
        this.collection.add(newText, {merge:true, at:0});
        newText.save({},{
            success: function() {},
            error: function() {}
        });
        return false;
    },

    editText: function(e) {
        e.preventDefault();
        var model = this.collection.get(e.target.value);
        var el = $(e.target).closest('div.well');
        el.empty();
        var textObj = {
            name: model.get("name"),
            text: model.get("text"),
            id: model.get("_id")
        };
        var template = this.renderTemplate("#edit-text-template",textObj);
        el.append($(template));
        CKEDITOR.replace('ckeditor-'+textObj.id);
        return false;
    },

    cancelEditText: function(e) {
        e.preventDefault();
        this.render();
        return false;
    },

    saveText: function(e) {
        e.preventDefault();
        var model = this.collection.get(e.target.value);
        var editorName = 'ckeditor-'+model.get("_id");
        model.set('text', CKEDITOR.instances[editorName].getData());
        model.save({},{
            success: function() {},
            error: function() {}
        });
        return false;
    },

    deleteText: function(e) {
        e.preventDefault();
        var model = this.collection.get(e.target.value);
        model.destroy({
            success: function(model, response, options) {
            },
            error: function(model, xhr, options) {
            }
        });
        return false;
    }
});