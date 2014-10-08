;(function($, undefined){
    var genetics = $.genetics = {};

    var Counter = function(){
	this.count = 0;
    };
    Counter.prototype.increment = function(){
	this.count++;
    };

    var PickNode = function(n){
	this.n = n;
	this.pick = undefined;
    };
    PickNode.prototype.visitor = function(node){
	if (!this.pick && this.n > 0) {
	    this.n--;
	} else {
	    this.pick = node;
	}
    };

    var randomNode = genetics.randomNode = function(program){
	var counter = new Counter();
	program.visit(counter.increment.bind(counter));

	var n = Math.floor(counter.count * Math.random());

	var picker = new PickNode(n);
	program.visit(picker.visitor.bind(picker));

	return picker.pick;
    };

    var crossover = genetics.crossover = function(p, q) {
	p = p.copy(); q = q.copy();
	var nodeP = randomNode(p); var nodeQ = randomNode(q);
	var action = nodeP.action; var children = nodeP.children;
	nodeP.action = nodeQ.action; nodeP.children = nodeQ.children;
	nodeQ.action = action; nodeQ.children = children;
	return [p, q];
    }
})(window);
