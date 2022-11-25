import { Entity } from "../../engine/core/ecs/ecs";
import { Matrix4 } from "../../engine/math/matrix";
import { Vector3, Vector4 } from "../../engine/math/vector";
import { VertexComponent } from "../../engine/webgpu/vertex.component";
import { PrimitiveEntity } from "./primitive.entity";

export class TriangleEntity extends PrimitiveEntity{

    constructor(protected trans:Vector3=new Vector3(0,0,0), protected pos:Vector3=new Vector3(0,0,0), protected rot:Vector3=new Vector3(0,0,0), protected scl:Vector3=new Vector3(0,0,0)){
        super(trans,pos,rot,scl);
        this.addComponent(new VertexComponent(0, new Vector3(0,1,0), new Vector4(1,0,0,1)));
        this.addComponent(new VertexComponent(1, new Vector3(-1.0, -1.0,  0.0), new Vector4(0,1,0,1)));
        this.addComponent(new VertexComponent(2, new Vector3(1.0, -1.0,  0.0), new Vector4(0,1,0,1)));
        //this._modelMatrix.translate(new Vector3(-1.5, 0.0, +7.0));
        const num:number[] = [0,1,2];
        this._indices = new Uint32Array(num);
   }
}