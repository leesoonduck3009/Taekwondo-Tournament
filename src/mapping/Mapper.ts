import { Profile } from "./profiles/BaseProfile";
import { MappingProfileName } from "./profiles/MappingProfileName";
import { matchToDtoProfile } from "./profiles/MatchProfile";
import { playerToDtoProfile } from "./profiles/PlayerProfile";
import { roundToDtoProfile } from "./profiles/RoundProfile";

class Mapper {
  private profiles = new Map<string, Profile<any, any>>();

  register<TSource, TDestination>(
    name: string,
    profile: Profile<TSource, TDestination>
  ) {
    this.profiles.set(name, profile);
  }

  map<TSource, TDestination>(name: string, source: TSource): TDestination {
    const profile = this.profiles.get(name);
    if (!profile) throw new Error(`Profile ${name} not found`);
    return profile.map(source);
  }

  mapArray<TSource, TDestination>(
    name: string,
    sourceArray: TSource[]
  ): TDestination[] {
    const profile = this.profiles.get(name);
    if (!profile) throw new Error(`Profile ${name} not found`);
    return profile.mapArray(sourceArray);
  }
}
const mapper = new Mapper();
mapper.register(MappingProfileName.matchToDtoProfile, matchToDtoProfile);
mapper.register(MappingProfileName.playerToDtoProfile, playerToDtoProfile);
mapper.register(MappingProfileName.roundToDtoProfile, roundToDtoProfile);

export default mapper;
