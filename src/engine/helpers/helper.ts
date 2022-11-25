import { PrimitiveEntity } from "../../game/gameObjects/primitive.entity";
import { Vector3 } from "../math/vector";

export  function _createBuffer(arr: Float32Array | Uint32Array, usage: number, device:GPUDevice): GPUBuffer{
    // 📏 Align to 4 bytes (thanks @chrimsonite)
    let desc = {
        size: (arr.byteLength + 3) & ~3,
        //size: arr.byteLength,
        usage,
        mappedAtCreation: true
    };
    let buffer = device.createBuffer(desc);
    const writeArray =
        arr instanceof Uint32Array
            ? new Uint32Array(buffer.getMappedRange())
            : new Float32Array(buffer.getMappedRange());
    writeArray.set(arr);
    buffer.unmap();
    return buffer;
};

export function degreeToRadian(degrees: number): number{
    return degrees * Math.PI / 180;
}

export function radianToDegree(radian: number): number{
    return radian *  180 / Math.PI;
}

export type CollisionPoint = {
	A:Vector3 ; // Furthest point of A into B
	B:Vector3 ; // Furthest point of B into A
	Normal:Vector3 ; // B – A normalized
	Depth:number;    // Length of B – A
	HasCollision:boolean;
};

export type Collision = {
	objA:PrimitiveEntity;
	objB:PrimitiveEntity;
	cpoint:CollisionPoint;
};

export function getSphereSphereCollision():CollisionPoint {
    return
};
export function getSpherePlaneCollision():CollisionPoint {
    return
};