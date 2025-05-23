import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PlanService } from 'src/plan/plan.service';
import { SubscriptionService } from 'src/subscription/subscription.service';
import { ProductService } from 'src/product/product.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class HighlightProductsService {
  constructor(
    private readonly planService: PlanService,
    private readonly subscriptionService: SubscriptionService,
    private readonly productService: ProductService,
    private readonly usersService: UsersService
  ) { }

  async featuredProductsHome() {
    try {
      const namePlans = [
        "Plano médio mensal",
        "Plano avançado mensal",
        "Plano médio anual",
        "Plano avançado anual"
      ];

      const plans = await this.planService.getPlan();
      const plansToFeature = plans.filter(plan => namePlans.includes(plan.name));

      const subscriptionsArr = await Promise.all(
        plansToFeature.map(plan =>
          this.subscriptionService.getSubscriptionsActivateByIdPlan(plan.id)
        )
      );

      const idUsers = subscriptionsArr.flat().map(subscription => subscription.idUser);
      const users = await this.usersService.getUsersByIds(idUsers);

      const productsArr = await Promise.all(
        subscriptionsArr.map(subscriptions =>
          Promise.all(
            subscriptions.map(subscription =>
              this.productService.getProductsByIdUser(subscription.idUser)
            )
          )
        )
      );

      const result: Record<string, Record<string, any[]>> = {};

      plansToFeature.forEach((plan, planIndex) => {
        result[plan.name] = {};

        productsArr[planIndex].forEach(productList => {
          if (productList.length > 0) {
            const user = users.find(user => user.id === productList[0].idUser);
            if (user) {
              result[plan.name][user.name] = productList;
            }
          }
        });
      });

      return result;
    } catch (error) {
      console.error("An error ocurred while organized products for the home", error)
      throw new InternalServerErrorException("An error ocurred while organized products for the home")
    }
  }
}
