import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import {
  Company,
  CreateCompanyInput,
  FindCompany,
} from './schema/company.schema';

@Resolver(() => Company)
export class CompaniesResolver {
  constructor(private companyService: CompaniesService) {}

  @Query(() => [Company])
  async companies() {
    return this.companyService.findAll();
  }

  @Query(() => Company)
  async company(@Args('input') { _id }: FindCompany) {
    return this.companyService.findById(_id);
  }

  // @Query(() => [Company])
  // async byCategory(@Args('input') category: string) {
  //   return this.companyService.findByCategory(category);
  // }

  @Mutation(() => Company)
  async createCompany(@Args('input') company: CreateCompanyInput) {
    return this.companyService.create(<any>company);
  }

  @Mutation(() => Company)
  async deleteCompany(@Args('input') { _id }: FindCompany) {
    return this.companyService.delete(_id);
  }

  // @ResolveField(() => Category)
  // async category(@Parent() company: Company) {
  //   return this.categoryService.findById(company.category as string);
  // }
}
