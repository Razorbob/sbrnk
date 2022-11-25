import { MassComponent } from "../../engine/common.components/mass.component";
import { VelocityComponent } from "../../engine/common.components/velocity.component";
import { Vector3, Vector4 } from "../../engine/math/vector";
import { RigidBodyComponent } from "../../engine/physix/rigidbody.component";
import { VertexComponent } from "../../engine/webgpu/vertex.component";
import { PrimitiveEntity } from "./primitive.entity";

export class SphereEntity extends PrimitiveEntity{
     
   constructor(protected trans:Vector3=new Vector3(0,0,0), protected pos:Vector3=new Vector3(0,0,0), protected rot:Vector3=new Vector3(0,0,0), protected scl:Vector3=new Vector3(1,1,1)){
      super(trans,pos,rot,scl);
      //this.addComponent(new VertexComponent(0, new Vector3(-1,1,1), new Vector4(1,0,0,1)));

      const sphereDiv = 24;
      const tmp:number[] = [];
      // Build Vertices
      for(let j=0; j <= sphereDiv; j++){
         const aj = j *Math.PI / sphereDiv;
         const sj = Math.sin(aj);
         const cj = Math.cos(aj);
         for(let i=0; i<=sphereDiv;i++){
            const ai = i*2*Math.PI/sphereDiv;
            const si = Math.sin(ai);
            const ci = Math.cos(ai);
            this.addComponent(new VertexComponent(0, new Vector3(si*sj,cj,ci*sj), new Vector4(si*sj,cj,ci*sj,1)));
            const p1 = j*(sphereDiv+1)+i;
            const p2 = p1 + (sphereDiv+1);
            tmp.push(p1);
            tmp.push(p2);
            tmp.push(p1+1);
            tmp.push(p1+1);
            tmp.push(p2);
            tmp.push(p2+1);
         }
      }
      // this.addComponent(new VelocityComponent(new Vector3(0,10,0)));
      // this.addComponent(new MassComponent(1));

      //this._modelMatrix.translate(new Vector3(1.5, 0.0, -7.0 ));
     
      // for(let j=0; j <= sphereDiv; j++){
      //    for(let i=0; i<=sphereDiv;i++){
      //       const p1 = j*(sphereDiv+1)+i;
      //       const p2 = p1 + (sphereDiv+1);
      //       tmp.push(p1);
      //       tmp.push(p2);
      //       tmp.push(p1+1);
      //       tmp.push(p1+1);
      //       tmp.push(p2);
      //       tmp.push(p2+1);

      //    }
      // }
      this._indices = new Uint32Array(tmp);
   }
   
}
