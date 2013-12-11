
var TimelineEntry = Backbone.Model.extend({
    defaults : {
        title: 'Title',
        employer: 'Employer',
        location: 'City, State',
        startDate: new Date(),
        endDate: new Date,
        body: ''
    },
    idAttribute: '_id',
    validate: function(attrs, options) {
        var title = attrs.title;
        if (title.match(/\s+/g) != null) {
            return "invalid title attribute";
        }
    },
    initialize: function(){
        this.on("change", function(model){});
        this.on("invalid", function(){});
    }
});

var TimelineList = Backbone.Collection.extend({
    model : TimelineEntry,
    url: "/api/timeline",
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

var TimelineView = Backbone.View.extend({
    tagName: "div",
    className: "well well-small",
    initialize: function() {
        _.bindAll(this,'render');
        this.model.bind('change', this.render);
    },
    render: function () {
        var jobObj = {
            id: this.model.get("_id"),
            title: this.model.get("title"),
            employer: this.model.get("employer"),
            location: this.model.get("location"),
            startDate: this.model.get("startDate"),
            endDate: this.model.get("endDate"),
            body: this.model.get("body")
        };
        this.$el.append(_.template($("#list-timeline-template").html(), jobObj));
        return this;
    }
});

var TimelineListView = Backbone.View.extend({
    el: "#timeline-list-form",
    initialize: function() {
        _.bindAll(this, 'render','renderTimelineRow','renderTemplate',
            'addTimeline','editTimeline','deleteTimeline',
            'saveTimeline','cancelEditTimeline');
        this.collection = new TimelineList();
        this.collection.bind('change', this.render, this);
        this.collection.bind('remove', this.render, this);
    },

    events:{
        "click .add-timeline-button":"addTimeline",
        "click .edit-timeline-button":"editTimeline",
        "click .save-timeline-button":"saveTimeline",
        "click .cancel-timeline-button":"cancelEditTimeline",
        "click .delete-timeline-button":"deleteTimeline"
    },

    render: function () {

        var self = this;
        this.$el.html("");
        this.$el.append(this.renderTemplate("#add-timeline-template",{}));

        _(this.collection.models).each(
            function(item){
                self.renderTimelineRow(item);
            }, this);

        return this;
    },

    renderTemplate: function(name, obj) {
        var template = _.template($(name).html(), obj);
        return template;
    },

    renderTimelineRow: function(item) {
        var timelineItem = new TimelineView({model:item});
        $('#timeline-list-form').append(timelineItem.render().el);
        // this.$el.append(timelineItem.render().el);
    },

    addTimeline: function(e) {
        e.preventDefault();
        var newJob = new TextContent({
            title: $('#timeline-title').val(),
            employer: $('#timeline-employer').val(),
            location: $('#timeline-location').val(),
            startDate: $('#timeline-start').val(),
            endDate: $('#timeline-end').val(),
            body: $('#timeline-body').val()
        });
        this.collection.add(newJob, {merge:true, at:0});
        newJob.save({},{
            success: function() {},
            error: function() {}
        });
        return false;
    },

    editTimeline: function(e) {
        e.preventDefault();
        var model = this.collection.get(e.target.value);
        var el = $(e.target).closest('div.well');
        el.empty();
        var jobObj = {
            id: model.get("_id"),
            title: model.get("title"),
            employer: model.get("employer"),
            location: model.get("location"),
            startDate: model.get("startDate"),
            endDate: model.get("endDate"),
            body: model.get("body")
        };
        var template = this.renderTemplate("#edit-timeline-template",jobObj);
        el.append($(template));
        CKEDITOR.replace('ckeditor-'+jobObj.id);
        return false;
    },

    cancelEditTimeline: function(e) {
        e.preventDefault();
        this.render();
        return false;
    },

    saveTimeline: function(e) {
        e.preventDefault();
        var model = this.collection.get(e.target.value);
        var editorName = 'ckeditor-'+model.get("_id");
        model.set('body', CKEDITOR.instances[editorName].getData());
        model.save({},{
            success: function() {},
            error: function() {}
        });
        return false;
    },

    deleteTimeline: function(e) {
        e.preventDefault();
        var model = this.collection.get(e.target.value);
         model.destroy({
            success: function(model, response, options) {},
            error: function(model, xhr, options) {}
        });
        return false;
    }
});