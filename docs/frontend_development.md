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

Edit `js/router.js` and add your route (added code is in **bold**):

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

![Crime toolbar](/docs/img/crime-toolbar.png)

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

Like our router, the view doesn't do much yet except display a simple message, and nothing calls it yet. We'll wire it up first to prove it works, then make it do something useful.

**Behind the scenes**: This little view demonstrates two patterns. First, it uses `define` to export a Javascript module that can be loaded by RequireJS. Second, it demonstrates the simplest possible Backbone view -- this view renders itself upon initialization, and rendering simply fills the view's automatically created HTML element with a short message.

# Wire up the view

Now you'll want to register your view with the crime application. We want to make `TheftReportView` render when the `theft_report` route is called. 

To do this, open up `js/views/CrimeAppView.js` and start editing the first lines:

<pre>
define([
    'jquery',
    'backbone',
    'views/PageView',
    'views/CommunityAreaListView',
    'views/CommunityAreaDetailView',
    'views/DocListView','views/DocDetailView',
    'views/CommunityAreaMonthlySummary', 
    <strong>'views/TheftReportView'</strong>
], function($, Backbone, PageView, CommunityAreaListView, 
            CommunityAreaDetailView, DocListView, DocDetailView, 
            CommunityAreaMonthlySummary, <strong>TheftReportView</strong>) {

    var CrimeAppView = Backbone.View.extend({
        # ...
    });

    return CrimeAppView;
});
</pre>

Now, bind the `TheftReportView` to the `theft_report` route event by adding to `CrimeAppView.initialize`:

<pre>
    # ...
    var CrimeAppView = Backbone.View.extend({
        # ...
        initialize: function(options) {
            # ...

            <strong>this.router.on('route:theft_report', function(args) {
                app.swap_view(TheftReportView);
            });</strong>
        }
    });

    return CrimeAppView;
</pre>

Check the application in your browser by reloading and clicking the theft report link.

![Working view](/docs/img/working-view.png)

Lo and behold, a theft report will be there soon!

**Behind the scenes**: Our application handles swapping out views, and views are responsible for rendering themselves. Backbone doesn't impose strong application development patterns, so this is just one way to wire up routes and views. This is a blessing and curse of Backbone -- it scales from tiny projects to the fairly elaborate, but you'll need to write code to string it all together. 

*This code needs improvement! Please help us remove some of the boilerplate and make this less tedious.*

# Render a simple summary by talking with the API

Time to have a pleasant and orderly chat with the crime API using a Backbone collection. The collection is already defined -- we just have to ask it for data and render once we've got it.

Back to `js/views/TheftReportView.js`:

<pre>
define([
    'backbone',
    <strong>'moment',
    'collections/DateSummaryCollection',</strong>
], function(Backbone, <strong>moment, DateSummaryCollection</strong>) {
    var TheftReportView = Backbone.View.extend({
        <strong>collection: new DateSummaryCollection(),
        id: 'theft-report',
        initialize: function(options) {
            this.now = moment().subtract('weeks', 1);
            this.last_month = moment().subtract('weeks', 3);
            this.collection.bind('sync', this.render, this);
            this.collection.fetch({
                data: {
                    'crime_date__gte': this.last_month.format(),
                    'limit': 0
                }
            });
        },
        render: function() {
            var theft_counts = this.collection.pluck('theft');
            var sum = _.reduce(theft_counts, function(memo, num){ 
                return memo + num; 
            }, 0);
            var template = _.template('&lt;p&gt;There were &lt;%= thefts %&gt; thefts in Chicago from &lt;%= then %&gt; to &lt;%= now %&gt;&lt;/p&gt;'); 
            this.$el.html(template({ 
                'thefts': sum, 
                'then': this.last_month.format('MMMM Do YYYY'), 
                'now': this.now.format('MMMM Do YYYY') 
            }));
            return this;
        }</strong>
    });

    return TheftReportView;

});
</pre>

So what's happening here? Let's look closely:

First, we're loading the `moment` library as well as our `DataSummaryCollection`.

In our view definition, we've added the collection as well as an element ID for  styling.

In the initialize function, we use moment to generate a time range we can format for display and querying the data set. 

Then we bind the collection's `sync` event to the render function. When data is retrieved via ajax, we'll render.

Then we query the dataset by passing in `{ data: { 'field__OPERATOR=<value>' } }` to provide the API with query parameters.

When the data is fetched, `render` is called. We `pluck` the theft field from the data, then simply add up the values. Finally, we provide our variables -- start date, end date, total thefts -- to an Underscore template for rendering. 
