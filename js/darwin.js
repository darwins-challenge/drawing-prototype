;(function(){
    var canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 640;
    document.body.appendChild(canvas);

    var context = canvas.getContext('2d');
    context.translate(canvas.width/2, canvas.height/2);
    context.scale(1, -1);

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, 200);
    context.stroke();
})();
