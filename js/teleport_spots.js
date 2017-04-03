/**
 * @author Sebastián Sanabria Díaz
 */

/*global THREE, TWEEN, ABSULIT, Stats, camera, scene, loader, console, window, document */

var ABSULIT = ABSULIT || {};
ABSULIT.teleportSpots = ABSULIT.teleportSpots || (function () {
    'use strict';
    var object = {},
        positions = [];

    object.TELEPORT_POINTER_TYPE = 'teleport';
    object.ART_POINTER_TYPE = 'art';


    var geometry = new THREE.SphereBufferGeometry(.02, 32, 32),
        material = new THREE.MeshLambertMaterial( {color: 0xffff00} ),
        spotMesh = new THREE.Mesh( geometry, material );

    var selectedSpot = null,
        selectedSpotStart = 0,
        selectedSpotWait = 1, /* 1s */
        selectedSpotTotal = 0;

    function onPointerIN(e){
        //console.log(e.detail);
        selectedSpot = e.detail;
       // console.log(target.pointerType);
       /* if( (object.TELEPORT_POINTER_TYPE === target.pointerType) && !selectedSpot ){
            //console.log('---- set selectedSpot and set selectedSpotStart');
            selectedSpot = target;
            selectedSpotStart = clock.getElapsedTime();
            selectedSpotTotal = selectedSpotStart + selectedSpotWait;
            //controls.resetPose();
            //cameraPosition.copy(target.position);
        }else if(object.ART_POINTER_TYPE === target.pointerType ){
            //console.log('--- ART');

            /*ABSULIT.info.load(
                    'textures/text.png',
                    target,
                    new THREE.Vector3(1,0,0)
            );*/
        //}
    };

    function onPointerOUT(e){
        /*if(selectedSpot){
            selectedSpot.material.color.setRGB(1, 1, 0);
            selectedSpot = null;
            selectedSpotTotal = 0;
        }*/
        //ABSULIT.info.hide();
    };


    function addPoints(positions){
        var spot;

        positions.forEach(function(position){
            spot = spotMesh.clone();
            spot.material = material.clone();
            spot.position.copy(position);
            spot.pointerType = object.TELEPORT_POINTER_TYPE;

            ABSULIT.pointer.objects.push(spot);
            spot.addEventListener(ABSULIT.pointer.IN, onPointerIN);
            spot.addEventListener(ABSULIT.pointer.OUT, onPointerOUT);

            scene.add( spot );
        });
    };

    object.init = function (positions) {
		//material.envMap = textureCubeAnim2;
        addPoints(positions);
    };

    object.update = function () {
        if(selectedSpot){

           /* var percentTime =  (clock.getElapsedTime() - selectedSpotStart) / (selectedSpotTotal - selectedSpotStart);

            selectedSpot.material.color.setRGB(1 - percentTime, 1, 0);

            if(selectedSpotTotal < clock.getElapsedTime()){*/
                              //camera.position.copy(selectedSpot.position);
                    //camera.position.y = userHeight;\
                    var currentPosX={x:cameraContainer.position.x,
                       z:cameraContainer.position.z};

                    var toPosition={x:selectedSpot.position.x,z:selectedSpot.position.z};
                    if(selectedSpot.position.z<0){
                        toPosition.z=toPosition.z+0.5;
                    }else{
                        toPosition.z=toPosition.z-0.5;
                    }
                    

                    var doorTween = new TWEEN.Tween(currentPosX).to(toPosition, 1000).onUpdate(function(){
                        
                    cameraContainer.position.x=currentPosX.x;
                    cameraContainer.position.z=currentPosX.z;
                    cameraContainer.position.y = 0;
                        
                        
                }).onComplete(function(){
            
                }).easing(TWEEN.Easing.Quadratic.In).start();
                    
					//cameraContainer.position.copy(selectedSpot.position);
                    
                    //camera.lookAt(selectedSpot);
                
               /* selectedSpot.material.color.setRGB(1, 1, 0);*/
                selectedSpot = null;
          //  }
        }
    };

    /*
        For the ART_POINTER_TYPE which are not internal spots
    */
    object.setEvents = function(mesh){
        //ABSULIT.pointer.objects.push(mesh);
        mesh.addEventListener(ABSULIT.pointer.IN, onPointerIN);
        mesh.addEventListener(ABSULIT.pointer.OUT, onPointerOUT);
    }

    return object;

})();
