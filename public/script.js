var app = new Vue({
  el: '#app',
  data: {
    posts: [],
    text: '',
    date: '',
    drag: {},
  },
  created: function() {
    this.getPosts();
  },
  computed: {
  },
  methods: {
    getPosts: function() {
        axios.get("/api/posts").then(response => {
  	    this.posts = response.data;
        this.posts.reverse();
  	    return true;
      }).catch(err => {
        });
    },
    addItem: function() {
      var todaydate = new Date();
   var day = todaydate.getDate();
   var month = todaydate.getMonth() + 1;
   var year = todaydate.getFullYear();
   this.date = month + "/" + day + "/" + year;
      axios.post("/api/posts", {
	    text: this.text,
      date: this.date,
      }).then(response => {
	       this.text = "";
	       this.getPosts();
	       return true;
      }).catch(err => {
      });
    },
    deletePost: function(post) {
      axios.delete("/api/posts/" + post.id).then(response => {
         this.getPosts();
         return true;
      }).catch(err => {
      });
    },
    dragPost: function(post) {
      this.drag = post;
    },
    dropPost: function(post) {
      axios.put("/api/posts/" + this.drag.id, {
	       text: this.drag.text,
         date: this.drag.date,
	       orderChange: true,
	       orderTarget: post.id
      }).then(response => {
	       this.getPosts();
	       return true;
      }).catch(err => {
      });
    },
  }
});

// var app = new Vue({
//   el: '#app',
//   data: {
//     items: [],
//     text: '',
//     priority: '',
//     show: 'all',
//     drag: {},
//     localhost: 'localhost',//'159.89.141.74' //
//   },
//   created: function() {
//     this.getItems();
//   },
//   computed: {
//     activeItems: function() {
//       return this.items.filter(function(item) {
// 	return !item.completed;
//       });
//     },
//     filteredItems: function() {
//       if (this.show === 'active')
// 	return this.items.filter(function(item) {
// 	  return !item.completed;
// 	});
//       if (this.show === 'completed')
// 	return this.items.filter(function(item) {
// 	  return item.completed;
// 	});
//       return this.items;
//     },
//   },
//   methods: {
//     addItem: function() {
//       axios.post("/api/items", {
// 	    text: this.text,
//       priority: this.priority,
// 	    completed: false
//       }).then(response => {
// 	       this.text = "";
//          this.priority= '';
// 	       this.getItems();
// 	       return true;
//       }).catch(err => {
//       });
//     },
//     completeItem: function(item) {
//       axios.put("/api/items/" + item.id, {
// 	       text: item.text,
// 	       completed: !item.completed,
// 	       orderChange: false,
//       }).then(response => {
// 	       return true;
//       }).catch(err => {
//       });
//     },
//     increasepriority: function(item) {
//       axios.put("/api/items/" + item.id, {
//         text: item.text,
//         priority: item.priority + 1,
//         completed: item.completed,
//         orderChange: false,
//       }).then(response => {
//           this.getItems();
//           return true;
//       }).catch(err => {
//       });
//     },
//     decreasepriority: function(item) {
//       axios.put("/api/items/" + item.id, {
//         text: item.text,
//         priority: item.priority - 1,
//         completed: item.completed,
//         orderChange: false,
//       }).then(response => {
//           this.getItems();
//           return true;
//       }).catch(err => {
//       });
//     },
//     sortyByPriority: function(){
//       axios.post("/api/items/sort").then(response => {
//         this.getItems();
//         return true;
//       }).catch(err => {
//       });
//     },
//     deleteItem: function(item) {
//       axios.delete("/api/items/" + item.id).then(response => {
// 	       this.getItems();
// 	       return true;
//       }).catch(err => {
//       });
//     },
//     showAll: function() {
//       this.show = 'all';
//     },
//     showActive: function() {
//       this.show = 'active';
//     },
//     showCompleted: function() {
//       this.show = 'completed';
//     },
//     deleteCompleted: function() {
//       this.items.forEach(item => {
// 	       if (item.completed)
// 	       this.deleteItem(item)
//       });
//     },
//     dragItem: function(item) {
//       this.drag = item;
//     },
//     dropItem: function(item) {
//       axios.put("/api/items/" + this.drag.id, {
// 	       text: this.drag.text,
//          priority: this.drag.priority,
// 	       completed: this.drag.completed,
// 	       orderChange: true,
// 	       orderTarget: item.id
//       }).then(response => {
// 	       this.getItems();
// 	       return true;
//       }).catch(err => {
//       });
//     },
//     getItems: function() {
//       axios.get("/api/items").then(response => {
// 	    this.items = response.data;
// 	    return true;
//     }).catch(err => {
//       });
//     },
//   }
// });
