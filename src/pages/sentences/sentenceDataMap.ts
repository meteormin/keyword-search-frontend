import { WorkData } from '../../components/common/WorkSpace';
import { Sentence } from '../../utils/nia15/interfaces/sentences';

export const sentenceToWorkData = (sentence: Sentence): WorkData => {
  const child1 = sentence?.edges?.sentence1;
  const child2 = sentence?.edges?.sentence2;
  return {
    textArea10: child1?.sentence || '',
    textArea11: child1?.sentencePatternedModified || '',
    textArea20: child2?.sentence || '',
    textArea21: child2?.sentencePatternedModified || '',
    wordCount1: child1?.sentenceCount || 0,
    wordCount2: child2?.sentenceCount || 0,
    origin: [child1?.sentencePatterned || '', child2?.sentencePatterned || ''],
  };
};
