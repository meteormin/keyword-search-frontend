import { WorkData } from '../../components/common/WorkSpace';
import { Sentence } from '../../store/features/sentence/sentenceAction';

export const sentenceToWorkData = (sentence: Sentence): WorkData => {
  return {
    textArea10: sentence?.sentence1 || '',
    textArea11: sentence?.sentence1PatternedModified || '',
    textArea20: sentence?.sentence2 || '',
    textArea21: sentence?.sentence2PatternedModified || '',
    wordCount1: sentence?.sentence1Count || 0,
    wordCount2: sentence?.sentence2Count || 0,
    origin: [
      sentence?.sentence1Patterned || '',
      sentence?.sentence2Patterned || '',
    ],
  };
};
