# Diving into Chicago Crime frontend app

You are looking at the Chicago Crime frontend app. This app is meant to make it
easy for developers to start building visualizations with the Chicago Tribune
Chicago Crime API.

This app uses Backbone JS and RequireJS to provide a single-page app pattern. 
To work with the crime app locally, you'll need git, a text editor, and a modern web browser (Windows users will need to use Firefox).

Backbone and Require can be a little inscrutable and daunting. Instead of talking theory, let's dive in and build a little theft reporting component.

(*TODO* More front matter?)

# Set up a route

Just like Django's urlconfs, Flask's url router decorator, Drupal's menu system, Backbone provides a way to intercept URLs and execute code. Backbone routers can use "hash" urls (`index.html#section/blog`) which cannot easily be indexed by search engines or the newer HTML5 pushState API. For portability and ease, this app uses hash urls.

Edit `js/router.js` and add your route (added line in bold):

<pre>
define([ 'backbone' ], function(Backbone) {
    var Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'community': 'community_areas',
            'community/:community_area_id': 'community_area_detail',
            'community/:community_num/month/:month_num': 'monthly_summary',
            'docs': 'documentation',
            'docs/:id': 'doc_view',
            <strong>'theft': 'theft_report'</strong>
        }
    });
    return Router;
});
</pre>

The part on the left (`theft`) represents a URL (`index.html#theft`) that is mapped to a Backbone route called `theft_report`. 

At the moment, your new route doesn't do anything of note, but it will show up
magically in your menu bar as "Theft report".

![](/docs/img/crime-toolbar.png)

# Add a view

Create a file called `TheftReportView.js` in `js/views`. Here's what it should look like:

<pre>
define([
    'backbone',
], function(Backbone) {

    var TheftReportView = Backbone.View.extend({
        initialize: function(options) {
            this.render();
        },
        render: function() {
            this.$el.html('Hello world! An awesome theft report will be here soon.');
            return this;
        }
    });

    return TheftReportView;

});
</pre>

Like our router, the view doesn't do much yet. We'll wire it up first to prove it works, then make it do something useful.

# Wire up the view

Now you'll want to register your view with the crime application. We want to make `TheftReportView` render when the `theft_report` route is called. 

*This code needs improvement! Please help us remove some of the boilerplate.*
