
import CameraEntity, { PerspectiveCamera } from "../engine/cameras/camera.entity";
import { PerspectiveComponent } from "../engine/cameras/perspective.component";
import SceneEntity from "../engine/scenes/scene.entity";
import { EngineEntity } from "../engine/engine.entity";
import { WorldEntity } from "../engine/world/world.entity";
import { Settings } from "./settings";
import { Entity } from "../engine/core/ecs/entity";
import RendererComponent from "../engine/webgpu/renderer.component";
import { SystemsManagerComponent } from "../engine/common.components/systemsManager.component";
import RendererSystem from "../engine/webgpu/render.system";
import { GuiEntity } from "../engine/gui/gui.entity";
import { GravityComponent } from "../engine/world/components/gravity.component";
import { CubeEntity } from "./gameObjects/cube.entity";
import { TriangleEntity } from "./gameObjects/triangle.entity";
import { Vector3 } from "../engine/math/vector";
import { SphereEntity } from "./gameObjects/sphere.entity";
import PhysixSystem from "../engine/physix/physix.system";
import { RigidBodyComponent } from "../engine/physix/rigidbody.component";
import { PlaneEntity } from "./gameObjects/plane.entity";
import { PlanetEntity } from "./gameObjects/planet.entity";


export class Game extends Entity{
    private _lastTimestamp = 0;
    private _engine:EngineEntity;
    private _scene:SceneEntity;

    constructor(canvas:HTMLCanvasElement, device:GPUDevice){
        super();
        this._engine = new EngineEntity();
        this._engine.addComponent(new RendererComponent(canvas,device));
        this.addChild(this._engine);
    }

    public Awake(): void {
        
        this._scene = new SceneEntity();
        const gravity = new GravityComponent(9.81);
        const world = new WorldEntity(gravity);
        const gui = new GuiEntity();
        //const camera = new PerspectiveCamera((45 * Math.PI) / 180, innerWidth / innerHeight, 0.1, 100);
        //const engine =  this.findChildByType(EngineEntity);
        


       // const cube2 = new CubeEntity(new Vector3(0,0,-4),new Vector3(0,0,-4),new Vector3(0,0,25),new Vector3(0.5,0.5,0.5));

        // SUN
        // MERCURY
        // VENUS
        // EARTH
        // MARS

        const sun = new SphereEntity(new Vector3(0,0,0),new Vector3(0,0,0),new Vector3(0,0,0),new Vector3(696,696,696));

        const venus = new SphereEntity(new Vector3(0,0,0),new Vector3(1075,0,0),new Vector3(0,0,0),new Vector3(60,60,60));
        venus.addComponent(new RigidBodyComponent(0.815,0,0,new Vector3(0,0,0),new Vector3(0,0,0),false));
        const earth = new SphereEntity(new Vector3(0,0,0),new Vector3(0,0,-1514),new Vector3(0,0,0),new Vector3(63,63,63));
        earth.addComponent(new RigidBodyComponent(1,0,0,new Vector3(0,0,0),new Vector3(0,0,0),false));
        const jupiter = new SphereEntity(new Vector3(0,0,0),new Vector3(-7550,0,0),new Vector3(0,0,0),new Vector3(200,200,200));
        jupiter.addComponent(new RigidBodyComponent(317,0,0,new Vector3(0,0,0),new Vector3(0,0,0),false));
        const mars = new SphereEntity(new Vector3(0,0,0),new Vector3(0,0,2488),new Vector3(0,0,0),new Vector3(33,33,33));
        mars.addComponent(new RigidBodyComponent(0.1,0,0,new Vector3(0,0,0),new Vector3(0,0,0),false));

        //const cube = new CubeEntity(new Vector3(0,0,0),new Vector3(-2,0,-4),new Vector3(0,0,25));
        // const cube3 = new CubeEntity(new Vector3(-4,0,-4),new Vector3(0,0,0),new Vector3(-25,0,0));
        // const cube4 = new CubeEntity(new Vector3(0,4,-4),new Vector3(0,0,0),new Vector3(0,25,0));
        // const cube5 = new CubeEntity(new Vector3(0,-4,-4),new Vector3(0,0,0),new Vector3(0,-25,0));
        //const triangle = new TriangleEntity();

        

        /** Camera */
        //camera.addComponent(new PerspectiveComponent("ASPECT"));
        const camera = new PerspectiveCamera(2*Math.PI/5, innerWidth/innerHeight, 0.1, 10000,new Vector3(0,10000,-1));

        /** World */
       // world.addChild(camera);
        world.addChild(sun);
        world.addChild(venus);
        world.addChild(earth);
        world.addChild(jupiter);
        world.addChild(mars);
        //world.addChild(cube);
        // world.addChild(cube2);
        // world.addChild(cube3);
        // world.addChild(cube4);
        // world.addChild(cube5);
        //world.addChild(triangle);
        world.addChild(camera);

        /** Scene */
        this._scene.addChild(world);
        this._scene.addChild(gui);
        this.addChild(this._scene);
        // init engine
        
        // create entities
        // attach components 
        // create systems 
        const systemsManagerComponent:SystemsManagerComponent = new SystemsManagerComponent();
        const rendererSystem:RendererSystem = new RendererSystem(this._scene, this._engine, 999);
        const physixSystem:PhysixSystem = new PhysixSystem(world, 1);
        
        systemsManagerComponent.register(physixSystem);
        systemsManagerComponent.register(rendererSystem);
        
        
        this._engine.addComponent(systemsManagerComponent);

        // Awake all Components
        console.log("=== Beginn Awakening ===");
        super.Awake();

        super.AwakeChildren();
        console.log("=== End Awakening ===");
        window.requestAnimationFrame(() => {
            // set initial timestamp
            this._lastTimestamp = Date.now()
      
            // start update loop
            this.Update()
          });
    }

    public Update(): void {
       // console.log("=== Beginn Update ===");
        const dt = (Date.now() - this._lastTimestamp) / 1000;
        console.log("DeltaTime: "+dt);
    
        // update all components
        super.Update(dt);

        
        this._scene.Update(dt);
        this._scene.UpdateChildren(dt);

        this._engine.Update(dt);
        //super.UpdateChildren(dt);

        //console.log("=== End Update ===");
        this._lastTimestamp = Date.now();

        // setTimeout(() => {
        //     console.log("Delayed for 5 second.");
        //     window.requestAnimationFrame(() => this.Update());
        // }, 5000)

        window.requestAnimationFrame(() => this.Update());
      }
    
}