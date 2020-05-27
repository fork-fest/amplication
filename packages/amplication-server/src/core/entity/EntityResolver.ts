import {
  Args,
  Context,
  Mutation,
  Query,
  ResolveProperty,
  Resolver,
  Parent
} from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import {
  CreateOneEntityArgs,
  CreateOneEntityVersionArgs,
  FindManyEntityArgs,
  UpdateOneEntityArgs,
  FindOneEntityArgs,
  FindManyEntityVersionArgs,
  DeleteOneEntityArgs
} from './dto';
import { Entity, EntityField, EntityVersion } from 'src/models';
import { GqlResolverExceptionsFilter } from 'src/filters/GqlResolverExceptions.filter';
import { EntityService } from './entity.service';

@Resolver(_of => Entity)
@UseFilters(GqlResolverExceptionsFilter)
export class EntityResolver {
  constructor(private readonly entityService: EntityService) {}
  @Query(_returns => Entity, {
    nullable: true,
    description: undefined
  })
  async entity(
    @Context() ctx: any,
    @Args() args: FindOneEntityArgs
  ): Promise<Entity | null> {
    return this.entityService.entity(args);
  }

  @Query(_returns => [Entity], {
    nullable: false,
    description: undefined
  })
  async entities(
    @Context() ctx: any,
    @Args() args: FindManyEntityArgs
  ): Promise<Entity[]> {
    return this.entityService.entities(args);
  }

  @Mutation(_returns => Entity, {
    nullable: false,
    description: undefined
  })
  async createOneEntity(
    @Context() ctx: any,
    @Args() args: CreateOneEntityArgs
  ): Promise<Entity> {
    return this.entityService.createOneEntity(args);
  }

  @Mutation(_returns => Entity, {
    nullable: true,
    description: undefined
  })
  async deleteOneEntity(
    @Context() ctx: any,
    @Args() args: DeleteOneEntityArgs
  ): Promise<Entity | null> {
    return this.entityService.deleteOneEntity(args);
  }

  @Mutation(_returns => Entity, {
    nullable: true,
    description: undefined
  })
  async updateEntity(
    @Context() ctx: any,
    @Args() args: UpdateOneEntityArgs
  ): Promise<Entity | null> {
    return this.entityService.updateOneEntity(args);
  }

  @Mutation(_returns => EntityVersion, {
    nullable: false,
    description: undefined
  })
  async createVersion(
    @Context() ctx: any,
    @Args() args: CreateOneEntityVersionArgs
  ): Promise<EntityVersion> {
    return this.entityService.createVersion(args);
  }

  @ResolveProperty('fields', returns => [EntityField])
  async entityFields(@Parent() entity: Entity) {
    if (entity.fields && entity.fields.length) {
      return entity.fields;
    }
    return this.entityService.getEntityFields(entity);
  }

  @Query(_returns => [EntityVersion], {
    nullable: false,
    description: undefined
  })
  async entityVersions(
    @Context() ctx: any,
    @Args() args: FindManyEntityVersionArgs
  ): Promise<EntityVersion[]> {
    return this.entityService.getVersions(args);
  }
}
