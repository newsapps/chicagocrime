define([
    'jquery',
    'underscore',
    'backbone',
    'pagedown',
    'highlight'
], function($, _, Backbone, Markdown, hljs) {

    var DocDetailView = Backbone.View.extend({
        id: 'doc-detail',
        className: 'page-content',
        initialize: function(options) {
            this.doc_id = options.doc_id;
            this.converter = new Markdown.Converter();
            this.render();
        },
        render: function(){ //Convention
            var el = $('<div>').hide().appendTo(this.$el);
            var converter = this.converter;
            require(['text!docs/' + this.doc_id], function(doc) {
                el.html(converter.makeHtml(doc)).show();
                el.find('[data-api-url]').each(function() {
                    var block = this;
                    $.ajax({
                        url:  $(this).data('api-url'),
                        dataType: 'jsonp',
                        success: function(data) {
                            $(block).html($('<pre><code class="language-json">' + JSON.stringify(data, null, 4) + '</code></pre>'));
                            hljs.highlightBlock(block);
                        }
                    });

                });
            });
        }
    });

    return DocDetailView;

});
