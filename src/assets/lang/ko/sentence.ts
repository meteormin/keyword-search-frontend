const sentence = {
  prototype: {
    subject: '원형 데이터',
    description:
      '제시된 개념 집합과 우리말 샘 사전을 활용 하여 2개의 문장을 만드세요.',
  },
  workSpace: {
    review: {
      subject: '문장 검수 하기',
      description:
        '개념집합과 문형을 모두 사용하여 국어의 맞춤법에 맞게 문장을 작성해 주세요. \n' +
        '생성된 2개의 문장은 동일해서는 안되고, 기본 문장과도 동일해서는 안됩니다. \n' +
        '문장은 평서형 ‘-다 종결 어미와 마침표로 종결되어야 합니다.',
    },
    work: {
      subject: '문장 생성 하기',
      description:
        '개념집합과 문형을 모두 사용하여 국어의 맞춤법에 맞게 문장을 작성해 주세요. \n' +
        '생성된 2개의 문장은 동일해서는 안되고, 기본 문장과도 동일해서는 안됩니다. \n' +
        '문장은 평서형 ‘-다 종결 어미와 마침표로 종결되어야 합니다.',
    },
    dictLink: 'https://opendict.korean.go.kr/main',
  },
  reviewState: {
    common: { wait: '검수대기', hold: '보류' },
    review1: {
      pass: '1차 승인',
      fail: '1차 반려',
      wait: '검수 대기',
    },
    review2: {
      pass: '2차 승인',
      fail: '2차 반려',
      wait: '검수 대기',
    },
  },
  createState: {
    wait: '생성대기',
    complete: '생성완료',
    temp: '작성중',
  },
};

export default sentence;
