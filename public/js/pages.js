var Page = Backbone.Model.extend({
    defaults: {
        name: '',
        title: '',
        description: '',
        keywords: '',
        content: []
    },
    validate: function(attrs, options) {
        var name = attrs.name;
        if (name.match(/\s+/g) != null) {
            return "invalid name attribute";
        }
    },
    idAttribute: '_id',
    initialize: function () {
        this.on("change", function (model) {});
    }
});

var PageList = Backbone.Collection.extend({
    model: Page,
    url: "/api/page",
    idAttribute: '_id',
    initialize: function () {
        _.bindAll(this, 'retrieve');
        this.retrieve();
    },
    retrieve: function () {
        var self = this;
        this.fetch({
            success: function (collection, response, options) {
                self.reset();
                self.add(response);
                self.trigger("change");
            },
            error: function (collection, xhr, options) {
            }
        });
    }
});

var PageContentView = Backbone.View.extend({
    tagName: "tr",
    initialize: function () {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },
    render: function () {
        var pageObj = {
            id: this.model.get("_id"),
            name: this.model.get("name"),
            title: this.model.get("title"),
            description: this.model.get("description"),
            keywords: this.model.get("keywords"),
            content: this.model.get("content")
        };
        this.$el.append(_.template($("#list-page-template").html(), pageObj));
        return this;
    }
});


var PageListView = Backbone.View.extend({
    el: '#page-list',
    initialize: function() {
         _.bindAll(this, 'render', 'renderPageRow', 'renderTemplate',
              'addPage','editPage','savePage','cancelEditPage','deletePage');
        this.collection = new PageList();
        this.collection.bind('change', this.render, this);
        this.collection.bind('remove', this.render, this);
    },


    events: {
        "click .add-page-button": "addPage",
        "click .edit-page-button": "editPage",
        "click .save-page-edit": "savePage",
        "click .cancel-page-edit": "cancelEditPage",
        "click .delete-page-button": "deletePage"
    },

    render: function () {
        var self = this;
        this.$el.html("");
        this.$el.append(this.renderTemplate("#add-page-template"));
        _(this.collection.models).each(function (item) {
            self.renderPageRow(item);
        }, this);
        return this;
    },

    renderTemplate: function (name, obj) {
        return _.template($(name).html(), obj);
    },

    renderPageRow: function (item) {
        var pageItem = new PageContentView({model: item});
        this.$el.append(pageItem.render().el);
    },

    addPage: function (e) {
        e.preventDefault();
        var newPage = new Page({
            name: $('#page-name').val(),
            title: $('#page-title').val()
        });
        this.collection.add(newPage, {merge: true, at: 0});
        newPage.save({}, {
            success: function () {
            },
            error: function () {
            }
        });
        return false;
    },

    editPage: function (e) {
        e.preventDefault();
        var model = this.collection.get(e.target.value);
        var el = $(e.target).closest('tr');
        el.empty();

        var content = model.get("content");
        var selectedIDs = [];

        console.debug("content-attribute:", typeof content);
        if (typeof content === "string") {
            selectedIDs = content.split("|");
            console.debug("selectedIDs split: ", selectedIDs);
        } else if (typeof content === "object") {
            selectedIDs = _.pluck(model.get("content"),"_id");
            console.debug("selectedIDs plucked: ", selectedIDs);
        }

        var textList = [];
        _.each(textListView.collection.models, function(item){
            var menuItem = {
                _id: item.get("_id"),
                name: item.get("name")
            };
            textList.push(menuItem);
        });
        textList.sort(function(a,b){
            if (a.name == b.name) return 0;
            if (a.name < b.name) return -1;
            else return 1;
        });

        var pageObj = {
            id: model.get("_id"),
            name: model.get("name"),
            title: model.get("title"),
            description: model.get("description"),
            keywords: model.get("keywords"),
            content: selectedIDs,
            textList: textList
        };

        var template = this.renderTemplate("#edit-page-template",pageObj);
        el.append($(template));
        return false;
    },

    savePage: function (e) {
        e.preventDefault();
        var model = this.collection.get(e.target.value);
        var id = model.get("_id");

        var pageObj = {
            title: $('#title-'+id).val(),
            description: $('#desc-'+id).val(),
            keywords: $('#keywords-'+id).val()
        };

        if (model) {
            model.set(pageObj);
        }

        var selectedIDs = [];
        $("#content-"+id+" option:selected")
            .each(function(){
                selectedIDs.push($(this).val());
            });

        if (selectedIDs.length)
            model.set("content", selectedIDs.join("|"));
        else
            model.set("content", null);

        model.save({},{
            success: function() {},
            error: function() {}
        });
        return false;
    },

    cancelEditPage: function (e) {
        e.preventDefault();
        this.render();
        return false;
    },

    deletePage: function (e) {
        e.preventDefault();
        var model = this.collection.get(e.target.value);
        model.destroy({
            success: function(model, response, options) {
                console.debug("deleted", model);
            },
            error: function(model, xhr, options) {
                console.debug("error deleting");
            }
        });
        return false;
    }
});
