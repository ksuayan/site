
$(function() {
    
    var Track = Backbone.Model.extend({
        defaults : {
            Name : 'Default Name',
            Artist : 'Artist Name',
            Album : 'Album Name'
        },
        idAttribute: '_id',
        initialize: function(){
            this.on("change", function(model){
            });
        }
    });
    
    var Tracks = Backbone.Collection.extend({
        model : Track,
        url: function() {
            var term = $("#search-term").val() || "hello";
            var url = "/search/"+term;
            return url;
        },
        initialize: function() {
            _.bindAll(this,'retrieve');
            this.retrieve();
        },
        retrieve: function() {
            var self = this;
            this.fetch({
                success: function(collection, response, options) {
                    self.reset();
                    self.add(response.result);
                    self.trigger("change");
                },
                error: function(collection, xhr, options){}
            });
        }
    });
    
    var TrackView = Backbone.View.extend({
        tagName: "tr",
        initialize: function() {
            _.bindAll(this,'render');
            this.model.bind('change', this.render);
        },    
        render: function () {
            var self = this;
            $(this.el).html(
                "<td><i class=\"icon-music\"></i> "+self.model.get("Name")+"</td>"+
                "<td>"+self.model.get("Album")+"</td>"+
                "<td>"+self.model.get("Artist")+"</td>"
               );
            return this;
        }
        
    });
    
    var ListView = Backbone.View.extend({
        el: '#tracks',
        initialize: function() {
            var self = this;
             _.bindAll(this, 'render', 'appendTrack');

            this.collection = new Tracks();
            this.collection.bind('change', this.render);
        },
        
        render: function () {
            var self = this;
            this.$el.html("");
            _(this.collection.models).each(function(item){
                self.appendTrack(item);
            }, this);
            return this;
        },
        
        appendTrack: function(item) {
            var trackView = new TrackView({model:item});
           $('#tracks').append(trackView.render().el);
        }
    });
    
    var SearchView = Backbone.View.extend({
        el: '#search-form',
        initialize: function() {
            _.bindAll(this,'render','goSearch');
            this.render();
        },
        
        events: {
            // 'submit #seach-form':'goSearch',
            'click #search-button':'goSearch',
        },
        
        render: function() {
            var template = _.template( $("#search-template").html(), {} );
            this.$el.append(template);
            return this;
        },
        
        goSearch: function(e) {
           e.preventDefault();
           listView.initialize();
        }       
    });
    
    
    var listView = new ListView();
    var searchView = new SearchView();
});