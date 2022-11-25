import { Entity } from "./core/ecs/ecs";
import RendererComponent from "./webgpu/renderer.component";

export class EngineEntity extends Entity{

    protected _rendererID: string = "";

    public addRenderer(renderer:RendererComponent){
        this._rendererID = renderer.id;
        this.addComponent(renderer);
    }

    public get renderer(): RendererComponent{
        return this.getComponentById(this._rendererID) as RendererComponent;
    }
}