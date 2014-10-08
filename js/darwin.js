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

    var population = range(1,100).map(function(){
	return $.language.random.program({
	    sequence: 3/4,
	    action: [ 1/6, 2/6, 5/6 ]
	});
    });

    var interval = setInterval(function(){
	context.clearRect(-canvas.width/2, -context.height/2, context.width, context.height);
	population.forEach(function(p, index, programs){
	    var angle = 360 * (index/programs.length);
	    p.executeOn(new $.Machine(context, {
		size: 10,
		color: 'hsl(' + angle + ',100%,50%)',
		x: index, y: index
	    }));
	});
	var ip = Math.floor(population.length * Math.random());
	var iq = Math.floor(population.length * Math.random());
	var offspring = $.genetics.crossover(population[ip], population[iq]);
	population[ip] = offspring[0];
	population[iq] = offspring[1];
    }, 0);
})(window);
