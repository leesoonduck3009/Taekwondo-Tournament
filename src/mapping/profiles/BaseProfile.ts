export class Profile<TSource, TDestination> {
  private mapFunction: (source: TSource) => TDestination;

  constructor(mapFunction: (source: TSource) => TDestination) {
    this.mapFunction = mapFunction;
  }

  map(source: TSource): TDestination {
    return this.mapFunction(source);
  }

  mapArray(sourceArray: TSource[]): TDestination[] {
    return sourceArray.map(this.mapFunction);
  }
}
