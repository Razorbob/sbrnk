export interface IPriorityQueue<T> {
    IsEmpty: boolean

    enqueue(item: T, priority: number): void
    dequeue(): T
}

export interface IPriorityQueueItem<T>{
    priority: number
    value: T
}