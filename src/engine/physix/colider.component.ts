import { Vector } from "mnemonist";
import { PlaneEntity } from "../../game/gameObjects/plane.entity";
import { PrimitiveEntity } from "../../game/gameObjects/primitive.entity";
import { SphereEntity } from "../../game/gameObjects/sphere.entity";
import { TransformComponent } from "../common.components/transform.component";
import { Entity, IComponent } from "../core/ecs/ecs";
import { getSpherePlaneCollision, getSphereSphereCollision } from "../helpers/helper";
import { Vector3 } from "../math/vector";
import { VertexComponent } from "../webgpu/vertex.component";
import { RigidBodyComponent } from "./rigidbody.component";



export class ColiderComponent implements IComponent {
    protected _rigidBody: RigidBodyComponent;
    protected _transforms: TransformComponent;
    protected _vertices: VertexComponent[]; 

    id: string;
    Entity: Entity;

    
    constructor(){
        this._rigidBody = this.Entity.getComponent(RigidBodyComponent);
        this._transforms = this.Entity.getComponent(TransformComponent);
        this._vertices = new Array();
        if(this.Entity instanceof PrimitiveEntity){
            this._vertices = this.Entity.Vertices;
        }
    }
    
    
    Update(dt: number): void {
        throw new Error("Method not implemented.");
    }
    Awake(): void {
        throw new Error("Method not implemented.");
    }
    Sleep(): void {
        throw new Error("Method not implemented.");
    }
    
    public get rigidBody(): RigidBodyComponent {
        return this._rigidBody;
    }
    public set rigidBody(value: RigidBodyComponent) {
        this._rigidBody = value;
    }
    public get transforms(): TransformComponent {
        return this._transforms;
    }
    public set transforms(value: TransformComponent) {
        this._transforms = value;
    }

	public testCollision(collider:ColiderComponent){
		//const coltrans = collider.Entity.getComponent(TransformComponent);
	};

    public furthestPoint(dir:Vector3):Vector3{     
        return new Vector3(0,0,0);
    } 

    public support(colA:ColiderComponent, colB:ColiderComponent, dir:Vector3):Vector3 {
        const negDir = dir.clone();
        negDir.multiplyByScalar(-1);
        const res = colA.furthestPoint(dir);
        const fpB = colB.furthestPoint(negDir);
        res.subtract(fpB);
        return res;
    }

	private doSimplex(p, d){
		let col = false;

		if(p.length === 2) {
			let a = p[0];
			let b = p[1];
			let ab = b.copy().sub(a);

			let ao = a.copy().mult(-1);

			if(ab.dot(ao) > 0) {
				d.set(ab.cross(ao).cross(ab));
				
				// p[0] = a;
				// p[1] = b;
			}

			else {
				d.set(ao);
				
				p.pop();
				p[0] = a;
			}
		}

		else if(p.length === 3) {
			let a = p[0];
			let b = p[1];
			let c = p[2];
			
			let ab = b.copy().sub(a);
			let ac = c.copy().sub(a);
			let abc = ab.cross(ac);

			let ao = a.copy().mult(-1);

			if(abc.cross(ac).dot(ao) > 0) {
				if(ac.dot(ao) > 0) {
					d.set(ac.cross(ao).cross(ac));
					
					p.pop();
					p[0] = a;
					p[1] = c;
				}

				else {
					p.pop();
					this.doSimplex(p, d);
				}
			}

			else {
				if(ab.cross(abc).dot(ao) > 0) {
					p.pop();
					this.doSimplex(p, d);
				}

				else {
					col = true; // in triangle
				}
			}
		}

		// if(debug > 0 && (iter == debugIter || debugIter == -1)) {
		// 	stroke(100, 255, 100);

		// 	if(p.length == 3) {
		// 		stroke(255, 100, 255);
		// 		line(p[0].x, p[0].y, p[2].x, p[2].y);
		// 		line(p[1].x, p[1].y, p[2].x, p[2].y);
		// 	}

		// 	if(p.length >= 2) {
		// 		line(p[0].x, p[0].y, p[1].x, p[1].y);
		// 	}
		// }

		// if(debug > 3 && (iter == debugIter || debugIter == -1)) {
		// 	noStroke();

		// 	let c = 'A';
		// 	for(let i = 0; i < p.length; i++) {
		// 		if(iterPoints[p[i]] == undefined) {
		// 			iterPoints[p[i]] = 0;
		// 		}

		// 		else {
		// 			iterPoints[p[i]] += 1;
		// 		}

		// 		let myIter = iterPoints[p[i]];

		// 		switch(i) {
		// 			case 0: fill(255,   0,   0); break;
		// 			case 1: fill(  0, 255,   0); break;
		// 			case 2: fill(  0,   0, 255); break;
		// 		}
				
		// 		textSize(24);
		// 		text(c, p[i].x + 10, p[i].y - 10 - 32 * myIter);

		// 		if(iter > 0) {
		// 			textSize(8);
		// 			text(iter, p[i].x + 27, p[i].y - 8 - 32 * myIter);
		// 		}

		// 		c = String.fromCharCode(c.charCodeAt(0) + 1);

		// 		ellipse(p[i].x, p[i].y, sizeDebug, sizeDebug);
		// 	}	
		// }

		// if(debug > 1 && (iter == debugIter || debugIter == -1)) {
		// 	let avg = p[0].copy().add(p[1]).mult(0.5);
		// 	let v = createVector(avg.x, avg.y, d.x/* - avg.x*/, d.y /*- avg.y*/);
		// 	v.z = 0;
		// 	v.normalize().mult(100);
			
		// 	stroke(255, 0, 0);
		// 	line(avg.x, avg.y, avg.x - v.x, avg.y - v.y);
		// }

		return col;
	}

    private gjk(sb:ColiderComponent){
        const sa = this;
        let iter = 0;
		let iterPoints = {};

		//strokeWeight(sizeLineDebug);

		let s = this.support(sa, sb, new Vector3(1, 0, 0)); // start with unit x
		let p = [s];
		let d = s.clone().multiplyByScalar(-1);

		for(;;) {
			let a =this.support(sa, sb, d);

			if(a.dot(d) <= 0) return 0;

			p.unshift(a);

			if(this.doSimplex(p, d)) {
				let d_minI = 0, d_minJ = 1;

				let minIndex = 0;
				let minDistance = Infinity;
				let minNormal;
				
				let itr = 0;

				while(minDistance == Infinity) {
					for(let i = 0; i < p.length; i++) {
						let j = (i+1) % p.length;

						let pointI = p[i].clone(); // Get a copy of two points, p5.js stores these as objects refs, so we need a copy
						let pointJ = p[j].clone();

						let ij = pointJ.subtract(pointI); // Get vector between points

						let normal = new Vector3(ij.Y, -ij.X).normal; // Get right hand normal, we use counter clockwise winding
						let distance = normal.dot(pointI);

						if(distance <= 0) { // Reverse if the normal is pointing inwards, winding the polytope correctly would remove the need for this.
							distance *= -1;
							normal.multiplyByScalar(-1);
						}

						if(distance < minDistance) { // Find normal with smallest distance from origin
							minDistance  = distance;
							minNormal = normal;
							minIndex = j;

							d_minI = i;
							d_minJ = j;
						}

						let avg = p[j].clone().add(p[i]).multiplyByScalar(0.5);
						// if(debug > 4 && (iter == debugIter || debugIter == -1)) {
						// 	switch(i) {
						// 		case 0: stroke(255,   0,   0); fill(255,   0,   0); break;
						// 		case 1: stroke(  0, 255,   0); fill(  0, 255,   0); break;
						// 		case 2: stroke(  0,   0, 255); fill(  0,   0, 255); break;
						// 		case 3: stroke(255,   0, 255); fill(255,   0, 255); break;
						// 		case 4: stroke(255, 255,   0); fill(255, 255,   0); break;
						// 		case 5: stroke(  0, 255, 255); fill(  0, 255, 255); break;
						// 	}
						
						// 	line(avg.x, avg.y, avg.x + normal.x * distance, avg.y + normal.y * distance);
						// 	noStroke();
						// 	ellipse(avg.x + normal.x * distance, avg.y + normal.y * distance, sizeDebug, sizeDebug);
						// }
					}

					let support = this.support(sa, sb, minNormal); // Find a support point in the direction of the normal
					let sDistance = minNormal.dot(support);

					if(Math.abs(sDistance - minDistance) > 0.001) {
						minDistance = Infinity;
						p.splice(minIndex, 0, support);
					}

					else {
					 	let ij = p[d_minJ].clone().subtract(p[d_minI]);
					 	let io = p[d_minI].clone(); // orign is 0 - i
					
					 	let norm = ij.cross(io).cross(ij).normal;
					 	let dot = norm.dot(io);
					
					
						// if(debug > 0 && (iter == debugIter || debugIter == -1)) {
						//  	stroke(255);
						//  	fill(255);
						//  	strokeWeight(4);
						// 	let avg = p[d_minJ].copy().add(p[d_minI]).mult(0.5);
						//  	line(avg.x, avg.y, avg.x + minNormal.x * minDistance, avg.y + minNormal.y * minDistance);
						//  	noStroke();
						//  	strokeWeight(1);
						//  	ellipse(avg.x + minNormal.x * minDistance, avg.y + minNormal.y * minDistance, sizeDebug, sizeDebug);
						// }
					}
				}

				return minNormal.mult(minDistance + 0.001); // If ther was no support point further, exit with current normal & distance
			}

			iter++;
		}

		//noStroke();
    }

	
    
}
export class SphereCollider extends ColiderComponent{

	protected radius: number;

	public testCollision(collider:ColiderComponent){
		const coltrans = collider.Entity.getComponent(TransformComponent);
		if(collider.Entity instanceof SphereEntity){
			return getSphereSphereCollision();
		}else if(collider.Entity instanceof PlaneEntity){
			return getSpherePlaneCollision();
		}
	};
}
export class PlaneCollider extends ColiderComponent{

	protected distance: number;
	public testCollision(collider:ColiderComponent){
		const coltrans = collider.Entity.getComponent(TransformComponent);
		if(collider.Entity instanceof SphereEntity){
			return getSpherePlaneCollision();
		}
	};
}


export class MeshColiderComponent extends ColiderComponent{

    public furthestPoint(dir:Vector3):Vector3{     
        let maxPoint:Vector3;
		let maxDistance = -Number.MAX_SAFE_INTEGER;
 
		for (let vertex of this._vertices) {
			const distance = vertex.position.dot(dir);
			if (distance > maxDistance) {
				maxDistance = distance;
				maxPoint = vertex.position;
			}
		}
        return maxPoint;
    }
}

