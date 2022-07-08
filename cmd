// new RGBELoader().setPath('textures/').load('cayley_interior_4k.hdr', function(hdrmap) {

        //   let envmap = envmaploader.fromCubemap(hdrmap);
        //   let texture = new THREE.CanvasTexture(new FlakesTexture());
        //   texture.wrapS = THREE.RepeatWrapping;
        //   texture.wrapT = THREE.RepeatWrapping;
        //   texture.repeat.x = 10;
        //   texture.repeat.y = 6;

        //   const ballMaterial = {
        //     clearcoat: 1.0,
        //     cleacoatRoughness:1,
        //     metalness: 1,
        //     roughness:1,
        //     color: 'gray',
        //     normalMap: texture,
        //     normalScale: new THREE.Vector2(0,0),
        //     envMap: envmap.texture
        //   };

        //   let ballGeo = new THREE.SphereGeometry(50,32,32);
        //   let ballMat = new THREE.MeshPhysicalMaterial();
        //   let ballMesh = new THREE.Mesh(ballGeo,ballMat);
        //   scene.add(ballMesh);

        //   animate();

        // });
        

        // function addTooltip(position, name) {
        //   let map = new THREE.TextureLoader().load( 'img/menu.png' );
        //   let material = new THREE.SpriteMaterial( { map: map } );

        //   let sprite = new THREE.Sprite( material );
        //   sprite.name = name
        //   sprite.position.copy(position.clone().normalize().multiplyScalar(30));
        //   sprite.scale.multiplyScalar(2)
        //   scene.add( sprite );
        // }

        // let intersects = rayCaster.intersectObject(ballMesh);
          // if (intersects.length > 0) {
          //   console.log(intersects[0].point);
          //   addTooltip(intersects[0].point);
          // }
          // debugger