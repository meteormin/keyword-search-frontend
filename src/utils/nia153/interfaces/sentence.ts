export interface Sentence {
  id: number;
  setsId: number;
  typeNo: string | number;
  sentence: string;
  sentenceCount: number;
  sentencePatterned: string;
  sentencePatternedModified: string;
  uuid: string;
}

export interface SentenceSets {
  id: number;
  masterId: number;
  genType: string;
  uuid: string;
}

export interface Concept {
  id: number;
  sentenceId: number;
  stem: string;
  postag: string;
  surface: string | null;
}

export interface SentenceMaster {
  id: number;
  dataId: string;
  groupId: number;
  sentence: string;
  sentenceCount: number;
  concepts: Concept[];
  sentenceSets: SentenceSets[];
  sentences: Sentence[];
}
