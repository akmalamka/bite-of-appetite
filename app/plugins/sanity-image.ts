import { defineNuxtPlugin, useSanity } from '#imports';
import { getFileAsset } from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';

export interface RequestSizeProps {
  height?: number;
  width?: number;
};

interface SanityImageUrlSource {
  asset?: {
    _ref: string;
  } | null;
}

export default defineNuxtPlugin(() => {
  const sanity = useSanity();
  const builder = imageUrlBuilder(sanity.client);

  function sanityImageUrlFor(
    source?: null | SanityImageUrlSource,
    size?: RequestSizeProps,
  ) {
    if (!source || !source.asset?._ref) {
      return;
    }

    let imageBuilder = builder.image(source).auto('format');

    if (size) {
      const { width, height } = size;
      if (width) {
        imageBuilder = imageBuilder.width(width);
      }
      if (height) {
        imageBuilder = imageBuilder.height(height);
      }
    }

    return imageBuilder.url();
  }

  function sanityBuildFileUrl(asset?: any) {
    if (!asset) {
      return;
    }

    return getFileAsset(asset, {
      dataset: sanity.client.config().dataset,
      projectId: sanity.client.config().projectId,
    }).url;
  }

  return {
    provide: {
      sanityImageUrlFor,
      sanityBuildFileUrl,
    },
  };
});
