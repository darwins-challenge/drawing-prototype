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
})(window);
