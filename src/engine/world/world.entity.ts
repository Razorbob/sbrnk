import { Entity } from "../core/ecs/entity";
import { GravityComponent } from "./components/gravity.component";

export class WorldEntity extends Entity {

    constructor(gravity:GravityComponent){
        super();
        this.addComponent(gravity);
    }

    Awake(): void {
        super.Awake();
        super.AwakeChildren();
    }

    Update(dt: number): void {
        super.Update(dt);
        super.UpdateChildren(dt);

    }
    
}