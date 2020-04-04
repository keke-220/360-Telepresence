let objectDetector;

let img;
let objects = [];
let status;
var tv_location=0;
var current_arrow = "left";
var invert_arrows = false;

var disable_arrows = false;

var frame_325_min_angle = 310;
var frame_325_max_angle = 330;
var frame_330_min_angle = 350;
var frame_330_max_angle = 12;

var trial_complete = false;


function disable_all_arrows(){
	disable_arrows = true;
}


function preload(){
  //img = loadImage('images/cat2.JPG');
  img = document.getElementById('detection_img');
  setInterval(run_object_detection, 3000);
  setInterval(change_arrows, 100);
  //setInterval(check_inverted_arrows, 100);
}

// function check_inverted_arrows(){
	// if (rotation_angle_sim_human_head > 90 && rotation_angle_sim_human_head < 271){
		// invert_arrows = true;
	// }
// }

function setup() {
  //createCanvas(640, 420);

  objectDetector = ml5.objectDetector('cocossd', modelReady);
}

// Change the status when the model loads.
function modelReady() {
  console.log("model Ready!")
  status = true;
  console.log('Detecting');
  pCanv = document.getElementById("defaultCanvas0");
  pCanv.style.display="none";
  run_object_detection();
}

function run_object_detection(){
	img = document.getElementById('detection_img');
	console.log("Current image I am working with "+img.getAttribute('src'));
	objectDetector.detect(img, gotResult);

}

// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.log(err);
  }
  objects = results;
	var tv_present = false;
	for (const key of objects) {
		if(key.label == "tv"){
			tv_present = true;
			tv_location = key.x;
			console.log(tv_location);
		}
	}
	if(tv_present == false){
		tv_location = 0;
	}

}

function enable(arrow_side){
//	document.getElementById(arrow_side).style.visibility = "visible";
	if(disable_arrows){
		console.log("I have to disable all arrows");
		disable("left_arrow_aframe");
		disable("right_arrow_aframe");
		return;
	}
	let ImgDet_sceneEl = document.querySelector('a-scene');
    let ImgDet_arrow = ImgDet_sceneEl.querySelector("[id='"+arrow_side+"']");
	ImgDet_arrow.setAttribute("visible",true);
	//ImgDet_arrow.setAttribute("position", "0 0 1");
}
function disable(arrow_side){
	//document.getElementById(arrow_side).style.visibility = "hidden";
	let ImgDet_sceneEl = document.querySelector('a-scene');
	let ImgDet_arrow = ImgDet_sceneEl.querySelector("[id='"+arrow_side+"']");
	ImgDet_arrow.setAttribute("visible",false);
	//ImgDet_arrow.setAttribute("position", "0 0 1");
}



function change_arrows(){
	console.log("Frame number in img recog is "+frame_number);
	modified_rotation_angle = (rotation_angle_sim_human_head+1440)%360;
	document.querySelector('.arrow .arrow_side').innerHTML = current_arrow;
	
	if(tv_location == 0 || disable_arrows){
		console.log("Disabling arrows due to no tv or bool disable_arrows set.");
		disable("right_arrow_aframe");
		disable("left_arrow_aframe");
		current_arrow = "none";
		return;
	}
	
	if(frame_number == 325){
		if(modified_rotation_angle>frame_325_min_angle && modified_rotation_angle < frame_325_max_angle){
			console.log("TV detected in frame 325");
			disable("right_arrow_aframe");
			disable("left_arrow_aframe");
			current_arrow = "none";
			trial_complete = true;
			alert("Trial complete");
			return;
		}
		else if(modified_rotation_angle>frame_325_min_angle-180 && modified_rotation_angle < frame_325_min_angle){
			console.log("Should enable right arrow");
			enable("right_arrow_aframe");
			disable("left_arrow_aframe");
			current_arrow = "right";
		}
		else if (modified_rotation_angle < frame_325_max_angle+180 && modified_rotation_angle < frame_325_max_angle){
			console.log("Should enable left arrow");
			enable("left_arrow_aframe");
			disable("right_arrow_aframe");
			current_arrow = "left";
		}
		else{
			console.log("TV not detected");
		}
	}
	
	else if(frame_number == 330){
		if( (modified_rotation_angle>frame_330_min_angle && modified_rotation_angle < 360) || (modified_rotation_angle > 0 && modified_rotation_angle < frame_330_max_angle) ){
			console.log("TV detected in frame 330");
			disable("right_arrow_aframe");
			disable("left_arrow_aframe");
			current_arrow = "none";
			trial_complete = true;
			alert("Trial complete");
			return;
		}
		else if(modified_rotation_angle>frame_330_min_angle-180 && modified_rotation_angle < frame_330_min_angle){
			console.log("Should enable right arrow");
			enable("right_arrow_aframe");
			disable("left_arrow_aframe");
			current_arrow = "right";
		}
		else if (modified_rotation_angle < frame_330_max_angle+180 && modified_rotation_angle > frame_330_max_angle){
			console.log("Should enable left arrow");
			enable("left_arrow_aframe");
			disable("right_arrow_aframe");
			current_arrow = "left";
		}
		else{
			console.log("TV not detected 330");
		}
	}
	// if(tv_location <250){
		// console.log("Should enable left arrow");
		// enable("left_arrow_aframe");
		// disable("right_arrow_aframe");
		// current_arrow = "left";
	// }
	// else if(tv_location > 250){
		// console.log("Should enable right arrow");
		// enable("right_arrow_aframe");
		// disable("left_arrow_aframe");
		// current_arrow = "right";
	// }
	// document.querySelector('.arrow .arrow_side').innerHTML = current_arrow;
	// if(current_arrow == "left"){
		// enable("left_arrow");
		// disable("right_arrow");
		// current_arrow = "right";
	// }
	// else{
		// enable("right_arrow");
		// disable("left_arrow");
		// current_arrow = "left";
	// }
}


// function draw() {
  // // unless the model is loaded, do not draw anything to canvas
  // if (status != undefined) {
    // image(img, 0, 0)

    // for (let i = 0; i < objects.length; i++) {
      // noStroke();
      // fill(0, 255, 0);
      // text(objects[i].label + " " + nfc(objects[i].confidence * 100.0, 2) + "%", objects[i].x + 5, objects[i].y + 15);
      // noFill();
      // strokeWeight(4);
      // stroke(0, 255, 0);
      // rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    // }
  // }
// }