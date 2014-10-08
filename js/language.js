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
    Node.prototype.copy = function(){
	var children = this.children.map(function(child){ return child.copy(); });
	return new Node(this.action, children);
    };
    Node.prototype.toString = function(){
	return this.action.source(this.children);
    };

    var program = function(machine, children){
	children.forEach(function(child){ child.executeOn(machine); });
	machine.finish();
    };
    program.source = function(children){
	return 'var p;\nwith($.language){\n\tp = program(' + children[0].toString() + ');\n}'
    };
    var sequence = function(machine, children){
	children.forEach(function(child){ child.executeOn(machine); });
    };
    sequence.source = function(children){
	return 'sequence(' + children.map(function(child){ return child.toString(); }).join(',') + ')';
    };
    var left = function(machine){ machine.left(); };
    left.source = function(){ return 'left()'; };
    var right = function(machine){ machine.right(); };
    right.source = function(){ return 'right()'; };
    var forward = function(machine){ machine.forward(); };
    forward.source = function(){ return 'forward()'; };

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
