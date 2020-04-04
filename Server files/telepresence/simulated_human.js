var sim_human_current_arrow;
var sceneEl;
var Sim_human_Sim_human_imageSphereEl;
var frame_number;
var start_time_movement;
var move_direction = "none";
var rotation_angle_sim_human_head = 0;


function init_human_simulation(){
	//get canvas and set up call backs
	sceneEl = document.querySelector('a-scene');
    Sim_human_imageSphereEl = sceneEl.querySelector("[id='360_image_sky']");
	//setInterval(move_head, 5000);
	setInterval(head_movement_timed, 50);
	
	set_sim_human_fov_marker();
	
	// var videoSphere = sceneEl.querySelector('#360_videosphere');
	// videoSphere.setAttribute('rotation', {x: 0, y: 10, z: 0});
}

function move_head(){
	left_arrow = document.getElementById("left_arrow");
	left_arrow_side = left_arrow.style.visibility;
	right_arrow = document.getElementById("right_arrow");
	right_arrow_side = right_arrow.style.visibility;
	if(left_arrow_side == "hidden"){
		sim_human_current_arrow = "right_arrow";
		start_time_movement = new Date();
		move_direction = "right";
		return;
	}
	else{
		sim_human_current_arrow = "left_arrow";
		start_time_movement = new Date();
		move_direction = "left";
		return;
	}
	if (left_arrow_side == "visible" && right_arrow_side == "visible"){
		sim_human_current_arrow = "none";
	}
}

function changeMoveDirection(directionIn){
	start_time_movement = new Date();
	move_direction = directionIn;
}


function head_movement_timed(){
	sceneEl = document.querySelector('a-scene');
	Sim_human_imageSphereEl = sceneEl.querySelector("[id='360_image_sky']");
	if(move_direction == "none"){
		return;
	}
	else if(move_direction == "left"){
		var current_time_movement = new Date();
		var difference = (current_time_movement - start_time_movement) / 1000;
		Sim_human_imageSphereEl = sceneEl.querySelector("[id='360_image_sky']");
		var current_rotation = Sim_human_imageSphereEl.getAttribute('rotation').y;
		Sim_human_imageSphereEl.setAttribute('rotation', {x: 0, y: current_rotation - 1, z: 0});
		rotation_angle_sim_human_head = rotation_angle_sim_human_head - 1;
		set_sim_human_fov_marker();
		if(difference > 2){
			move_direction = "none";
		}
		//console.log(difference);
	}
	else if (move_direction == "right"){
		var current_time_movement = new Date();
		var difference = (current_time_movement - start_time_movement) / 1000;
		Sim_human_imageSphereEl = sceneEl.querySelector("[id='360_image_sky']");
		var current_rotation = Sim_human_imageSphereEl.getAttribute('rotation').y;
		Sim_human_imageSphereEl.setAttribute('rotation', {x: 0, y: current_rotation + 1, z: 0});
		rotation_angle_sim_human_head = rotation_angle_sim_human_head + 1;
		set_sim_human_fov_marker();
		if(difference > 2){
			move_direction = "none";
		}
		//console.log(difference);
	}
}

function move_head_left(){
	start_time_movement = new Date();
	move_direction = "left";
	return;
	// var current_rotation = Sim_human_imageSphereEl.getAttribute('rotation').y;
	// Sim_human_imageSphereEl.setAttribute('rotation', {x: 0, y: current_rotation - 10, z: 0});
	// return;
	// var start_time = new date();
	// move_direction = "left";
	// while(move_direction!="none"){
		// var current_time_movement = new date();
		// var difference = (current_time_movement - start_time) / 1000;
		// var current_rotation = Sim_human_imageSphereEl.getAttribute('rotation').y;
		// Sim_human_imageSphereEl.setattribute('rotation', {x: 0, y: current_rotation + 1, z: 0});

		// if(difference > 10){
			// move_direction = "none";
		// }
	// }
}

function move_head_right(){
	var current_rotation = Sim_human_imageSphereEl.getAttribute('rotation').y;
	Sim_human_imageSphereEl.setAttribute('rotation', {x: 0, y: current_rotation + 10, z: 0});
	return;
}

function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function set_sim_human_fov_marker(){
	var current_fov_rotation = document.getElementById("sim_human_fov");
	var human_head_angle_radians = degrees_to_radians(rotation_angle_sim_human_head%360);
	console.log("Human head angle is "+(rotation_angle_sim_human_head+1440)%360);
	document.getElementById("sim_human_fov").style.transform = "rotate("+human_head_angle_radians+"rad)";
}
