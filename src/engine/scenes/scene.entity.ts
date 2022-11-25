import { Entity } from "../core/ecs/entity";

export default class SceneEntity extends Entity {

    Awake(): void {
        super.Awake();
        super.AwakeChildren();
    }

    // Update(dt: number): void {
    //     super.Update(dt);
    //     super.UpdateChildren(dt);
    // }
}

