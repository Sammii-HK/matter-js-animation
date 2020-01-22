document.addEventListener('DOMContentLoaded', () => {
  //setup aliases
  var Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Composite = Matter.Composite,
          Composites = Matter.Composites,
          Common = Matter.Common,
          MouseConstraint = Matter.MouseConstraint,
          Mouse = Matter.Mouse,
          World = Matter.World,
          Bodies = Matter.Bodies;

      // create engine
      var engine = Engine.create(),
          world = engine.world;

      // create renderer
      var render = Render.create({
          element: document.body,
          engine: engine,
          options: {
              width: 1500,
              height: 850,
              //background: 'beach.jpg',
              showAngleIndicator: true,
          }
      });

      Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);



    // add bodies
    var stack = Composites.stack(20, 20, 20, 5, 0, 0, function(x, y) {
        return Bodies.circle(x, y, Common.random(10, 20), { friction: 0.00001, restitution: 0.5, density: 0.001 });
    });

    World.add(world, stack);

    World.add(world, [
        Bodies.rectangle(250, 150, 700, 5, { isStatic: true, angle: Math.PI * 0.06, render: { visible: true} }),
        Bodies.rectangle(500, 380, 700, 10, { isStatic: true, angle: -Math.PI * 0.08, render: { visible: true} }),
        // Bodies.rectangle(340, 580, 700, 10, { isStatic: true, angle: Math.PI * 0.05, render: { visible: true} })

    ]);


  //code to add ball pool


     // add bodies
    World.add(world, [
        Bodies.rectangle(400, 600, 1200, 10.5, { isStatic: true})
    ]);

    var stack = Composites.stack(100, 0, 10, 8, 10, 10, function(x, y) {
        return Bodies.circle(x, y, Common.random(15, 30), { restitution: 0.6, friction: 0.1 });
    });

    World.add(world, [
        stack,
        Bodies.polygon(200, 460, 3, 60),
        Bodies.polygon(400, 460, 5, 60),
        Bodies.rectangle(600, 460, 80, 80)
    ]);


    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;


    // fit the render viewport to the scene
    Render.lookAt(render,Composite.allBodies(world));

})
