export type ClassType<T = any> = { new(): T }
export type Signature = Set<ClassType>
export type QuerySignature = ClassType[]
export type ClassArgs =
  | [ClassType]
  | ClassType[]
