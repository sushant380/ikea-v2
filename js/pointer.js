/**
 *
 * @author Sebastián Sanabria Díaz
 */

/*global THREE, TWEEN, ABSULIT, Stats, camera, scene, loader, console, window, document, CustomEvent */

var ABSULIT = ABSULIT || {};
ABSULIT.pointer = ABSULIT.pointer || (function () {
    'use strict';
    var object = {},
        raycaster,
        intersected,
        collisionPoint,
        lineMaterial = new THREE.LineBasicMaterial({color: 0x00FF00}),
        lineGeometry = new THREE.Geometry(),
        circleGeometry = new THREE.Geometry();
    object.selectionBox = new THREE.BoxHelper();
    object.selectionBox.material.depthTest = false;
    object.selectionBox.material.transparent = true;
    object.selectionBox.visible = false;
    object.box= new THREE.Box3();

    object.objects = [];
    object.IN = 'in';
    object.OUT = 'out';

    lineGeometry.vertices.push(new THREE.Vector3(0, 0.1, 0.0));
    lineGeometry.vertices.push(new THREE.Vector3(0, 0.0, -10.0));

    circleGeometry = new THREE.CircleGeometry( 0.03, 64 );
    circleGeometry.vertices.shift();

    object.line = new THREE.Line(lineGeometry, lineMaterial);
    object.line.position.set(0,0,-1);
    object.line.visible = true;

    object.circle = new THREE.Line(circleGeometry, lineMaterial);
    object.circle.position.set(0,0,-1);
    object.circle.visible = true;

    var lineContainer = new THREE.Object3D();

    object.init = function () {
        raycaster = new THREE.Raycaster();
        raycaster.near = .1;
        raycaster.far = 1000;


        lineContainer.add(object.circle);


        scene.add(lineContainer);

    };

    object.update = function (position, rotation) {

        raycaster.setFromCamera(  { x: 0, y: 0 }, camera );

        lineContainer.position.x = camera.position.x + cameraContainer.position.x;
        lineContainer.position.y = camera.position.y + cameraContainer.position.y;
        lineContainer.position.z = camera.position.z + cameraContainer.position.z;

        lineContainer.rotation.copy(camera.rotation);


        var collisions = raycaster.intersectObjects(scene.children);

        if (collisions.length > 0) {
            //console.log('---- collisions[0].distance: ', collisions[0].distance);
            //object.line.position.set(0, 0, -collisions[0].distance);
            intersected = collisions[0].object;
if (intersected && intersected.name==='floor') {
            if (this.collisionPoint===undefined ||this.collisionPoint.x !== collisions[0].point.x || this.collisionPoint.y!==collisions[0].point.y || this.collisionPoint.z!==collisions[0].point.z) {
                 
                 this.collisionPoint=collisions[0].point;
                
                    //intersected.material.emissive.setHex( intersected.originalHex );//
                   /* var SELECTED=this.findParent(intersected)
                    this.updateBox(SELECTED);
*/                 // console.log('intersected floor');
                    //intersected.originalHex = intersected.material.emissive.getHex();//
                    //intersected.material.emissive.setHex( 0xff0000 );//
                    //intersected.dispatchEvent( {'type': object.IN, 'detail': collisionPoint  } );
                }
               
            }

        } else {

            if (intersected) {
                //intersected.material.emissive.setHex( intersected.originalHex );//
                intersected.dispatchEvent( {'type': object.OUT, 'detail': intersected  } );
                intersected = null;
            }
        }

    };
    object.move=function(){
        if(this.collisionPoint){

           /* var percentTime =  (clock.getElapsedTime() - selectedSpotStart) / (selectedSpotTotal - selectedSpotStart);

            selectedSpot.material.color.setRGB(1 - percentTime, 1, 0);

            if(selectedSpotTotal < clock.getElapsedTime()){*/
                              //camera.position.copy(selectedSpot.position);
                    //camera.position.y = userHeight;\
                    var currentPosX={x:cameraContainer.position.x,
                       z:cameraContainer.position.z};

                    var toPosition={x:this.collisionPoint.x,z:this.collisionPoint.z};
                    if(this.collisionPoint.z<0){
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
              //  selectedSpot = null;
          //  }
        }
    };
    object.findParent=function(object){
            var parent;
            if(object.isHost){
                parent=object;
            }else if(object.parent){
                parent = this.findParent(object.parent);
            }else{
                parent= object;
            }
            return parent;
        };
    object.updateBox=function(object){
            this.box.setFromObject( object );
                            if ( this.box.isEmpty() === false ) {    
                                this.selectionBox.update( this.box );
                                this.selectionBox.visible = true;
                            }
                            if(scene && this.box){
                                scene.add(this.selectionBox);
                            }

        };

    return object;

})();
