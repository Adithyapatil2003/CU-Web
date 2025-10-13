// svg.d.ts
declare module "*.svg" {
  import type * as React from "react";

  // The actual component returned when using the default import
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;

  // The default export is the component itself (common in modern setups)
  const src: React.FC<React.SVGProps<SVGSVGElement>>;
  export default src;
}
