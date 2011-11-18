var RGBA = function(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

var OpinionScale = function(mainRGBA, sliderRGBA, leftImg, rightImg) {
	var r = mainRGBA.r,
		g = mainRGBA.g,
		b = mainRGBA.b,
		a = mainRGBA.a,
		sr = sliderRGBA.r,
		sg = sliderRGBA.g,
		sb = sliderRGBA.b,
		sa = sliderRGBA.a;
		
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		timer = null,
		sliderPos = 0,
		lowWaterMark = 0,
		highWaterMark = 0;
			
	var setImage = function(src, x, y) {
		var img = new Image();
		img.onload = function() {
			ctx.save();
			ctx.globalAlpha = a - .25;
			ctx.drawImage(img,x,y);
			ctx.restore();
		}
		img.src = src;
	}		
			
	var scaleShape = function(ctx) {		
		// Base Shape
		ctx.save();
		ctx.lineWidth = 50;
		ctx.lineCap = 'round';
		ctx.strokeStyle = 'rgba(0, 0, 0, ' + a + ')';
		ctx.beginPath();
		ctx.moveTo(150, 50);
		ctx.lineTo(550, 50);
		ctx.stroke();
		ctx.restore();

		// Left Side Rounding Gradient
		var leftRadialGrad = ctx.createRadialGradient(150, 65, 1, 150, 47, 27);
		leftRadialGrad.addColorStop(0, 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')');
		leftRadialGrad.addColorStop(1, 'rgba(' + r + ', ' + g + ', ' + b + ', 0)');
		ctx.save();
		ctx.fillStyle = leftRadialGrad;
		ctx.fillRect(125, 25, 175, 75);
		ctx.restore();

		// Right Side Rounding Gradient
		var rightRadialGrad = ctx.createRadialGradient(550, 65, 1, 550, 47, 27);
		rightRadialGrad.addColorStop(0, 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')');
		rightRadialGrad.addColorStop(1, 'rgba(' + r + ', ' + g + ', ' + b + ', 0)');
		ctx.save();
		ctx.fillStyle = rightRadialGrad;
		ctx.fillRect(525, 25, 475, 75);
		ctx.restore();

		// Linear Round Area Black
		ctx.save();
		ctx.clearRect(150, 25, 400, 50);
		ctx.fillStyle = 'rgba(0, 0, 0, ' + a + ')';
		ctx.fillRect(150, 25, 400, 50);
		ctx.restore();

		// Linear Round Gradient
		var linearRoundGrad = ctx.createLinearGradient(50, 25, 50, 75);
		linearRoundGrad.addColorStop(0, 'rgba(' + r + ', ' + g + ', ' + b + ', .1)');
		linearRoundGrad.addColorStop(.76, 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')');
		linearRoundGrad.addColorStop(.82, 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')');
		linearRoundGrad.addColorStop(.99, 'rgba(' + r + ', ' + g + ', ' + b + ', 0)');
		ctx.save();
		ctx.fillStyle = linearRoundGrad;
		ctx.fillRect(150, 25, 400, 50);
		ctx.restore();

		// Reflection
		var reflectGrad = ctx.createLinearGradient(146, 28, 146, 40);
		reflectGrad.addColorStop(0, 'rgba(255, 255, 255, .9)');
		reflectGrad.addColorStop(1, 'rgba(' + r + ', ' + g + ', ' + b + ', ' + (a*.9) + ')');	
		ctx.save();
		ctx.lineWidth = 12;
		ctx.lineCap = 'round';
		ctx.strokeStyle = reflectGrad;
		ctx.beginPath();
		ctx.moveTo(146, 34);
		ctx.lineTo(554, 34);
		ctx.stroke();
		ctx.restore();
	}
	
	var scaleTicks = function(ctx) {
		ctx.save();
		ctx.lineWidth = 1;
		ctx.lineCap = 'butt';
		ctx.strokeStyle = '#FFF';
		ctx.beginPath();
		for (var i = 150; i <= 550; i += 10) {
			var len = (i % 50 === 0)? 5 : 1; 
			ctx.moveTo(i, 50 - len);
			ctx.lineTo(i, 50 + len);
		}
		ctx.stroke();
		ctx.restore();
	}
	
	var scaleWaterMarks = function(ctx) {
		ctx.save();
		ctx.lineWidth = 1;
		ctx.lineCap = 'butt';
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		ctx.beginPath();
		ctx.moveTo(350 + lowWaterMark, 30);
		ctx.lineTo(350 + lowWaterMark, 70);
		ctx.moveTo(350 + highWaterMark, 30);
		ctx.lineTo(350 + highWaterMark, 70);
		ctx.stroke();
		ctx.restore();
	}
	
	var scaleSlider = function(ctx, loc) {
		ctx.save();
		ctx.translate(loc, 0);

		var sliderGrad = ctx.createLinearGradient(325, 20, 325, 80);
		sliderGrad.addColorStop(0, 'rgba(0, 0, 0, ' + a + ')');
		sliderGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
		sliderGrad.addColorStop(1, 'rgba(0, 0, 0, ' + a + ')');

		ctx.fillStyle = sliderGrad;
		ctx.fillRect(325, 20, 50, 60);


		ctx.lineWidth = 3;
		ctx.lineCap = 'round';
		ctx.strokeStyle = '#ff0914';
		ctx.beginPath();
		ctx.moveTo(350, 30);
		ctx.lineTo(350, 70);
		ctx.stroke();


		var grad = ctx.createLinearGradient(325, 20, 325, 80);
		grad.addColorStop(0, 'rgba(' + sr + ', ' + sg + ', ' + sb + ', .05)');
		grad.addColorStop(.76, 'rgba(' + sr + ', ' + sg + ', ' + sb + ', ' + sa + ')');
		grad.addColorStop(.82, 'rgba(' + sr + ', ' + sg + ', ' + sb + ', ' + sa + ')');
		grad.addColorStop(.99, 'rgba(' + sr + ', ' + sg + ', ' + sb + ', 0)');

		ctx.fillStyle = grad;
		ctx.fillRect(325, 20, 50, 60);


		var reflectGrad = ctx.createLinearGradient(325, 23, 325, 38);
		reflectGrad.addColorStop(0, 'rgba(255, 255, 255, ' + (.6 * sa) + ')');
		reflectGrad.addColorStop(1, 'rgba(' + sr + ', ' + sg + ', ' + sb + ', ' + sa + ')');	
		ctx.lineWidth = 15;
		ctx.lineCap = 'butt';
		ctx.strokeStyle = reflectGrad;
		ctx.beginPath();
		ctx.moveTo(325, 30);
		ctx.lineTo(375, 30);
		ctx.stroke();


		ctx.restore();
	}
	
	var draw = function(pos) {
		ctx.clearRect(100, 0, 500, 100);
		scaleShape(ctx);
		scaleTicks(ctx);
		scaleWaterMarks(ctx);
		scaleSlider(ctx, pos);
	}
	
	var moveSlider = function(moveToPos) {
		if (moveToPos === sliderPos) {
			// We are done
		}
		else {
			sliderPos += (sliderPos < moveToPos)? 1 : -1;
			lowWaterMark = Math.min(lowWaterMark, sliderPos);
			highWaterMark = Math.max(highWaterMark, sliderPos);

			draw(sliderPos);
			if (timer) clearTimeout(timer);
			timer = setTimeout(function() {
				moveSlider(moveToPos);
			}, 30);
		}
	}
	
	if (leftImg)
		setImage(leftImg, 0, 0);
	if (rightImg)
		setImage(rightImg, 600, 0);
	draw(sliderPos);
	
	return {
		moveTo: function(loc) {
			var moveToPos = loc * 2;
			moveSlider(moveToPos);
		},
		reset: function() {
			clearTimeout(timer);
			sliderPos = 0;
			lowWaterMark = 0;
			highWaterMark = 0;
			draw(sliderPos);
		}
	}
}

