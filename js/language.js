;(function($){
    var Program = function(action){
	this.action = action;
    };
    Program.prototype.executeOn = function(machine){
	this.action.executeOn(machine);
	machine.finish();
    };

    var Sequence = function(actions){
	this.actions = actions;
    };
    Sequence.prototype.executeOn = function(machine){
	this.actions.forEach(function(action){
	    action.executeOn(machine);
	});
    };

    var Left = function(){};
    Left.prototype.executeOn = function(machine){
	machine.left();
    };

    var Right = function(){};
    Right.prototype.executeOn = function(machine){
	machine.right();
    };

    var Forward = function(){};
    Forward.prototype.executeOn = function(machine){
	machine.forward();
    };

    var language = $.language = {};
    language.program  = function(action){ return new Program(action); };
    language.sequence = function(){ return new Sequence(Array.prototype.slice.call(arguments)); };
    language.left     = function(){ return new Left(); };
    language.right    = function(){ return new Right(); };
    language.forward  = function(){ return new Forward(); };

    var random = $.language.random = {};
    (function(_){
	var randomProgram = function(distribution){
	    distribution = distribution || {};
	    distribution.sequence = distribution.sequence || 3/4;
	    distribution.action = distribution.action || [1/4, 2/4, 3/4];
	    return new Program(randomSequence(distribution));
	};
	var randomSequence = function(distribution){
	    var actions = [];
	    while (Math.random() < distribution.sequence) {
		actions.push(randomAction(distribution));
	    }
	    return new Sequence(actions);
	};
	var randomAction = function(distribution){
	    var p = Math.random();
	    if (p < distribution.action[0]) {
		return new Left();
	    }
	    if (p < distribution.action[1]) {
		return new Right();
	    }
	    if (p < distribution.action[2]) {
		return new Forward();
	    }
	    return randomSequence(distribution);
	}

	_.program = randomProgram;
    })(random);
})(window);
