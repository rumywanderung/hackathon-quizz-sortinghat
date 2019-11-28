var simplex = new SimplexNoise(4);
var clicked = false;

var createApp = function () {
	var self = {}
	var camera = undefined;
	var scene = undefined;
	var light = undefined;
	var light2 = undefined;
	var ambient = undefined;
	var renderer = undefined;
	var controls = undefined;
	var loader = new THREE.OBJLoader()
	var oloader = undefined;
	var cube = undefined;
	var canvas = undefined;
	var i = 0;
	var j = 0;

	var laptopTop = undefined;
	var laptopBottom = undefined;
	var laptopScreen = undefined;

	var Screen = undefined;

	function init() {
		console.log("init App");
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer({
			alpha: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		camera.position.z = 5;
		//controls = new THREE.OrbitControls(camera, renderer.domElement)

		light = new THREE.DirectionalLight(0xffffff, 0.7)
		light.position.set(1, 1, 0).normalize()
		scene.add(light)

		light2 = new THREE.DirectionalLight(0xff5566, 0.4)
		light2.position.set(-3, -1, 0).normalize()
		scene.add(light2)

		ambient = new THREE.AmbientLight(0xffffff, 0.3)
		scene.add(ambient)

		//var tex = generateNoiseTexture();
		//generateNoiseTexture(tex)
		//generateTerrain(tex)
		setScenary()
		loadObject()
		renderer.render(scene, camera)

		renderer.render(scene, camera)
	}

	function map(val, smin, smax, emin, emax) {
		const t = (val - smin) / (smax - smin)
		return (emax - emin) * t + emin
	}

	function noise(x, y) {
		return map(simplex.noise2D(x, y), -1, 1, 0, 1)
	}

	function octave(x, y, octaves) {
		var val = 0;
		var freq = 1;
		var max = 0;
		var amp = 1;
		for (var i = 0; i < octaves; i++) {
			val += noise(x * freq, y * freq) * amp;
			max += amp;
			amp /= 2;
			freq *= 2;
		}
		return val / max;
	}

	/*function generateTerrain(data){
	    var geometry = new THREE.PlaneGeometry(canvas.width,canvas.height,canvas.width,canvas.height+1)
	    
	    for(var j = 0; j < data.height; j++){
	        for (var i = 0; i < data.width; i++){
	            var n = (j*(data.height) +i)
	            var nn = (j* (data.height+1) +i)
	            var col = data.data[n*4]
	            var v1 = geometry.vertices[nn]
	            
	            v1.z = map(col,0,255,-20,20)
	        }
	    }
	    
	    geometry.faces.forEach(function(face){
	        var a = geometry.vertices[face.a];
	        var b = geometry.vertices[face.b];
	        var c = geometry.vertices[face.c];
	        var average = (a.z + b.z + c.z)/3
	        
	        if(average <0){
	            a.z = 0;
	            b.z = 0;
	            c.z = 0;
	        }
	        if(average <=0){face.color.set("#4ecdc4")}
	        else if (average <= 1.5){face.color.set("#ffe99b")}
	        else if (average <= 6){face.color.set("#149c3e")}
	    })
	    
	    console.log(geometry.vertices)
	    
	    var material = new THREE.MeshPhongMaterial({flatShading:true, wireframe:false, vertexColors:THREE.VertexColors})
	    var mesh =  new THREE.Mesh(geometry, material)
	    mesh.rotation.x = THREE.Math.degToRad(-90);
	    scene.add(mesh)
	}*/

	function generateNoiseTexture() {
		canvas = document.querySelector("#noise-canvas")
		console.log(canvas);
		var ctx = canvas.getContext("2d")
		console.log(ctx);
		ctx.fillStyle = "black"
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		console.log(simplex.noise2D(1, 10));

		for (var i = 0; i < canvas.width; i++) {
			for (var j = 0; j < canvas.height; j++) {
				//console.log(simplex.noise2D(i,j));
				var v = octave(i / canvas.width, j / canvas.width, 10);
				var vpercent = 100 * v
				ctx.fillStyle = "rgb(" + vpercent + "%," + vpercent + "%," + vpercent + "%)"
				ctx.fillRect(i, j, 1, 1)
			}
		}
		return ctx.getImageData(0, 0, canvas.width, canvas.height);
	}

	function loadObject() {
		var afterLoad = function (object) {
			console.log(object);
			object.children[0].material.wireframe = true

			scene.add(object)

		}
		//loader.load("obj/pc1.obj", afterLoad) //CUBE VIDE

		/*var oLoader = new THREE.OBJMTLLoader();
		oLoader.load('obj/pc1.obj', 'obj/pc1.mtl', function (object) {
		object.position.x = -200;
		object.position.y = 0;
		object.position.z = 100;
		object.scale.set(0.1, 0.1, 0.1);
		lesson6.scene.add(object);
	});*/

	}

	function setScenary() {
		var geometry = new THREE.BoxGeometry(1, 1, 1);
		var geometry2 = new THREE.BoxGeometry(6, 0.4, 3);
		var geometry3 = new THREE.BoxGeometry(6, 0.4, 3);
		var geometry4 = new THREE.BoxGeometry(5, 0.05, 2.9);

		var material = new THREE.MeshBasicMaterial({
			color: 0xe6e6e6
		});
		var material2 = new THREE.MeshBasicMaterial({
			color: 00000000
		});

		cube = new THREE.Mesh(geometry, material);
		laptopTop = new THREE.Mesh(geometry2, material);
		laptopBottom = new THREE.Mesh(geometry3, material);
		Screen = new THREE.Mesh(geometry4, material2);

		laptopTop.rotation.x = 0;
		laptopTop.position.y = 0.3;
		laptopBottom.rotation.x = 0;
		laptopBottom.position.x = 0;
		laptopBottom.position.y = -1;

		Screen.position.x = 0;
		Screen.position.y = 0.1;
		Screen.rotation.x = 0;
		Screen.position.z = 0.29;
		//scene.add(cube);
		scene.add(laptopTop);
		scene.add(laptopBottom);
		scene.add(Screen);
	}

	function zoom() {
		laptopTop.position.z += 0.015;
		laptopBottom.position.z += 0.015;
		Screen.position.z += 0.015;
	}

	function animate() {
		//cube.rotation.y += 0.01
		//cube.rotation.x += 0.01
		if (i <= 150) {
			laptopTop.rotation.x -= 0.01;
			Screen.rotation.x -= 0.01;
			i++;
		}

		if (j <= 250) {
			zoom();
			j++;
		}

		requestAnimationFrame(animate);
		renderer.render(scene, camera);

		////// EFFET CLICK SOURIS


		//}
	}

	self.animate = animate
	self.init = init
	return self
}

this.onmousedown = function () {
	if (clicked == false)
		console.log("clicked");
	clicked = true; //click only once
	var app = createApp()
	app.init()
	app.animate();
	/*if (j <= 10) {
		zoom();
		j++;
	}*/

}
