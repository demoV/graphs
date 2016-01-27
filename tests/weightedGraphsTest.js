var graphs=require('../lib/weightedGraph');
var assert=require('chai').assert;
var ld=require('lodash');


describe("shortest path",function(){
	it("should choose the only path when only one path exists",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');

		var e1=new graphs.Edge("e1",'A','B',1);
		g.addEdge(e1);

		var path=g.shortestPath('A','B');
		assert.equal(1,path.length);
		assert.deepEqual(e1,path[0]);
	});

	it("should choose the path with least weight when more than one path exists",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'B','C',1);
		var e3=new graphs.Edge("e3",'A','C',1);
		g.addEdge(e1);
		g.addEdge(e2);
		g.addEdge(e3);

		var path=g.shortestPath('A','C');
		assert.equal(1,path.length);
		assert.deepEqual(e3,path[0]);
	});

	it("should choose the path with least weight when more than one path exists even if the path has more vertices",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');
		g.addVertex('C');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'B','C',1);
		var e3=new graphs.Edge("e3",'A','C',3);
		g.addEdge(e1);
		g.addEdge(e2);
		g.addEdge(e3);

		var path=g.shortestPath('A','C');
		assert.equal(2,path.length);
		assert.deepEqual(e1,path[0]);
		assert.deepEqual(e2,path[1]);
	});

	it("should choose the path with least weight when multiple edges exist between two vertices",function(){
		var g=new graphs.WeightedGraph();
		g.addVertex('A');
		g.addVertex('B');

		var e1=new graphs.Edge("e1",'A','B',1);
		var e2=new graphs.Edge("e2",'A','B',2);
		g.addEdge(e1);
		g.addEdge(e2);

		var path=g.shortestPath('A','B');
		assert.equal(1,path.length);
		assert.deepEqual(e1,path[0]);
	});
	it("should works for dense graph", function() {
        var densegraph = denseGraph();
        var s = densegraph[1];
        var g = densegraph[0];
        s['e2'].weight = 1;
        g.addEdge(s['e2']);
        s['e20'].weight = 1;
        g.addEdge(s['e20']);

        var path = g.shortestPath('A', 'B');
        assert.equal(2, path.length);
        assert.deepEqual(s['e2'], path[0]);
        assert.deepEqual(s['e20'], path[1]);
        // assert.deepEqual([{id: 'e2', from: 'A', to: 'C', weight: 1 }, {id: 'e20', from: 'C', to: 'B', weight: 1 }], path);
    });
});

function denseGraph() {
    var g = new graphs.WeightedGraph();
    var vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    var s = {};

    vertices.forEach(function(vertex) {
        g.addVertex(vertex);
    });

    var count = 1;
    for (var i = 0; i < vertices.length - 1; i++) {
        var from = vertices[i];
        for (var j = 0; j < vertices.length; j++) {
            if (vertices[j] != vertices[i]) {
                s['e' + count] = new graphs.Edge('e' + count, from, vertices[j], 5);
                count++;
            };
        }
    }
    for (var edg in s) {
        g.addEdge(s[edg]);
    }
    return [g, s];
}