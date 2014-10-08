;(function($){
    var Program = function(action){
	this.action = action;
    };
    Program.prototype.executeOn = function(machine){
	this.action.executeOn(machine);
	machine.finish();
    };
    Program.prototype.toString = function(){
	return 'var p;\nwith($.language){\n\tp = program(' + this.action.toString() + ');\n}'
    };

    var Sequence = function(actions){
	this.actions = actions;
    };
    Sequence.prototype.executeOn = function(machine){
	this.actions.forEach(function(action){
	    action.executeOn(machine);
	});
    };
    Sequence.prototype.toString = function(){
	var result = 'sequence('
	result += this.actions.map(function(action){ return action.toString(); }).join(',');
	result += ')';
	return result;
    };

    var Left = function(){};
    Left.prototype.executeOn = function(machine){
	machine.left();
    };
    Left.prototype.toString = function(){
	return 'left()';
    };

    var Right = function(){};
    Right.prototype.executeOn = function(machine){
	machine.right();
    };
    Right.prototype.toString = function(){
	return 'right()';
    };

    var Forward = function(){};
    Forward.prototype.executeOn = function(machine){
	machine.forward();
    };
    Forward.prototype.toString = function(){
	return 'forward()';
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
	    return $.language.program(randomSequence(distribution));
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
