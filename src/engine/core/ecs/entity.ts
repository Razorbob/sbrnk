import { v4 as uuidv4 } from 'uuid';
import { DrawableComponent } from '../../common.components/drawable.component';
import { ISleep } from '../lifecycle/sleep.interface';
import { IComponent, IUpdate, IAwake} from "./ecs";
import { ClassType } from './utils/signature.utils';


type constr<T> = { new(...args: unknown[]): T };

 /**
   * Base Class of all Entities:
   * 
   * An Entity is generally only a Container of @param _components with an @param  _id
   * An Entity can also have a Hirachical relationship with other Entities 
   * An Entity can have one @param _parent or a List of @param _children
   *
   * @remarks
   * This Class is part of the {@link ecs | Entity Component System}.
   * 
   * @public
   */
export abstract class Entity implements IUpdate, IAwake, ISleep {
    
  protected _components: IComponent[] = [];
  protected _parent: Entity;
  protected _children: Entity[] = [];
  protected _id: string;

  constructor(){
    this._id = uuidv4();
  }

  public get Components(): IComponent[] {
      return this._components;
  }

  public get children(): Entity[]{
    return this._children;
  }

  public get id(): string {
      return this._id;
  }


  public addChild(entity: Entity): void {
    this._children.push(entity);
    if(entity._parent != this) entity.addParent(this);
  }

  public hasChild(entity:Entity):boolean{
    return this._children.includes(entity);
  }

  public getChildById(id: string): Entity {
    for (const entity of this._children) {
      if (entity.id === id) {
        return entity;
      }
    }
    return ;
  }

  public findChild(id: string): Entity {
    for (const entity of this._children) {
      if (entity.id === id) {
        return entity;
      }else{
        return entity.findChild(id);
      }
    }
    return ;
  }

  public findChildByType<T extends Entity>(constr: constr<T>): T {
    //console.log("searching for");
    //console.log(constr);
    for (const entity of this._children) {
      if (entity instanceof constr) {
        //console.log(entity);
        //console.log(`is right`);
        return entity as T;
      }else{
        const s:T = entity.findChildByType(constr) as T;
        if(s != undefined){
          return s;
        }
      }
    }
    return ;
  }

  public addParent(entity: Entity): void {
    this._parent = entity;
    if(!entity.hasChild(this)) entity.addChild(this);
  }

/**
 * Adds a component to the container
 * 
 * @param component - A Decenend of {@link IComponent | the Component Interface}
 * @returns nothing  
 * @public
 */
    public addComponent(component: IComponent): void {
      this._components.push(component);
      component.Entity = this;
  }
  public getComponent<T extends IComponent>(constr: constr<T>): T {
      for (const component of this._components) {
          if (component instanceof constr) {
              return component as T;
          }
      }
      return null;
  }

  public getComponents<T extends IComponent>(constr: constr<T>): T[] {
    const ret:T[]=[];
    for (const component of this._components) {
        if (component instanceof constr) {
            ret.push(component as T);
        }
    }
    return ret;
}

  public getComponentById<C extends IComponent>(cId:string): IComponent {
    for (const component of this._components) {
        if (component.id == cId) {
            return component as C;
        }
    }
    throw new Error(`Component with id: ${cId} not found on Entity ${this.constructor.name}`);
  }

  public hasComponent<C extends IComponent>(constr: constr<C>): boolean {
      for (const component of this._components) {
        if (component instanceof constr) {
          return true;
        }
      }
  
      return false;
  }

  public hasComponentByType(classn: ClassType): boolean {
    for (const component of this._components) {
      if (component instanceof classn) {
        return true;
      }
    }
    return false;
  }

  public getComponentByType(classn: ClassType): IComponent {
    for (const component of this._components) {
      if (component instanceof classn) {
            return component;
        }
    }
    throw new Error(`Component with Type: ${classn} not found on Entity ${this.constructor.name}`);
  }

  public hasComponentId(cId:string): boolean {
    for (const component of this._components) {
      if (component.id == cId) {
        return true;
      }
    }

    return false;
  }
  
  public removeComponent<T extends IComponent>(constr: constr<T>): void {
      let toRemove: IComponent | undefined
      let index: number | undefined
    
      for (let i = 0; i < this._components.length; i++) {
        const component = this._components[i];
        if (component instanceof constr) {
          toRemove = component;
          index = i;
          break;
        }
      }
    
      if (toRemove && index) {
        toRemove.Entity = null;
        this._components.splice(index, 1);
      }
  }

  public removeComponentById(cId:string): void {
    let toRemove: IComponent | undefined
    let index: number | undefined
  
    for (let i = 0; i < this._components.length; i++) {
      const component = this._components[i];
      if (component.id == cId) {
        toRemove = component;
        index = i;
        break;
      }
    }
  
    if (toRemove && index) {
      toRemove.Entity = null;
      this._components.splice(index, 1);
    }
  }

    /** Methods From Interfaces */
    
  Update(dt: number): void {
    //console.log("Updateing "+this.constructor.name);
    for(const component of this._components){
      //console.log("Updateing "+this.constructor.name+"."+component.constructor.name);
        component.Update(dt);
    }
  }

  Awake(): void {
    console.log("Awakening "+this.constructor.name);
    for(const component of this._components){
      console.log("Awakening "+this.constructor.name+"."+component.constructor.name);
      component.Awake();
    }

    //this.AwakeChildren();
  }

  Sleep(): void {
    for(const component of this._components){
      component.Sleep();
    }
  }

  AwakeChildren(): void {
    for (const entity of this.children) {
        entity.Awake();
    }
  }

  UpdateChildren(dt: number): void {
    for (const entity of this.children) {
        entity.Update(dt);
    }
  }

  //Draw(){}
}