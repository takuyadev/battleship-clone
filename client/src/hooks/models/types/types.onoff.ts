import { OnOffEnum } from '../_index';

export type OnOffAction = {
  type: OnOffEnum.ON | OnOffEnum.OFF | OnOffEnum.FLIP;
};
