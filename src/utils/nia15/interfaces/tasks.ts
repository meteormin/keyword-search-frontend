export interface Concept {
  stem: string;
  posttag: string;
}

export interface Task {
  id: number;
  dataId: string;
  sentence: string;
  posLength: number;
  tagged: string;
  refSrc: string;
  domain: string;
  refId: string;
  edges?: {
    concepts: Concept[];
  };
}
