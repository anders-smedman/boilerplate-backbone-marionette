
var app = {}


// models
// ------------------
app.Entry = Backbone.Model.extend({
  defaults: {
    image: '',
    link: '',
  }
})


// collections
// ------------------
app.EntryList = Backbone.Collection.extend({
  model: app.Entry,
  url: `${process.env.INSTAGRAM_API_URL}` + `${process.env.INSTAGRAM_PROFILE}`,
  parse: function(response){
    return response.images // images is an array with objects {image:'' , link:''}
  }
})
app.entryList = new app.EntryList()


// views
// ------------------
app.EntryView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($("#entrytemplate").html()),
  // template: _.template('<img src="<%- image %>">'),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this; // enable chained calls
  }
})

// app.EntryView = Marionette.View.extend({
//   tagName: 'li',
//   template: _.template($('#entrytemplate').html()),
//   render: function(){
//     console.log("rendering a EntryView")
//     this.$el.html(this.template(this.model.toJSON()))
//     return this; // enable chained calls
//   }
// })


// ------------------
app.AppView = Backbone.View.extend({
  el: "#fblist",
  initialize: function () {
    this.collection = new app.EntryList(app.Entry)
    this.render()
  },
  render: function(){
    var that = this, p
    console.log("fetching...")
    resp = this.collection.fetch()
    resp.done(function () {
      $("#list").html("")
      _.each(that.collection.models, function(item){
        that.renderApp(item)
      }, that)
      console.log("fetched!")
    })
  },
  renderApp: function (item) {
    var view  = new app.EntryView({
      model: item
    })
    $('#list').append(view.render().el)
  },
})


// init the app
// ------------------
app.appView = new app.AppView()

