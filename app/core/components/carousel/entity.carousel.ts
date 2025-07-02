import type useEmblaCarousel from 'embla-carousel-vue';
import type {
  EmblaCarouselVueType,
} from 'embla-carousel-vue';
import type { UnwrapRef } from 'vue';

type CoreCarouselApi = EmblaCarouselVueType[1];
type UseCoreCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CoreCarouselOptions = UseCoreCarouselParameters[0];
type CoreCarouselPlugin = UseCoreCarouselParameters[1];

export type UnwrapRefCoreCarouselApi = UnwrapRef<CoreCarouselApi>;

export interface CoreCarouselProps {
  opts?: CoreCarouselOptions;
  plugins?: CoreCarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
}

export interface CoreCarouselEmits {
  (event: 'init-api', payload: UnwrapRefCoreCarouselApi): void;
}
