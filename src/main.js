var $j = jQuery.noConflict();

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
	// gros bouton
	var cube = undefined;
	var canvas = undefined;
	var i = 0;
	var j = 0;

	var laptopTop = undefined;
	var laptopBottom = undefined;
	var laptopScreen = undefined;

	var Screen = undefined;

	function init() {
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		renderer = new THREE.WebGLRenderer({
			alpha: true
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('computer').prepend(renderer.domElement);
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



	function loadObject() {
		var afterLoad = function (object) {
			console.log(object);
			object.children[0].material.wireframe = true

			scene.add(object)

		}
	

	}

	function setScenary() {
		var geometry = new THREE.BoxGeometry(6, 3, 3);
		var geometry2 = new THREE.BoxGeometry(6, 0.4, 3);
		var geometry3 = new THREE.BoxGeometry(6, 0.4, 3);
		var geometry4 = new THREE.BoxGeometry(5, 0.05, 2.9);

		var material = new THREE.MeshBasicMaterial({
			color: 0xe6e6e6
		});
		var material2 = new THREE.MeshBasicMaterial({
			color: 00000000
		});
		var material3 = new THREE.MeshBasicMaterial({
			color: 111111
		});

		cube = new THREE.Mesh(geometry, material3);
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

		cube.position.z = 1;

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

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, true);
  });

$j('#btn').click(function () {
	$j(this).css('display', 'none');
	$j('#computer').css('display', 'block');

	setTimeout(function () {
		var app = createApp()
		app.init()
		app.animate();		
	}, 500);

	setTimeout(function () {
		$j('.window-top').css('display', 'block');		
	}, 5000);

	// $j('#computer').css('display', 'none');
	


	
});

