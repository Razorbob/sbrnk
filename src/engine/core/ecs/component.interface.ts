import { ISleep } from "../lifecycle/sleep.interface";
import { Entity, IAwake, IUpdate } from "./ecs";

export interface IComponent extends IUpdate, IAwake, ISleep{
    id: string;
    Entity: Entity | null;
}