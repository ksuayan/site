var pageListView = null;
var textListView = null;
var timelineListView = null;

$(function() {
    pageListView = new PageListView();
    textListView = new TextListView();
    timelineListView = new TimelineListView();
    $('#editTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });
});