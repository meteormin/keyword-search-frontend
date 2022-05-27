import { ApiClient, ApiResponse } from './ApiClient';
import { apiResponse } from '../helpers';
import { toCamel } from 'snake-camel';

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
          count += t.morphemes.length;
        });
      });
    }

    return count;
  }
}

export default BaikalNlp;
