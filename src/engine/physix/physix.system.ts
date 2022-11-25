import { CubeEntity } from "../../game/gameObjects/cube.entity";
import { PrimitiveEntity } from "../../game/gameObjects/primitive.entity";
import { MassComponent } from "../common.components/mass.component";
import { PositionComponent } from "../common.components/position.component";
import { VelocityComponent } from "../common.components/velocity.component";
import { System } from "../core/ecs/system";
import { Vector3 } from "../math/vector";
import { GravityComponent } from "../world/components/gravity.component";
import { WorldEntity } from "../world/world.entity";
import { RigidBodyComponent } from "./rigidbody.component";

export default class PhysixSystem extends System{
    private _world: WorldEntity;
    private _gravity: Vector3;
    
    constructor(world:WorldEntity, priority:number){
        super("UPDATE", priority);
        this._world = world;
        this._gravity = new Vector3(0,(0-world.getComponent(GravityComponent).gravity),0);
    }

    Update(dt:number){
        this._gravity = new Vector3(0,(0-this._world.getComponent(GravityComponent).gravity),0);
        this.updateDynamics(dt);

    }

    private updateDynamics(dt:number){

        // v = v0 + at
        // v = v0 + (F/m)t
        

        // deltaX =v0t + 1/2 at²
        // x = x0+vt

        // Every Object in motion will remain in motion unless an external force acts on it
        // Force equals mass times acceleration: F=ma
        // For every action there is an equal and opposite reaction

        // Apply Forces & Update Positions & Veolicity 

        for (const object of this._world.children) {            
            const body = object.getComponent(RigidBodyComponent);
            if(body != null){
                body.gravity = this._gravity.clone();
                body.Update(dt);
            }
        }

         // Detect Collisions

         // Solve Collisions
    }
    private detectCollision(){
        
    }
    private collisionResponse(){
        
    }
/** HERE  */

    
}