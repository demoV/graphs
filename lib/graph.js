var UndirectedGraph = function(){
	this.vertexes = {};
};

UndirectedGraph.prototype = {
	addVertex: function(vertex){
		this.vertexes[vertex] = this.vertexes[vertex] || [];
	},
	addEdge: function(from, to){
		if(this.hasVertex(from) && this.hasVertex(to)){
			this.vertexes[from].push(to);
			this.vertexes[to].push(from)
		}	
	},
	hasEdgeBetween: function(from, to){
		return this.vertexes[from].some(function(vertex){
			return vertex == to;
		});
	},
	order: function(){
		return Object.keys(this.vertexes).length;
	},
	size: function(){
		var vertexes = this.vertexes;
		var keys = Object.keys(vertexes);
		var length = 0;
		keys.forEach(function(vertex){
			length += vertexes[vertex].length;
		});
		return length / 2;
	},
	hasVertex: function(vertex){
		vertexes = Object.keys(this.vertexes);
		return vertexes.some(function(v){
			return v == vertex;
		});
	},
	pathBetween: function(from, to, path){
		path = path || [];
		if(from == to)
			return path.concat(from);		
		for (var i = 0; i < this.vertexes[from].length; i++) {
			if(path.indexOf(this.vertexes[from][i]) == -1){
				var p = this.pathBetween(this.vertexes[from][i], to, path.concat(from));
				if(p.slice(-1) == to) return p;
			}
		};
		return [];

	},
	farthestVertex: function(vertex){
		var vertexes = Object.keys(this.vertexes);
		var self = this;
		var farthestPath = vertexes.reduce(function(farthest, v){
				var path = self.pathBetween(vertex, v);
				if(farthest.length <= path.length)
					return path;
				return farthest;
		}, []);
		return farthestPath[farthestPath.length - 1];
	},
	allPaths: function(from, to, path, paths){
		path = path || [];
		paths = paths || [];
		if(from == to){
			return path.concat(from);
			// return path;
		}		
		for (var i = 0; i < this.vertexes[from].length; i++) {
			if(path.indexOf(this.vertexes[from][i]) == -1){
				var p = this.allPaths(this.vertexes[from][i], to, path.concat(from), paths);
				if(p.slice(-1) == to) 
						paths.push(p);
			}
		};
			return paths;
	}
};

var DirectedGraph = function(){
	this.vertexes = {};
};

DirectedGraph.prototype = {
	addVertex: function(vertex){
		this.vertexes[vertex] = this.vertexes[vertex] || [];
	},
	addEdge: function(from, to){
		this.vertexes[from].push(to);
	},
	hasEdgeBetween: function(from, to){
		return this.vertexes[from].some(function(vertex){
			return vertex == to;
		});
	},
	order: function(){
		return Object.keys(this.vertexes).length;
	},
	size: function(){
		var vertexes = this.vertexes;
		var keys = Object.keys(vertexes);
		var length = 0;
		keys.forEach(function(vertex){
			length += vertexes[vertex].length;
		});
		return length;
	},
	hasVertex: function(vertex){
		vertexes = Object.keys(this.vertexes);
		return vertexes.some(function(v){
			return v == vertex;
		});
	},
	pathBetween: function(from, to, path){
		path = path || [];
		if(from == to)
			return path.concat(from);
				
		for (var i = 0; i < this.vertexes[from].length; i++) {
			if(path.indexOf(this.vertexes[from][i]) == -1){
				var p = this.pathBetween(this.vertexes[from][i], to, path.concat(from));
				if(p.slice(-1) == to) return p;
			}
		};
		return [];

	},
	farthestVertex: function(vertex){
		var vertexes = Object.keys(this.vertexes);
		var self = this;
		var farthestPath = vertexes.reduce(function(farthest, v){
				var path = self.pathBetween(vertex, v);
				if(farthest.length <= path.length)
					return path;
				return farthest;
		}, []);
		return farthestPath[farthestPath.length - 1];
	},
	allPaths: function(from, to, path, paths){
		path = path || [];
		paths = paths || [];
		if(from == to){
			path = path.concat(from);
			return path;
		}
				
		for (var i = 0; i < this.vertexes[from].length; i++) {
			if(path.indexOf(this.vertexes[from][i]) == -1){
				var p = this.allPaths(this.vertexes[from][i], to, path.concat(from), paths);
				if(p.slice(-1) == to) 
						paths.push(p);
			}
		};
		return paths;
	}
};

module.exports.DirectedGraph = DirectedGraph;
module.exports.UndirectedGraph = UndirectedGraph;