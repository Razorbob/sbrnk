import { PositionComponent } from "../common.components/position.component";
import { Entity } from "../core/ecs/entity";
import { Vector1, Vector2, Vector3, Vector4 } from "../math/vector";

export class VertexComponent extends PositionComponent{
    private _color:Vector4;
    private _ibo:number;

    constructor(ibo:number, pos:Vector3, color:Vector4){
        super(pos);
        this._color=color;
        this._ibo = ibo;
    }

    public get color(): Vector4{
        return this._color;
    }

    public get ibo(): number{
        return this._ibo;
    }

    public get position(): Vector3 {
        return super.position;
    }
}