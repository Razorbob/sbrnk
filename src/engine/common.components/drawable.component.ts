import { IComponent } from "../core/ecs/component.interface";
import { Entity } from "../core/ecs/entity";
import { System } from "../core/ecs/system";

export class DrawableComponent implements IComponent {
    id: string;
    Entity: Entity;

    Update(dt: number, ): void {
        console.log("Draw the Entity");
    }
    Awake(): void {
        throw new Error("Method not implemented.");
    }
    Sleep(): void {
        throw new Error("Method not implemented.");
    }
    
    private _buildBuffer(){

    }
    
}