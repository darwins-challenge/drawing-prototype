;(function($){
    var Node = function(action, children){
	this.action = action;
	this.children = children || [];
    };
    Node.prototype.executeOn = function(machine){
	this.action.call(this, machine, this.children);
    };
    Node.prototype.visit = function(callback){
	callback(this);
	this.children.forEach(function(child){ child.visit(callback); });
    };

    var program = function(machine, children){
	children.forEach(function(child){ child.executeOn(machine); });
	machine.finish();
    };
    var sequence = function(machine, children){
	children.forEach(function(child){ child.executeOn(machine); });
    };
    var left = function(machine){ machine.left(); };
    var right = function(machine){ machine.right(); };
    var forward = function(machine){ machine.forward(); };

    var language = $.language = {};
    language.program  = function(action){ return new Node(program, [action]); };
    language.sequence = function(){ return new Node(sequence, Array.prototype.slice.call(arguments)); };
    language.left     = function(){ return new Node(left); };
    language.right    = function(){ return new Node(right); };
    language.forward  = function(){ return new Node(forward); };

    var random = $.language.random = {};
    (function(_){
	var randomProgram = function(distribution){
	    distribution = distribution || {};
	    distribution.sequence = distribution.sequence || 3/4;
	    distribution.action = distribution.action || [1/4, 2/4, 3/4];
	    return $.language.program(randomSequence(distribution));
	};
	var randomSequence = function(distribution){
	    var actions = [];
	    while (Math.random() < distribution.sequence) {
		actions.push(randomAction(distribution));
	    }
	    return new Node(sequence, actions);
	};
	var randomAction = function(distribution){
	    var p = Math.random();
	    if (p < distribution.action[0]) {
		return $.language.left();
	    }
	    if (p < distribution.action[1]) {
		return $.language.right();
	    }
	    if (p < distribution.action[2]) {
		return $.language.forward();
	    }
	    return randomSequence(distribution);
	}

	_.program = randomProgram;
    })(random);
})(window);
