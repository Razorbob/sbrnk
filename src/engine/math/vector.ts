import { ReadableStreamBYOBRequest } from "stream/web";

export class Vector1{
    protected x: number;
    protected _magnitude: number;

    constructor( x:number = 0) {
		this.x = x;
	}
    clone() {
        return new Vector1(this.x);
    }
    set X(x:number){
        this.x = x;
    }
    add( v:Vector1 ) {
		this.x += v.x;
		return this;
	}
    multiply( v:Vector1 ) {
		this.x *= v.x;
		return this;

	}
    addScalar( s:number ) {
        this.x += s;
        return this
    }
    multiplyScalar( s:number ) {
        this.x *= s;
        return this
    }
    devideScalar( s:number ) {
        this.x *= s;
        return this
    } 
    get magnitude():number{
        this._magnitude = this.x;
        return this._magnitude;
    }
    get normal():Vector1{
        return new Vector1(this.x/this.magnitude);
    }
    get asFloat32():Float32Array{
        return new Float32Array([this.x]);
    }
    get X(){
        return this.x;
    }
}

export class Vector2 extends Vector1{
    protected y: number;

    constructor( x:number = 0, y:number =0) {
		super(x);
        this.y = y;
	}
    clone() {
        return new Vector2(this.x, this.y);
    }
    set Y(y:number){
        this.y = y;
    }
    add( v:Vector2 ) {
		this.x += v.x;
        this.y += v.y;
		return this;
	}
    multiply( v:Vector2 ) {
		this.x *= v.x;
        this.x *= v.y;
		return this;

	}
    addScalar( s:number ) {
        super.addScalar(s);
        this.y +=s;
        return this
    }
    multiplyScalar( s:number ) {
        super.multiplyScalar(s);
        this.y *= s;
        return this
    }
    devideScalar( s:number ) {
        super.devideScalar(s);
        this.y *= s;
        return this
    } 
    get magnitude(): number{
        this._magnitude = Math.sqrt(this.x*this.x +this.y+this.y);
        return this._magnitude;
    }
    get normal():Vector2{
        return new Vector2(this.x/this.magnitude,this.y/this.magnitude);
    }
    get asFloat32():Float32Array{
        return new Float32Array([this.x, this.y]);
    }
    get Y(){
        return this.y;
    }
}

export class Vector3{
    protected numbers: number[];
    protected _magnitude: number;

    constructor(x:number = 0, y:number =0, z:number =0) {
        this.numbers=new Array<number>(3);
        this.numbers[0] = x;
        this.numbers[1] = y;
        this.numbers[2] = z;
        this._magnitude = Math.sqrt(x*x+y*y+z*z);
	}  
    clone() {
        return new Vector3(this.X, this.Y, this.Z);
    }
    
    add( v:Vector3 ) {
		this.X += v.X;
        this.Y += v.Y;
        this.Z += v.Z;
        return this;
	}
    subtract( v:Vector3 ) {
		this.X -= v.X;
        this.Y -= v.Y;
        this.Z -= v.Z;
        return this;
	}
    multiply( v:Vector3 ) {
		this.X *= v.X;
        this.Y *= v.Y;
        this.Z *= v.Z;
        return this;
	}

    devide( v:Vector3 ) {
		this.X /= v.X;
        this.Y /= v.Y;
        this.Z /= v.Z;
        return this;
	}
    addScalar( s:number ) {
        this.X +=s;
        this.Y +=s;
        this.Z +=s;
        return this;
    }
    multiplyByScalar( s:number ) {
        this.X *=s;
        this.Y *=s;
        this.Z *=s;
        return this;
    }
    devideByScalar( s:number ) {
        this.X /=s;
        this.Y /=s;
        this.Z /=s;
        return this;
    }
    dot(v:Vector3):number{
        let result = 0;
        for (let i = 0; i < this.numbers.length; i++) {
            result += this.numbers[i] * v.numbers[i];
        }
        return result;
    }

    // Copied from ThreeJS
    cross( v ) {
		return this.crossVectors( this, v );

	}

    crossVectors( a:Vector3, b:Vector3 ) {

		const ax = a.X, ay = a.Y, az = a.Z;
		const bx = b.X, by = b.Y, bz = b.Z;

		this.numbers[0] = ay * bz - az * by;
		this.numbers[1] = az * bx - ax * bz;
		this.numbers[2] = ax * by - ay * bx;

		return this;
	}


    calcPhi(b:Vector3): number{
        return Math.acos(this.normal.dot(b.normal));
    }
    
    get magnitude(): number{
        this._magnitude = Math.sqrt(this.numbers[0]*this.numbers[0] +this.numbers[1]+this.numbers[1]+this.numbers[2]*this.numbers[2]);
        return this._magnitude;
    }  
    get normal():Vector3{
        return new Vector3(this.numbers[0]/this.magnitude,this.numbers[1]/this.magnitude,this.numbers[2]/this.magnitude);
    }
    get asFloat32():Float32Array{
        return new Float32Array(this.numbers);
    }
    get asNumberArray(): number[]{
        return [this.X, this.Y, this.Z];
    }
    get X(){
        return this.numbers[0];
    }
    set X(x:number){
        this.numbers[0] = x;
    }
    get Y(){
        return this.numbers[1];
    }
    set Y(y:number){
        this.numbers[1] = y;
    }
    get Z(){
        return this.numbers[2];
    }
    set Z(z:number){
        this.numbers[2] = z;
    }
    get asArray():number[]{
        return this.numbers
    }
}

export class Vector4{
    protected numbers: number[];
    protected _magnitude: number;

    constructor(x:number = 0, y:number =0, z:number =0, w:number =1) {
        this.numbers = new Array<number>(4);
        this.numbers[0] = x;
        this.numbers[1] = y;
        this.numbers[2] = z;
        this.numbers[3] = w;
        this._magnitude = Math.sqrt(x*x+y*y+z*z+w*w);
	}  
    clone() {
        return new Vector4(this.X, this.Y, this.Z);
    }
    
    add( v:Vector4 ) {
		this.X += v.X;
        this.Y += v.Y;
        this.Z += v.Z;
        this.W += v.W;
	}
    subtract( v:Vector4 ) {
		this.X -= v.X;
        this.Y -= v.Y;
        this.Z -= v.Z;
        this.W -= v.W;
	}
    multiply( v:Vector4 ) {
		this.X *= v.X;
        this.Y *= v.Y;
        this.Z *= v.Z;
        this.W *= v.W;
	}

    devide( v:Vector4 ) {
		this.X /= v.X;
        this.Y /= v.Y;
        this.Z /= v.Z;
        this.W /= v.W;
	}
    addScalar( s:number ) {
        this.X +=s;
        this.Y +=s;
        this.Z +=s;
        this.W +=s;
    }
    multiplyByScalar( s:number ) {
        this.X *=s;
        this.Y *=s;
        this.Z *=s;
        this.W *=s;
    }
    devideByScalar( s:number ) {
        this.X /=s;
        this.Y /=s;
        this.Z /=s;
        this.W /=s;
    } 
    get magnitude(): number{
        this._magnitude = Math.sqrt(this.X*this.X +this.Y+this.Y+this.Z*this.Z+this.W*this.W);
        return this._magnitude;
    }  
    get normal():Vector4{
        return new Vector4(this.X/this.magnitude,this.Y/this.magnitude,this.Z/this.magnitude,this.W/this.magnitude);
    }
    get asFloat32():Float32Array{
        return new Float32Array(this.numbers);
    }
    get X(){
        return this.numbers[0];
    }
    set X(x:number){
        this.numbers[0] = x;
    }
    get Y(){
        return this.numbers[1];
    }
    set Y(y:number){
        this.numbers[1] = y;
    }
    get Z(){
        return this.numbers[2];
    }
    set Z(z:number){
        this.numbers[2] = z;
    }
    get W(){
        return this.numbers[3];
    }
    set W(w:number){
        this.numbers[3] = w;
    }
    get asArray():number[]{
        return this.numbers
    }
}
