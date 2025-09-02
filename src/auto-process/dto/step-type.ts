interface Step {
  method: string;
  selector?: string;
  url?: string;
  value?: string;
  dynamicValue?: boolean;
  field?: string;
  ms?: number;
  apiName?: string;
  path?: string;
  text?: string;
  iframeSelector?: string;
  skip?: boolean;
  product?: string;
}

interface TempFile {
  productLeadId: string;
  quoteId: string;
  fileName: string;
  name: string;
}
