var ld = require('lodash');

var WeightedGraph = function(){
	this.graph = {};
};

var Edge = function(edgeName, tail, head, weight){
	this.edgeName = edgeName;
	this.head = head;
	this.tail = tail;
	this.weight = weight;
};

WeightedGraph.prototype = {
	addVertex: function(vertex){
		this.graph[vertex] = this.graph[vertex] || {};
	},
	addEdge: function(edge){
		if(this.graph[edge.tail][edge.head] && this.graph[edge.tail][edge.head].weight < edge.weight){

		}
		else
			this.graph[edge.tail][edge.head] = edge;
	},
	shortestPath: function(from, to){
		var edges = [];
		var vertexes = Object.keys(this.graph);
		var distances = setWeightToInfinity(vertexes, from);
		var parent = getInitialPerent(vertexes, from);
		while(vertexes.length > 0){
			var currentVertex = getLeastDistanceVertex(distances, vertexes);
			var adjacent = this.getAdjacentOf(currentVertex);
			for (var i = 0; i < adjacent.length; i++) {
				if(this.graph[currentVertex][adjacent[i]].weight + distances[currentVertex].weight < distances[adjacent[i]].weight){
					distances[adjacent[i]].weight = this.graph[currentVertex][adjacent[i]].weight + distances[currentVertex].weight;
					parent[adjacent[i]] = currentVertex;
				}
			};
			ld.remove(vertexes, function(vertex){
				return vertex == currentVertex;
			});
		}
		var path = this.getPathOf(from, to, parent).reverse();
		for (var j = 0; j < path.length; j++) {
				if(path[j+1])
					edges.push(this.edgeOf(path[j], path[j+1]))
		};
		return edges;
	},
	getAdjacentOf: function(vertex){
		return Object.keys(this.graph[vertex]);
	},
	getPathOf: function(from, to, parents ,path){
		var path = path && path.concat(to) || [to];
		if(from == to)
			return path;
		return this.getPathOf(from, getParentOf(to, parents), parents,  path);
	},
	edgeOf: function(from, to){
		return this.graph[from][to];
	}
}

var getParentOf = function(vertex, parents){
	return parents[vertex];
}
var setWeightToInfinity = function(vertexes, from){
	return vertexes.reduce(function(initial, vertex){
		initial[vertex] = {vertex: vertex, weight: Infinity};
		if(vertex == from)
			initial[vertex].weight = 0;
		return initial;
	}, {});
};
var getLeastDistanceVertex = function(distances, vertexes){
	var LeastDistanceVertex = {weight:Infinity};
	for(var index in distances){
		if(vertexes.indexOf(distances[index].vertex) != -1){
			if(distances[index].weight < LeastDistanceVertex.weight)
				LeastDistanceVertex = distances[index];
		}
	}
	return LeastDistanceVertex.vertex;
};
var getInitialPerent = function(vertexes, from){
	return vertexes.reduce(function(initial, vertex){
		initial[vertex] = '';
		if(vertex == from)
			initial[vertex] = from;
		return initial;
	},{})
};
exports.WeightedGraph = WeightedGraph;
exports.Edge = Edge;