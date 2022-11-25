import { MassComponent } from "../../engine/common.components/mass.component";
import { VelocityComponent } from "../../engine/common.components/velocity.component";
import { Vector3, Vector4 } from "../../engine/math/vector";
import { RigidBodyComponent } from "../../engine/physix/rigidbody.component";
import { VertexComponent } from "../../engine/webgpu/vertex.component";
import { PrimitiveEntity } from "./primitive.entity";

export class CubeEntity extends PrimitiveEntity{
     
   constructor(protected trans:Vector3=new Vector3(0,0,0), protected pos:Vector3=new Vector3(0,0,0), protected rot:Vector3=new Vector3(0,0,0), protected scl:Vector3=new Vector3(1,1,1)){
      super(trans,pos,rot,scl);
      this.addComponent(new VertexComponent(0, new Vector3(-1,1,1), new Vector4(1,0,0,1)));
      this.addComponent(new VertexComponent(1, new Vector3(-1,-1,1), new Vector4(1,1,0,1)));
      this.addComponent(new VertexComponent(2, new Vector3(1,1,1), new Vector4(1,1,0,1)));
      this.addComponent(new VertexComponent(3, new Vector3(1,-1,1), new Vector4(0,1,0,1)));

      this.addComponent(new VertexComponent(4, new Vector3(-1,1,-1), new Vector4(1,0,1,1)));
      this.addComponent(new VertexComponent(5, new Vector3(1,1,-1), new Vector4(1,0,0,1)));
      this.addComponent(new VertexComponent(6, new Vector3(-1,-1,-1), new Vector4(1,0,1,1)));
      this.addComponent(new VertexComponent(7, new Vector3(1,-1,-1), new Vector4(1,0,0,1)));

      this.addComponent(new VelocityComponent(new Vector3(1,1,1)));
      this.addComponent(new MassComponent(1));

      //this._modelMatrix.translate(new Vector3(1.5, 0.0, -7.0 ));
      this._indices = new Uint32Array([
         0,2,1, 1,2,3, //Front
         2,5,3,  3,5,7, //Right
         2,0,5,  5,0,4, //TOP
         0,4,1,  1,4,6, //Left
         4,5,6,  6,5,7, //Back
         3,1,7,  7,1,6 //Bottom
     ]);
     this.addComponent(new RigidBodyComponent(1));
   }
   
   
}