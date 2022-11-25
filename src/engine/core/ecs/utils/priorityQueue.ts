import { IAwake, IUpdate } from "../ecs";
import { System } from "../system";
import { IPriorityQueue, IPriorityQueueItem } from "./queue.utils"

export class PriorityQueue<T> implements IPriorityQueue<T>, IUpdate, IAwake {
  
  protected _items: IPriorityQueueItem<T>[] = []

  public get IsEmpty(): boolean {
    return this._items.length === 0
  }

  public enqueue(value: T, priority: number): void {
    console.log(`pushing ${value.constructor.name} to Queue`);
    this._pushItems(value, priority);
    this._items = this._items.sort((a, b) => a.priority - b.priority);
    //console.log(this._items);
  }

  protected _pushItems(value: T, priority: number){
    this._items.push({
        value,
        priority
      })
  }

  public dequeue(): T {
    const item = this._items.shift()
    if (typeof item === 'undefined') {
      throw new Error('Attempt to dequeue from an empty queue')
    }

    return item.value
  }

  Update(dt: number): void {
    for (const item of this._items) {
       if(item.value instanceof System){
          item.value.Update(dt);
       }
    }
  }

  Awake(): void {
    for (const item of this._items) {
       if(item.value instanceof System){
          item.value.Awake();
       }
    }
  }
}