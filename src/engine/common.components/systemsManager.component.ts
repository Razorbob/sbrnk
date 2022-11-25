import { Injectable } from "../core/di/injectable"
import { IComponent } from "../core/ecs/component.interface"
import { Entity } from "../core/ecs/entity"
import { System } from "../core/ecs/system"
import { PriorityQueue } from "../core/ecs/utils/priorityQueue"

@Injectable('SystemManager')
export class SystemsManagerComponent implements IComponent {
    id: string
    Entity: Entity
    private _drawQ: PriorityQueue<System> = new PriorityQueue<System>();
    private _updateQ: PriorityQueue<System> = new PriorityQueue<System>();

    Update(dt: number): void {
        // First Update All "UPDATE" Systems
        if (!this._updateQ.IsEmpty) this._updateQ.Update(dt);
        // Secound Update alle "DRAW" Systems
        if (!this._drawQ.IsEmpty) this._drawQ.Update(dt);
    }

    Awake(): void {
        this._updateQ.Awake();
        this._drawQ.Awake();
    }

    Sleep(): void {
        throw new Error("Method not implemented.")
    }

    public register(sys: System): boolean {
        //console.log("Register a System");
        if(sys.Type == 'UPDATE'){
            this._drawQ.enqueue(sys, sys.Priority);
            return true;
        }else if(sys.Type == 'DRAW'){
            this._updateQ.enqueue(sys, sys.Priority);
            return true;
        }
        return false;
    }


}