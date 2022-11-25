import { IComponent } from "../core/ecs/component.interface";
import { Entity } from "../core/ecs/entity";

type ProjectionTypes= 'ASPECT' | 'ORTHOGRAPHIC';

export class PerspectiveComponent implements IComponent{

    id: string;
    Entity: Entity;
    private _projectionType: ProjectionTypes;

    constructor(projectionType:ProjectionTypes){
        this._projectionType = projectionType;
    }

    Update(dt: number): void {
        //throw new Error("Method not implemented.");
    }
    Awake(): void {
        //throw new Error("Method not implemented.");
    }
    Sleep(): void {
        //throw new Error("Method not implemented.");
    }


 
}