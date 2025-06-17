export const IMAGE_ASSET_QUERY = `
  asset->{
    "dimensions": metadata.dimensions,
    "lqip": metadata.lqip,
    altText,
    "_ref": _id
  }
`;

export const PAGE_IMAGE_QUERY = `
  _type == 'heroImage' => {
    ...,
    image {
      ${IMAGE_ASSET_QUERY}
    }
  },
`;
