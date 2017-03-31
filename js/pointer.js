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

    circleGeometry = new THREE.CircleGeometry( 0.01, 64 );
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
        lineContainer.position.z = camera.position.z + cameraContainer.position.y;

        lineContainer.rotation.copy(camera.rotation);


        var collisions = raycaster.intersectObjects(interactiveObjects);

        if (collisions.length > 0) {
            //console.log('---- collisions[0].distance: ', collisions[0].distance);
            //object.line.position.set(0, 0, -collisions[0].distance);

            if (intersected !== collisions[0].object) {

                if (intersected && ABSULIT.teleportSpots.TELEPORT_POINTER_TYPE !== intersected.pointerType) {
                    //intersected.material.emissive.setHex( intersected.originalHex );//
                    var SELECTED=this.findParent(intersected)
                    this.updateBox(SELECTED);
                }
                intersected = collisions[0].object;
                //intersected.originalHex = intersected.material.emissive.getHex();//
                //intersected.material.emissive.setHex( 0xff0000 );//
                intersected.dispatchEvent( {'type': object.IN, 'detail': intersected  } );
            }

        } else {

            if (intersected) {
                //intersected.material.emissive.setHex( intersected.originalHex );//
                intersected.dispatchEvent( {'type': object.OUT, 'detail': intersected  } );
                intersected = null;
            }
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
