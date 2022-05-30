import React, { useEffect, useState } from 'react';
import { date } from '../../helpers';
import reviewModule from '../../store/features/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Select from '../../components/common/Select';
import DynamicTable, {
  DynamicSchema,
} from '../../components/common/DaynamicTable';
import Pagination from '../../components/common/Pagination';
import ReviewForm from '../../components/reviews/ReivewForm';
import { SearchStats } from '../../components/reviews/Search';
import Search from '../../components/reviews/Search';
import { ReviewListSchema, ReviewList } from './ReviewListSchema';
import { Review } from '../../store/features/reviews/reviewAction';
import { str } from '../../helpers';

export interface Record extends ReviewList {
  _origin: Review;
}

const ReviewListPage = ({ seq }: { seq: number }) => {
  const dispatch = useDispatch();
  const [time, setTime] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [reviewStatus, setReviewStatus] = useState<string>('ALL');
  const [totalPage, setTotalPage] = useState(1);
  const { reviews, editReview, totalCount } = useSelector(
    reviewModule.getReviewState,
  );

  const limitOptions = [
    {
      name: '10개씩 보기',
      value: 10,
    },
    {
      name: '50개씩 보기',
      value: 50,
    },
    {
      name: '100개씩 보기',
      value: 100,
    },
  ];

  const schema: DynamicSchema = ReviewListSchema;
  const tempStats: SearchStats = {
    all: 100,
    pass: 100,
    reject: 100,
    totalReject: 100,
  };

  const records = (): Record[] => {
    return reviews.map((r, i): Record => {
      let reviewReason = '';
      if (r.reviewReasons) {
        reviewReason = r.reviewReasons
          .map((reason) => reason.toString())
          .join(', ');
      }
      let review1At = '';
      if (r.review1At) {
        review1At = date(r.review1At).format('YYYY.MM.DD');
      }
      let review2At = '';
      if (r.review2At) {
        review2At = date(r.review2At).format('YYYY.MM.DD');
      }
      return {
        no: i + 1,
        refId: r.refId,
        concepts: str.limit(
          r.concepts.map((c, i) => (i < 5 ? c.stem : '')).join(', '),
          50,
        ),
        posLength: r.posLength,
        sentenceCount: r.created1Length + '/' + r.created2Length,
        creatorId: r.creatorId,
        createdAt: date(r.createdAt).format('YYYY.MM.DD'),
        reviewState: r.reviewRsTxt || '',
        reviewReason: reviewReason,
        review1At: review1At,
        review1Id: r.reviewer1Id,
        review2At: review2At,
        review2Id: r.reviewer2Id,
        _origin: r,
      };
    });
  };

  const handleClickRecord = (record: Record) => {
    let reviewId = 0;
    if (seq == 1) {
      reviewId = record._origin.review1Id;
    }

    if (seq == 2) {
      reviewId = record._origin.review2Id;
    }

    dispatch(
      reviewModule.actions.getReview({
        seq: seq,
        id: reviewId,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      reviewModule.actions.getReviewList({
        seq: seq,
        limit: limit,
        page: page,
      }),
    );
  }, []);

  useEffect(() => {
    setTotalPage(Math.ceil(totalCount / limit));
  }, [totalCount]);

  return (
    <Container>
      <Row className="mt-2 ms-2">
        <Search
          seq={seq}
          stats={tempStats}
          onSearch={() => {
            dispatch(
              reviewModule.actions.getReviewList({
                seq: seq,
                limit: limit,
                page: page,
              }),
            );
          }}
        />
      </Row>
      <Row className="mt-4">
        <Col md={6} className="mt-2"></Col>
        <Col md={6}>
          <div className="float-end mb-2">
            <Select
              id="limit"
              name="limit"
              options={limitOptions}
              onChange={(e) => {
                setLimit(
                  parseInt(e.target.options[e.target.selectedIndex].value),
                );
              }}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <DynamicTable
          schema={schema}
          records={records()}
          onClick={handleClickRecord}
        />
      </Row>
      <Row className="mt-5 align-content-center">
        <Col lg={4} className="mt-5">
          <Button variant="dark" className="float-start mt-1">
            선택 다운로드
          </Button>
        </Col>
        <Pagination
          currentPage={page}
          totalPage={totalPage}
          onClick={(page) => {
            setPage(page);
          }}
        />
        <Col lg={4} className="mt-5">
          <Button variant="dark" className="float-end mt-1">
            <i className="fa-solid fa-paper-plane"></i>&nbsp; 문의사항 보내기
          </Button>
        </Col>
      </Row>
      <ReviewForm
        readOnly={editReview?.status != 'WAITING'}
        seq={seq}
        show={!!editReview}
        time={time?.toString() || '--:--:--'}
        onCreate={() => null}
      />
    </Container>
  );
};

export default ReviewListPage;
