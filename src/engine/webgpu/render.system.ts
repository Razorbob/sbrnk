import { Console } from "console";
import { CubeEntity } from "../../game/gameObjects/cube.entity";
import CameraEntity, { PerspectiveCamera } from "../cameras/camera.entity";
import { DrawableComponent } from "../common.components/drawable.component";
import { Inject } from "../core/di/inject";
import { Entity } from "../core/ecs/entity";
import { System } from "../core/ecs/system";
import SceneEntity from "../scenes/scene.entity";
import RendererComponent, { TypedArray } from "./renderer.component";


import { PrimitiveEntity } from "../../game/gameObjects/primitive.entity";
import { WorldEntity } from "../world/world.entity";
import { EngineEntity } from "../engine.entity";
import { IDraw } from "../core/lifecycle/draw.interface";

export default class RendererSystem extends System{
    private _scene: SceneEntity;
    //@Inject('Renderer') 
    private _renderer: RendererComponent;
    private _camera:PerspectiveCamera;
    private _world:WorldEntity;
    //private _renderObjects:PrimitiveEntity[];
    
    constructor(scene:SceneEntity, engine:EngineEntity, priority:number){
        super("DRAW", priority);
        this._scene = scene;
        this._camera = scene.findChildByType(PerspectiveCamera);
        this._renderer = engine.getComponent(RendererComponent);
        this._world = scene.findChildByType(WorldEntity);
    }

    Update(){
        //this._renderObjects = []
        
        /** Maybe Some Update Stuff */
        this._renderer.begin();
        this.DrawScene();
        this._renderer.end();
    }

    DrawScene(): void {
        //console.log("Draw via the Drawsystem");
        this._camera.Draw(this._renderer.device, this._renderer.renderPassEncoder, this._renderer.renderPipeline);
        for (const object of this._world.children) {
            if(object instanceof PrimitiveEntity){
                object.Draw(this._renderer.device, this._renderer.renderPassEncoder, this._renderer.renderPipeline);
            }
        }
    }
/** HERE  */

    
}