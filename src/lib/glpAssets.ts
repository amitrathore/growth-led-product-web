const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/growth-led-product-web";
const publicAsset = (path: string) => `${basePath}${path}`;

export const GLP_IMAGES = {
  logo: publicAsset("/images/glp/glp-logo.jpg"),
  image01: publicAsset("/images/glp/glp-img-01.jpg"),
  image02: publicAsset("/images/glp/glp-img-02.jpg"),
  image03: publicAsset("/images/glp/glp-img-03.jpg"),
  image04: publicAsset("/images/glp/glp-img-04.jpg"),
  article: publicAsset("/GLP-00-03.webp"),
} as const;
