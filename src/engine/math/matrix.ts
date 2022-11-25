import { Vector3, Vector4 } from "./vector";

export class Matrix2{
    private _matrix: Float32Array;
    constructor(){
        this._matrix = new Float32Array(4);
        this._matrix[0] = 1;
        this._matrix[3] = 1;
    }

    public fromMatrix3(){

    }

    public get matrix():Float32Array{
        return this._matrix;
    }
}

export class Matrix3{
    private _matrix: Float32Array;
    constructor(){
        this._matrix = new Float32Array(9);
        this._matrix[0] = 1;
        this._matrix[4] = 1;
        this._matrix[8] = 1;
    }

    public fromMatrix4(matrixIn:Matrix4){
        const newValues = matrixIn.matrix;
        this._matrix[0] = newValues[0];
        this._matrix[1] = newValues[1];
        this._matrix[2] = newValues[2];
        this._matrix[3] = newValues[4];
        this._matrix[4] = newValues[5];
        this._matrix[5] = newValues[6];
        this._matrix[6] = newValues[8];
        this._matrix[7] = newValues[9];
        this._matrix[8] = newValues[10];
    }

    public set matrix(matrixIn:Float32Array){
        this._matrix = matrixIn;
    }

    public get matrix():Float32Array{
        return this._matrix;
    }

    public get identity():Float32Array{
        return new Float32Array([1,0,0,0,1,0,0,0,1]);
    }

    public toIdentity(){
        this._matrix = new Float32Array([1,0,0,0,1,0,0,0,1]);
    }

    public transpose(){
        const a01 = this._matrix[1],
        a02 = this._matrix[2],
        a12 = this._matrix[5];
        this._matrix[1] = this._matrix[3];
        this._matrix[2] = this._matrix[6];
        this._matrix[3] = a01;
        this._matrix[5] = this._matrix[7];
        this._matrix[6] = a02;
        this._matrix[7] = a12;
    }

    public invert(){
    }

    public add(){

    }
    public subtract(){

    }

    public multiply(){
    }

    public translate(){ 
    }

    public rotate(){
    }

    public scale(){
    }

    public projection(width, height){

    }
}

/**
 * m00 m10 m20 m30
 * m01 m11 m21 m31
 * m02 m12 m22 m32
 * m03 m13 m23 m33
 *****************
 * 0   4   8   12
 * 1   5   9   13
 * 2   6   10  14
 * 3   7   11  15
 * ***************
 */

export class Matrix4{
    private _matrix: Float32Array;
    constructor(){
        this._matrix = new Float32Array(16);
        //console.log(this._matrix);
        this._matrix[0] = 1;
        this._matrix[5] = 1;
        this._matrix[10] = 1;
        this._matrix[15] = 1;
    }

    public set matrix(matrixIn:Float32Array){
        this._matrix = matrixIn;
    }

    public get matrix():Float32Array{
        return this._matrix;
    }

    public get identity():Float32Array{
        return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
    }

    public toIdentity(){
        this._matrix = new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
    }

    public transpose(){
        const a01 = this._matrix[1],
              a02 = this._matrix[2],
              a03 = this._matrix[3],
              a12 = this._matrix[6],
              a13 = this._matrix[7],
              a23 = this._matrix[11];
        
        this._matrix[1] = this._matrix[4];
        this._matrix[2] = this._matrix[8];
        this._matrix[3] = this._matrix[12];
        this._matrix[4] = a01;
        this._matrix[6] = this._matrix[9];
        this._matrix[7] = this._matrix[13];
        this._matrix[8] = a02;
        this._matrix[9] = a12;
        this._matrix[11] = this._matrix[14];
        this._matrix[12] = a03;
        this._matrix[13] = a13;
        this._matrix[14] = a23;
    }

    public invert(){
    }

    public add(){

    }
    public subtract(){

    }
    public multiplyFromAandB(a:Matrix4,b:Matrix4){
        const a00 = a.matrix[0],
            a01 = a.matrix[1],
            a02 = a.matrix[2],
            a03 = a.matrix[3],
            a10 = a.matrix[4],
            a11 = a.matrix[5],
            a12 = a.matrix[6],
            a13 = a.matrix[7],
            a20 = a.matrix[8],
            a21 = a.matrix[9],
            a22 = a.matrix[10],
            a23 = a.matrix[11],
            a30 = a.matrix[12],
            a31 = a.matrix[13],
            a32 = a.matrix[14],
            a33 = a.matrix[15];

        // Cache only the current line of the second matrix
        let b0 = b.matrix[0],
            b1 = b.matrix[1],
            b2 = b.matrix[2],
            b3 = b.matrix[3];
        this._matrix[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this._matrix[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this._matrix[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this._matrix[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b.matrix[4];
        b1 = b.matrix[5];
        b2 = b.matrix[6];
        b3 = b.matrix[7];
        this._matrix[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this._matrix[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this._matrix[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this._matrix[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b.matrix[8];
        b1 = b.matrix[9];
        b2 = b.matrix[10];
        b3 = b.matrix[11];
        this._matrix[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this._matrix[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this._matrix[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this._matrix[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = b.matrix[12];
        b1 = b.matrix[13];
        b2 = b.matrix[14];
        b3 = b.matrix[15];
        this._matrix[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this._matrix[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this._matrix[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this._matrix[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    }

    multiplyWithMe(b:Matrix4){
        this.multiplyFromAandB(b,this);
    }

    public multiplyM4(mult:Matrix4){
        let res = this._matrix;
        // 0,  4,  8,  12,
        // 1,  5,  9,  13,
        // 2,  6,  10, 14,
        // 3,  7,  11, 15

        // 0,  4,  8,  12,
        // 1,  5,  9,  13,
        // 2,  6,  10, 14,
        // 3,  7,  11, 15

        // 0*0+1*4+2*8+3*12
        // 0*1+1*5+2*9+3*13
        // ...

        res[0] = this.matrix[0]*mult.matrix[0] + this.matrix[4]*mult.matrix[1] + this.matrix[8]*mult.matrix[2]+this.matrix[12]*mult.matrix[3];
        res[1] = this.matrix[1]*mult.matrix[0] + this.matrix[5]*mult.matrix[1] + this.matrix[9]*mult.matrix[2]+this.matrix[13]*mult.matrix[3];
        res[2] = this.matrix[2]*mult.matrix[0] + this.matrix[6]*mult.matrix[1] + this.matrix[10]*mult.matrix[2]+this.matrix[14]*mult.matrix[3];
        res[3] = this.matrix[3]*mult.matrix[0] + this.matrix[7]*mult.matrix[1] + this.matrix[11]*mult.matrix[2]+this.matrix[15]*mult.matrix[3];

        res[4] = this.matrix[0]*mult.matrix[4] + this.matrix[4]*mult.matrix[5] + this.matrix[8]*mult.matrix[6]+this.matrix[12]*mult.matrix[7];
        res[5] = this.matrix[1]*mult.matrix[4] + this.matrix[5]*mult.matrix[5] + this.matrix[9]*mult.matrix[6]+this.matrix[13]*mult.matrix[7];
        res[6] = this.matrix[2]*mult.matrix[4] + this.matrix[6]*mult.matrix[5] + this.matrix[10]*mult.matrix[6]+this.matrix[14]*mult.matrix[7];
        res[7] = this.matrix[3]*mult.matrix[4] + this.matrix[7]*mult.matrix[5] + this.matrix[11]*mult.matrix[6]+this.matrix[15]*mult.matrix[7];

        res[8] = this.matrix[0]*mult.matrix[8] + this.matrix[4]*mult.matrix[9] + this.matrix[8]*mult.matrix[10]+this.matrix[12]*mult.matrix[11];
        res[9] = this.matrix[1]*mult.matrix[8] + this.matrix[5]*mult.matrix[9] + this.matrix[9]*mult.matrix[10]+this.matrix[13]*mult.matrix[11];
        res[10] = this.matrix[2]*mult.matrix[8] + this.matrix[6]*mult.matrix[9] + this.matrix[10]*mult.matrix[10]+this.matrix[14]*mult.matrix[11];
        res[11] = this.matrix[3]*mult.matrix[8] + this.matrix[7]*mult.matrix[9] + this.matrix[11]*mult.matrix[10]+this.matrix[15]*mult.matrix[11];

        res[12] = this.matrix[0]*mult.matrix[12] + this.matrix[4]*mult.matrix[13] + this.matrix[8]*mult.matrix[14]+this.matrix[12]*mult.matrix[15];
        res[13] = this.matrix[1]*mult.matrix[12] + this.matrix[5]*mult.matrix[13] + this.matrix[9]*mult.matrix[14]+this.matrix[13]*mult.matrix[15];
        res[14] = this.matrix[2]*mult.matrix[12] + this.matrix[6]*mult.matrix[13] + this.matrix[10]*mult.matrix[14]+this.matrix[14]*mult.matrix[15];
        res[15] = this.matrix[3]*mult.matrix[12] + this.matrix[7]*mult.matrix[13] + this.matrix[11]*mult.matrix[14]+this.matrix[15]*mult.matrix[15];


        // res[0] = this.matrix[0]*mult.matrix[0] + this.matrix[1]*mult.matrix[4] + this.matrix[2]*mult.matrix[8] + this.matrix[3]*mult.matrix[12];
        // res[1] = this.matrix[0]*mult.matrix[1] + this.matrix[1]*mult.matrix[5] + this.matrix[2]*mult.matrix[9] + this.matrix[3]*mult.matrix[13];
        // res[2] = this.matrix[0]*mult.matrix[2] + this.matrix[1]*mult.matrix[6] + this.matrix[2]*mult.matrix[10] + this.matrix[3]*mult.matrix[14];
        // res[3] = this.matrix[0]*mult.matrix[3] + this.matrix[1]*mult.matrix[7] + this.matrix[2]*mult.matrix[11] + this.matrix[3]*mult.matrix[15];

        // res[4] = this.matrix[4]*mult.matrix[0] + this.matrix[5]*mult.matrix[4] + this.matrix[6]*mult.matrix[8] + this.matrix[7]*mult.matrix[12];
        // res[5] = this.matrix[4]*mult.matrix[1] + this.matrix[5]*mult.matrix[5] + this.matrix[6]*mult.matrix[9] + this.matrix[7]*mult.matrix[13];
        // res[6] = this.matrix[4]*mult.matrix[2] + this.matrix[5]*mult.matrix[6] + this.matrix[6]*mult.matrix[10] + this.matrix[7]*mult.matrix[14];
        // res[7] = this.matrix[4]*mult.matrix[3] + this.matrix[5]*mult.matrix[7] + this.matrix[6]*mult.matrix[11] + this.matrix[7]*mult.matrix[15];

        // res[8] = this.matrix[8]*mult.matrix[0] + this.matrix[9]*mult.matrix[4] + this.matrix[10]*mult.matrix[8] + this.matrix[11]*mult.matrix[12];
        // res[9] = this.matrix[8]*mult.matrix[1] + this.matrix[9]*mult.matrix[5] + this.matrix[10]*mult.matrix[9] + this.matrix[11]*mult.matrix[13];
        // res[10] = this.matrix[8]*mult.matrix[2] + this.matrix[9]*mult.matrix[6] + this.matrix[10]*mult.matrix[10] + this.matrix[11]*mult.matrix[14];
        // res[11] = this.matrix[8]*mult.matrix[3] + this.matrix[9]*mult.matrix[7] + this.matrix[10]*mult.matrix[11] + this.matrix[11]*mult.matrix[15];

        // res[12] = this.matrix[12]*mult.matrix[0] + this.matrix[13]*mult.matrix[4] + this.matrix[14]*mult.matrix[8] + this.matrix[15]*mult.matrix[12];
        // res[13] = this.matrix[12]*mult.matrix[1] + this.matrix[13]*mult.matrix[5] + this.matrix[14]*mult.matrix[9] + this.matrix[15]*mult.matrix[13];
        // res[14] = this.matrix[12]*mult.matrix[2] + this.matrix[13]*mult.matrix[6] + this.matrix[14]*mult.matrix[10] + this.matrix[15]*mult.matrix[14];
        // res[15] = this.matrix[12]*mult.matrix[3] + this.matrix[13]*mult.matrix[7] + this.matrix[14]*mult.matrix[11] + this.matrix[15]*mult.matrix[15];

        this._matrix = res;
    }

    public toTranslationMatrix(direction:Vector3){
        // 1, 0, 0, x,
        // 0, 1, 0, y,
        // 0, 0, 1, z,
        // 0, 0, 0, 1

        // 0,  4,  8,  12,
        // 1,  5,  9,  13,
        // 2,  6,  10, 14,
        // 3,  7,  11, 15
        
        this._matrix = new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,direction.X,direction.Y,direction.Z,1]);   
    }

    public translate(direction:Vector3){
        const res = new Matrix4();
        res.matrix[3] = direction.X;
        res.matrix[7] = direction.Y;
        res.matrix[11] = direction.Z;
        res.matrix[15] = 1;
        //console.log(this._matrix);
        this.multiplyWithMe(res);
        //console.log(this._matrix);
    }

    // public rotate(angle:number, axis:Vector3){
    //     let c: number = Math.cos(angle);
    //     let s: number = Math.sin(angle);
    //     let mc: number = (1-c);
        
    //     var result = new Matrix4();
        
    //     result.setCol(1, new Vector4(
    //         axis.X*axis.X*mc+c,             //xx(1-c)+c
    //         axis.X*axis.Y*mc+axis.Z*s,      //xy(1-c)+zs
    //         axis.X*axis.Z*mc-axis.Y*s,      //xz(1-c)-ys
    //         0));                              // 0
        
    //     result.setCol(2, new Vector4(
    //         axis.X*axis.Y*mc-axis.Z*s,      //xy(1-c)-zs
    //         axis.Y*axis.Y*mc+c,             //yy(1-c)+c
    //         axis.Y*axis.Z*mc+axis.X*s,      //yz(1-c)+xs
    //         0));
    //                                       //0
    //     result.setCol(3, new Vector4(
    //         axis.X*axis.Z*mc+axis.Y*s,      //xz(1-c)+ys
    //         axis.Y*axis.Z*mc-axis.X*s,      //yz(1-c)-xs
    //         axis.Z*axis.Z*mc+c,             //zz(1-c)+c
    //         0));                              //0
                            
    //     this.multiplyM4(result);
    // }

    public toScaleMatrix(axis:Vector3){
        const scaleM = new Matrix4();
        scaleM.toDiagonalMatrix(new Vector4(axis.X,axis.Y,axis.Z,1));
        //this.multiplyM4(scaleM);
    }

    // public toRotationMatrix(axis:Vector3){
    //     const scaleM = new Matrix4();
    //     scaleM.toDiagonalMatrix(new Vector4(axis.X,axis.Y,axis.Z,1));
    //     //this.multiplyM4(scaleM);
    // }

    public toDiagonalMatrix(vec:Vector4){
        this._matrix = new Float32Array([vec.X,0,0,0,0,vec.Y,0,0,0,0,vec.Z,0,0,0,0,vec.W]);
    }

    public toProjectionMatrix2(angleDegrees: number, aspect: number, nearZ: number, farZ:number){
            const aov = this._degreeToRadian(angleDegrees);
            const y = 1 / Math.tan(aov*0.5)
            const x = y / aspect
            const z = farZ / (nearZ - farZ)
            const w = z * nearZ
            
            this.toDiagonalMatrix(new Vector4(x,y,z,0));
            // Setter werden gebraucht
            let newCol:Vector4 = this.col[3];
            newCol.W = w;
            this.setCol(3,newCol)
            this.setCol(4, new Vector4(0,0,-1,0));
    }

    public toProjectionMatrix3(fovy, aspect, near, far) {
        const f = 1.0 / Math.tan(fovy / 2);
        this._matrix[0] = f / aspect;
        this._matrix[1] = 0;
        this._matrix[2] = 0;
        this._matrix[3] = 0;
        this._matrix[4] = 0;
        this._matrix[5] = f;
        this._matrix[6] = 0;
        this._matrix[7] = 0;
        this._matrix[8] = 0;
        this._matrix[9] = 0;
        this._matrix[11] = -1;
        this._matrix[12] = 0;
        this._matrix[13] = 0;
        this._matrix[15] = 0;
        if (far != null && far !== Infinity) {
            const nf = 1 / (near - far);
            this._matrix[10] = (far + near) * nf;
            this._matrix[14] = 2 * far * near * nf;
        } else {
            this._matrix[10] = -1;
            this._matrix[14] = -2 * near;
        }
    }
    

    public toProjectionMatrix(fovy, aspect, near, far){
        const f = 1.0 / Math.tan(fovy / 2);
        this._matrix[0] = f / aspect;
        this._matrix[1] = 0;
        this._matrix[2] = 0;
        this._matrix[3] = 0;
        this._matrix[4] = 0;
        this._matrix[5] = f;
        this._matrix[6] = 0;
        this._matrix[7] = 0;
        this._matrix[8] = 0;
        this._matrix[9] = 0;
        this._matrix[11] = -1;
        this._matrix[12] = 0;
        this._matrix[13] = 0;
        this._matrix[15] = 0;
        if (far != null && far !== Infinity) {
          const nf = 1 / (near - far);
          this._matrix[10] = far * nf;
          this._matrix[14] = far * near * nf;
        } else {
          this._matrix[10] = -1;
          this._matrix[14] = -near;
        }

    }

    public lookTo(eye:Vector3,center:Vector3,up:Vector3){
        let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
        const eyex = eye.X;
        const eyey = eye.Y;
        const eyez = eye.Z;
        const upx = up.X;
        const upy = up.Y;
        const upz = up.Z;
        const centerx = center.X;
        const centery = center.Y;
        const centerz = center.Z;

        if (
            Math.abs(eyex - centerx) < 0.000001 &&
            Math.abs(eyey - centery) < 0.000001 &&
            Math.abs(eyez - centerz) < 0.000001
        ) {
            this.toIdentity();
        }

        z0 = eyex - centerx;
        z1 = eyey - centery;
        z2 = eyez - centerz;

        len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;

        x0 = upy * z2 - upz * z1;
        x1 = upz * z0 - upx * z2;
        x2 = upx * z1 - upy * z0;
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        } else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }

        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;

        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        } else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }

        this._matrix[0] = x0;
        this._matrix[1] = y0;
        this._matrix[2] = z0;
        this._matrix[3] = 0;
        this._matrix[4] = x1;
        this._matrix[5] = y1;
        this._matrix[6] = z1;
        this._matrix[7] = 0;
        this._matrix[8] = x2;
        this._matrix[9] = y2;
        this._matrix[10] = z2;
        this._matrix[11] = 0;
        this._matrix[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        this._matrix[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        this._matrix[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        this._matrix[15] = 1;

    }

    public perspectiveFromFOV(fov, near, far) {
        const upTan = Math.tan((fov.upDegrees * Math.PI) / 180.0);
        const downTan = Math.tan((fov.downDegrees * Math.PI) / 180.0);
        const leftTan = Math.tan((fov.leftDegrees * Math.PI) / 180.0);
        const rightTan = Math.tan((fov.rightDegrees * Math.PI) / 180.0);
        const xScale = 2.0 / (leftTan + rightTan);
        const yScale = 2.0 / (upTan + downTan);
      
        this._matrix[0] = xScale;
        this._matrix[1] = 0.0;
        this._matrix[2] = 0.0;
        this._matrix[3] = 0.0;
        this._matrix[4] = 0.0;
        this._matrix[5] = yScale;
        this._matrix[6] = 0.0;
        this._matrix[7] = 0.0;
        this._matrix[8] = -((leftTan - rightTan) * xScale * 0.5);
        this._matrix[9] = (upTan - downTan) * yScale * 0.5;
        this._matrix[10] = far / (near - far);
        this._matrix[11] = -1.0;
        this._matrix[12] = 0.0;
        this._matrix[13] = 0.0;
        this._matrix[14] = (far * near) / (near - far);
        this._matrix[15] = 0.0;
      }

    // public toProjectionMatrix(fovy, aspect, near, far) {
    //     const f = 1.0 / Math.tan(fovy / 2);
    //     this._matrix[0] = f / aspect;
    //     this._matrix[1] = 0;
    //     this._matrix[2] = 0;
    //     this._matrix[3] = 0;
    //     this._matrix[4] = 0;
    //     this._matrix[5] = f;
    //     this._matrix[6] = 0;
    //     this._matrix[7] = 0;
    //     this._matrix[8] = 0;
    //     this._matrix[9] = 0;
    //     this._matrix[11] = -1;
    //     this._matrix[12] = 0;
    //     this._matrix[13] = 0;
    //     this._matrix[15] = 0;
    //     if (far != null && far !== Infinity) {
    //         const nf = 1 / (near - far);
    //         this._matrix[10] = (far + near) * nf;
    //         this._matrix[14] = 2 * far * near * nf;
    //     } else {
    //         this._matrix[10] = -1;
    //         this._matrix[14] = -2 * near;
    //     }
    // }

    toArray(array = [], offset = 0 ) {

        const te = this._matrix;

        array[ offset ] = te[ 0 ];
        array[ offset + 1 ] = te[ 1 ];
        array[ offset + 2 ] = te[ 2 ];
        array[ offset + 3 ] = te[ 3 ];

        array[ offset + 4 ] = te[ 4 ];
        array[ offset + 5 ] = te[ 5 ];
        array[ offset + 6 ] = te[ 6 ];
        array[ offset + 7 ] = te[ 7 ];

        array[ offset + 8 ] = te[ 8 ];
        array[ offset + 9 ] = te[ 9 ];
        array[ offset + 10 ] = te[ 10 ];
        array[ offset + 11 ] = te[ 11 ];

        array[ offset + 12 ] = te[ 12 ];
        array[ offset + 13 ] = te[ 13 ];
        array[ offset + 14 ] = te[ 14 ];
        array[ offset + 15 ] = te[ 15 ];

        return array;
    }


    public get col():Vector4[] {
    return [
        new Vector4(this._matrix[0],this._matrix[4],this._matrix[8],this._matrix[12]),
        new Vector4(this._matrix[1],this._matrix[5],this._matrix[9],this._matrix[13]),
        new Vector4(this._matrix[2],this._matrix[6],this._matrix[10],this._matrix[14]),
        new Vector4(this._matrix[3],this._matrix[7],this._matrix[11],this._matrix[15]),
    ];
    }

    public get row():Vector4[] {
    return [
        new Vector4(this._matrix[0],this._matrix[1],this._matrix[2],this._matrix[3]),
        new Vector4(this._matrix[4],this._matrix[5],this._matrix[6],this._matrix[7]),
        new Vector4(this._matrix[8],this._matrix[9],this._matrix[10],this._matrix[11]),
        new Vector4(this._matrix[12],this._matrix[13],this._matrix[14],this._matrix[15]),
    ];
    }

    public setCol(colnr:number, values:Vector4):void {
        switch(colnr){
            case 1: this._matrix[0]=values.X;this._matrix[4]=values.Y;this._matrix[8]=values.Z;this._matrix[12]=values.W;break;
            case 2: this._matrix[1]=values.X;this._matrix[5]=values.Y;this._matrix[9]=values.Z;this._matrix[13]=values.W;break;
            case 3: this._matrix[2]=values.X;this._matrix[6]=values.Y;this._matrix[10]=values.Z;this._matrix[14]=values.W;break;
            case 4: this._matrix[3]=values.X;this._matrix[7]=values.Y;this._matrix[11]=values.Z;this._matrix[15]=values.W;break;
        }
    }

    private _degreeToRadian(degrees: number): number{
        return degrees * Math.PI / 180;
    }
    
    private _radianToDegree(radian: number): number{
        return radian *  180 / Math.PI;
    }

    public rotate(a:Matrix4, rad, axis) {
        let x = axis[0],
            y = axis[1],
            z = axis[2];
        let len = Math.sqrt(x * x + y * y + z * z);
        let s, c, t;
        let a00, a01, a02, a03;
        let a10, a11, a12, a13;
        let a20, a21, a22, a23;
        let b00, b01, b02;
        let b10, b11, b12;
        let b20, b21, b22;
      
        if (len < Number.EPSILON) {
          return null;
        }
      
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
      
        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;
      
        a00 = a.matrix[0];
        a01 = a.matrix[1];
        a02 = a.matrix[2];
        a03 = a.matrix[3];
        a10 = a.matrix[4];
        a11 = a.matrix[5];
        a12 = a.matrix[6];
        a13 = a.matrix[7];
        a20 = a.matrix[8];
        a21 = a.matrix[9];
        a22 = a.matrix[10];
        a23 = a.matrix[11];
      
        // Construct the elements of the rotation matrix
        b00 = x * x * t + c;
        b01 = y * x * t + z * s;
        b02 = z * x * t - y * s;
        b10 = x * y * t - z * s;
        b11 = y * y * t + c;
        b12 = z * y * t + x * s;
        b20 = x * z * t + y * s;
        b21 = y * z * t - x * s;
        b22 = z * z * t + c;
      
        // Perform rotation-specific matrix multiplication
        this._matrix[0] = a00 * b00 + a10 * b01 + a20 * b02;
        this._matrix[1] = a01 * b00 + a11 * b01 + a21 * b02;
        this._matrix[2] = a02 * b00 + a12 * b01 + a22 * b02;
        this._matrix[3] = a03 * b00 + a13 * b01 + a23 * b02;
        this._matrix[4] = a00 * b10 + a10 * b11 + a20 * b12;
        this._matrix[5] = a01 * b10 + a11 * b11 + a21 * b12;
        this._matrix[6] = a02 * b10 + a12 * b11 + a22 * b12;
        this._matrix[7] = a03 * b10 + a13 * b11 + a23 * b12;
        this._matrix[8] = a00 * b20 + a10 * b21 + a20 * b22;
        this._matrix[9] = a01 * b20 + a11 * b21 + a21 * b22;
        this._matrix[10] = a02 * b20 + a12 * b21 + a22 * b22;
        this._matrix[11] = a03 * b20 + a13 * b21 + a23 * b22;
      
        if (a.matrix !== this._matrix) {
          // If the source and destination differ, copy the unchanged last row
          this._matrix[12] = a[12];
          this._matrix[13] = a[13];
          this._matrix[14] = a[14];
          this._matrix[15] = a[15];
        }
      }
    public rotateMe(rad, axis){
        this.rotate(this, rad, axis)
    }

    public vincScale(axis:Vector3){
        let res = new Matrix4();
        res.toDiagonalMatrix(new Vector4(axis.X,axis.Y,axis.Z,1));
        //console.log(res);
        this.multiplyWithMe(res);
    }

    public vincRotation(angle, axis:Vector3){
        angle = this._degreeToRadian(angle).toFixed(4);
        let c = Number(Math.cos(angle).toFixed(4));
        let s = Number(Math.sin(angle).toFixed(4));
        let mc = (1-c);

        // 0,  4,  8,  12,
        // 1,  5,  9,  13,
        // 2,  6,  10, 14,
        // 3,  7,  11, 15
        // console.log(angle);
        // console.log(axis);
        // console.log(c);
        // console.log(s);
        // console.log(mc);
        // console.log(1*1*mc+c);
        let res = new Matrix4();

        // // ROW 0
        // res.matrix[0] = axis.X*axis.X*mc+c;            //xx(1-c)+c
        // res.matrix[4] = axis.X*axis.Y*mc+axis.Z*s;     //xy(1-c)+zs
        // res.matrix[8] = axis.X*axis.Z*mc-axis.Y*s      //xz(1-c)-ys
        // res.matrix[12] = 0                              // 0

        // // ROW 1
        // res.matrix[1] = axis.X*axis.Y*mc-axis.Z*s,     //xy(1-c)-zs
        // res.matrix[5] = axis.Y*axis.Y*mc+c,            //yy(1-c)+c
        // res.matrix[9] = axis.Y*axis.Z*mc+axis.X*s,     //yz(1-c)+xs
        // res.matrix[13] = 0                              // 0

        // // ROW 2
        // res.matrix[2] = axis.X*axis.Z*mc+axis.Y*s,     //xz(1-c)+ys
        // res.matrix[6] = axis.Y*axis.Z*mc-axis.X*s,     //yz(1-c)-xs
        // res.matrix[10] = axis.Z*axis.Z*mc+c,           //zz(1-c)+c
        // res.matrix[14] = 0                             // 0

        //COl 0
        res.matrix[0] = axis.X*axis.X*mc+c;            //xx(1-c)+c
        res.matrix[1] = axis.X*axis.Y*mc+axis.Z*s;     //xy(1-c)+zs
        res.matrix[2] = axis.X*axis.Z*mc-axis.Y*s      //xz(1-c)-ys
        res.matrix[3] = 0                              // 0

        // COl 1
        res.matrix[4] = axis.X*axis.Y*mc-axis.Z*s,     //xy(1-c)-zs
        res.matrix[5] = axis.Y*axis.Y*mc+c,            //yy(1-c)+c
        res.matrix[6] = axis.Y*axis.Z*mc+axis.X*s,     //yz(1-c)+xs
        res.matrix[7] = 0                              // 0

        // COl 2
        res.matrix[8] = axis.X*axis.Z*mc+axis.Y*s,     //xz(1-c)+ys
        res.matrix[9] = axis.Y*axis.Z*mc-axis.X*s,     //yz(1-c)-xs
        res.matrix[10] = axis.Z*axis.Z*mc+c,           //zz(1-c)+c
        res.matrix[11] = 0                             // 0

        //console.log(res);
        this.multiplyWithMe(res);
    }

    public vincTranslation(direction:Vector3){
        let res = new Matrix4();

        // COl 3
        res.matrix[12] = direction.X
        res.matrix[13] = direction.Y
        res.matrix[14] = direction.Z
        res.matrix[15] = 1

        this.multiplyWithMe(res);
    }

    public rotateX(newMatrix:Matrix4, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const a10 = newMatrix.matrix[4];
        const a11 = newMatrix.matrix[5];
        const a12 = newMatrix.matrix[6];
        const a13 = newMatrix.matrix[7];
        const a20 = newMatrix.matrix[8];
        const a21 = newMatrix.matrix[9];
        const a22 = newMatrix.matrix[10];
        const a23 = newMatrix.matrix[11];
        
        if (newMatrix.matrix !== this._matrix) {
            // If the source and destination differ, copy the unchanged rows
            this._matrix[0] = newMatrix.matrix[0];
            this._matrix[1] = newMatrix.matrix[1];
            this._matrix[2] = newMatrix.matrix[2];
            this._matrix[3] = newMatrix.matrix[3];
            this._matrix[12] = newMatrix.matrix[12];
            this._matrix[13] = newMatrix.matrix[13];
            this._matrix[14] = newMatrix.matrix[14];
            this._matrix[15] = newMatrix.matrix[15];
        }
        
        // Perform axis-specific matrix multiplication
        this._matrix[4] = a10 * c + a20 * s;
        this._matrix[5] = a11 * c + a21 * s;
        this._matrix[6] = a12 * c + a22 * s;
        this._matrix[7] = a13 * c + a23 * s;
        this._matrix[8] = a20 * c - a10 * s;
        this._matrix[9] = a21 * c - a11 * s;
        this._matrix[10] = a22 * c - a12 * s;
        this._matrix[11] = a23 * c - a13 * s;
    }

    public rotateMeX(rad){
        this.rotateX(this,rad);
    }

    public toXRotationMatrix(rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
      
        // Perform axis-specific matrix multiplication
        this._matrix[0] = 1;
        this._matrix[1] = 0;
        this._matrix[2] = 0;
        this._matrix[3] = 0;
        this._matrix[4] = 0;
        this._matrix[5] = c;
        this._matrix[6] = s;
        this._matrix[7] = 0;
        this._matrix[8] = 0;
        this._matrix[9] = -s;
        this._matrix[10] = c;
        this._matrix[11] = 0;
        this._matrix[12] = 0;
        this._matrix[13] = 0;
        this._matrix[14] = 0;
        this._matrix[15] = 1;
    }

    public rotateY(a:Matrix4, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const a00 = a.matrix[0];
        const a01 = a.matrix[1];
        const a02 = a.matrix[2];
        const a03 = a.matrix[3];
        const a20 = a.matrix[8];
        const a21 = a.matrix[9];
        const a22 = a.matrix[10];
        const a23 = a.matrix[11];
    
        if (a.matrix !== this._matrix) {
            // If the source and destination differ, copy the unchanged rows
            this._matrix[4] = a.matrix[4];
            this._matrix[5] = a.matrix[5];
            this._matrix[6] = a.matrix[6];
            this._matrix[7] = a.matrix[7];
            this._matrix[12] = a.matrix[12];
            this._matrix[13] = a.matrix[13];
            this._matrix[14] = a.matrix[14];
            this._matrix[15] = a.matrix[15];
        }
        
        // Perform axis-specific matrix multiplication
        this._matrix[0] = a00 * c - a20 * s;
        this._matrix[1] = a01 * c - a21 * s;
        this._matrix[2] = a02 * c - a22 * s;
        this._matrix[3] = a03 * c - a23 * s;
        this._matrix[8] = a00 * s + a20 * c;
        this._matrix[9] = a01 * s + a21 * c;
        this._matrix[10] = a02 * s + a22 * c;
        this._matrix[11] = a03 * s + a23 * c;
    }

    public rotateMeY(rad){
        this.rotateY(this,rad);
    }

    public toYRotationMatrix(rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
      
        // Perform axis-specific matrix multiplication
        this._matrix[0] = c;
        this._matrix[1] = 0;
        this._matrix[2] = -s;
        this._matrix[3] = 0;
        this._matrix[4] = 0;
        this._matrix[5] = 1;
        this._matrix[6] = 0;
        this._matrix[7] = 0;
        this._matrix[8] = s;
        this._matrix[9] = 0;
        this._matrix[10] = c;
        this._matrix[11] = 0;
        this._matrix[12] = 0;
        this._matrix[13] = 0;
        this._matrix[14] = 0;
        this._matrix[15] = 1;
    }

    public rotateZ(a:Matrix4, rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        const a00 = a.matrix[0];
        const a01 = a.matrix[1];
        const a02 = a.matrix[2];
        const a03 = a.matrix[3];
        const a10 = a.matrix[4];
        const a11 = a.matrix[5];
        const a12 = a.matrix[6];
        const a13 = a.matrix[7];
    
        if (a.matrix !== this._matrix) {
            // If the source and destination differ, copy the unchanged last row
            this._matrix[8] = a.matrix[8];
            this._matrix[9] = a.matrix[9];
            this._matrix[10] = a.matrix[10];
            this._matrix[11] = a.matrix[11];
            this._matrix[12] = a.matrix[12];
            this._matrix[13] = a.matrix[13];
            this._matrix[14] = a.matrix[14];
            this._matrix[15] = a.matrix[15];
        }
    
        // Perform axis-specific matrix multiplication
        this._matrix[0] = a00 * c + a10 * s;
        this._matrix[1] = a01 * c + a11 * s;
        this._matrix[2] = a02 * c + a12 * s;
        this._matrix[3] = a03 * c + a13 * s;
        this._matrix[4] = a10 * c - a00 * s;
        this._matrix[5] = a11 * c - a01 * s;
        this._matrix[6] = a12 * c - a02 * s;
        this._matrix[7] = a13 * c - a03 * s;
    }

    public rotateMeZ(rad){
        this.rotateZ(this,rad);
    }

    public toZRotationMatrix(rad) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);
      
        // Perform axis-specific matrix multiplication
        this._matrix[0] = c;
        this._matrix[1] = s;
        this._matrix[2] = 0;
        this._matrix[3] = 0;
        this._matrix[4] = -s;
        this._matrix[5] = c;
        this._matrix[6] = 0;
        this._matrix[7] = 0;
        this._matrix[8] = 0;
        this._matrix[9] = 0;
        this._matrix[10] = 1;
        this._matrix[11] = 0;
        this._matrix[12] = 0;
        this._matrix[13] = 0;
        this._matrix[14] = 0;
        this._matrix[15] = 1;
      }

}