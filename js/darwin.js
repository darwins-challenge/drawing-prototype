;(function($){
    var range = function(a, b, step) {
	step = step || 1;
	var result = [];
	for (var index = a; index < b; index += step) {
	    result.push(index);
	}
	return result;
    }

    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 640;
    document.body.appendChild(canvas);

    var context = canvas.getContext('2d');
    context.translate(canvas.width/2, canvas.height/2);
    context.scale(1, -1);

    range(1,10).map(function(){
	return $.language.random.program({
	    sequence: 3/4,
	    action: [ 1/6, 2/6, 5/6 ]
	});
    }).forEach(function(p, index, programs){
	var angle = 360 * (index/programs.length);
	p.executeOn(new $.Machine(context, {
	    size: 10,
	    color: 'hsl(' + angle + ',100%,50%)'
	}));
    });
})(window);
