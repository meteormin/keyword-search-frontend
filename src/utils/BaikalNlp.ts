import { ApiClient, ApiResponse } from './ApiClient';
import { apiResponse } from '../helpers';
import { toCamel } from 'snake-camel';
import { Concept } from '../store/features/tasks/taskAction';

export interface AnalyzeData {
  sentences: AnalyzeSentence[];
}

export interface AnalyzeSentence {
  text: AnalyzeText;
  tokens: AnalyzeToken[];
}

export interface AnalyzeText {
  content: string;
  beginOffset: number;
}

export interface AnalyzeToken {
  text: AnalyzeText;
  morphemes: Morphemes[];
  lemma: string;
  tagged: string;
}

export interface Morphemes {
  text: AnalyzeText;
  tag: string;
  probability: number;
  disambiguation: number;
  outOfVocab: string;
}

class BaikalNlp {
  private client: ApiClient;

  private readonly excludeTags = [
    'SF',
    'SP',
    'SS',
    'SE',
    'SO',
    'SW',
    'SL',
    'SH',
    'SN',
    'NA',
    'NF',
    'NV',
  ];

  constructor(client: ApiClient) {
    this.client = client;
  }

  public async analyze(sentence: string): Promise<AnalyzeData | null> {
    const response: ApiResponse = await this.client.post(
      'baikal-nlp/api/v1/analyze',
      {
        document: {
          content: sentence,
          language: 'ko-KR',
          encoding_type: 'UTF-8',
        },
      },
    );

    if (response.isSuccess) {
      return toCamel(apiResponse(response)) as AnalyzeData;
    }

    return null;
  }

  /**
   * @param {string} sentence
   * @return {Promise<number>}
   */
  public async getPosLength(sentence: string): Promise<number> {
    let count = 0;
    const analyzeData: AnalyzeData | null = await this.analyze(sentence);
    if (analyzeData) {
      analyzeData.sentences.forEach((item) => {
        item.tokens.forEach((t) => {
          const token = t.morphemes.filter((token) => {
            return !this.excludeTags.includes(token.tag);
          });

          count += token.length;
        });
      });
    }

    return count;
  }

  public async checkConcepts(concepts: Concept[], sentence: string) {
    const analyzeData: AnalyzeData | null = await this.analyze(sentence);
    let check = false;
    if (analyzeData) {
      let cnt = 0;
      const conceptStem = concepts.map((c) => c.stem);
      const conceptTags = concepts.map((c) => c.posttag);
      analyzeData.sentences.forEach((item) => {
        item.tokens.forEach((t) => {
          cnt += t.morphemes.filter((token) => {
            if (this.excludeTags.includes(token.tag)) {
              return false;
            }
            console.log(conceptTags, token.tag);
            console.log(conceptStem, token.text.content);
            return (
              conceptTags.includes(token.tag) &&
              conceptStem.includes(token.text.content)
            );
          }).length;
        });
        console.log(cnt);
        check = concepts.length == cnt;
      });
    }

    return check;
  }
}

export default BaikalNlp;
