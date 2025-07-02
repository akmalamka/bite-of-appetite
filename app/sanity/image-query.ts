export const IMAGE_ASSET_QUERY = `
  asset->{
    "dimensions": metadata.dimensions,
    "lqip": metadata.lqip,
    altText,
    "_ref": _id
  }
`;
