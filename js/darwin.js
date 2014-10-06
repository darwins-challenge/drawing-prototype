;(function($){
    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 640;
    document.body.appendChild(canvas);

    var context = canvas.getContext('2d');
    context.translate(canvas.width/2, canvas.height/2);
    context.scale(1, -1);

    var p = $.language.random.program({
	sequence: 3/4,
	action: [ 1/6, 2/6, 5/6 ]
    });
    p.executeOn(new $.Machine(context));
})(window);
