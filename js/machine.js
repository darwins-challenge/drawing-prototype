;(function($){
    var Vector = function(x, y) {
	this.x = x;
	this.y = y;
    };
    Vector.prototype.plus = function(vector){
	return new Vector(this.x + vector.x, this.y + vector.y);
    };
    Vector.prototype.left = function(){
	return new Vector(-this.y, this.x);
    }
    Vector.prototype.right = function(){
	return new Vector(this.y, -this.x);
    }

    var defaultSize = 10;
    var defaultColor = '#000000';
    var defaultX = 0;
    var defaultY = 0;

    var Machine = $.Machine = function(ctx, options) {
	this.options = options || { size : defaultSize, color : defaultColor, x: defaultX, y: defaultY };
	this.ctx = ctx;
	this.current = new Vector(this.options.x || defaultX, this.options.y || defaultY);
	this.direction = new Vector(0, this.options.size || defaultSize);
	this.initialize();
    };
    Machine.prototype.initialize = function(){
	this.ctx.save();
	this.ctx.strokeStyle = this.options.color || defaultColor;
	this.ctx.beginPath();
	this.ctx.moveTo(this.current.x, this.current.y);
    };
    Machine.prototype.forward = function(){
	this.current = this.current.plus(this.direction);
	this.ctx.lineTo(this.current.x, this.current.y);
	return this;
    };
    Machine.prototype.left = function(){
	this.direction = this.direction.left();
	return this;
    };
    Machine.prototype.right = function(){
	this.direction = this.direction.right();
	return this;
    };
    Machine.prototype.finish = function(){
	this.ctx.stroke();
	this.ctx.restore();
	this.initialize();
	return this;
    }

})(window);
