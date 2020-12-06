import {PublicFacadeService} from '../../services/public-facade.service';

abstract class ComponentWithPublicData {
  protected constructor(public publicFacadeService: PublicFacadeService) {}
}


export { ComponentWithPublicData };
