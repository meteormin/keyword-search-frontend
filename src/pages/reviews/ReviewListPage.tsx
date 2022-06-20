import React, { Fragment, useEffect, useState } from 'react';
import { arr, date, str } from '../../helpers';
import reviewModule from '../../store/features/reviews';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import DynamicTable, {
  DynamicSchema,
} from '../../components/common/DaynamicTable';
import Pagination from '../../components/common/Pagination';
import ReviewForm from '../../components/reviews/ReivewForm';
import Search from '../../components/reviews/Search';
import { ReviewList, ReviewListSchema } from './ReviewListSchema';
import { Review, ReviewStatus } from '../../utils/nia15/interfaces/reviews';
import searchModule from '../../store/features/search';
import SendQuestion from '../../components/questions/SendQuestion';
import { QuestionDiv } from '../../utils/nia15/interfaces/questions';
import StatusCount from '../../components/reviews/StatusCount';
import LimitFilter from '../../components/common/LimitFilter';

export interface Record extends ReviewList {
  _origin: Review;
}

const ReviewListPage = ({ seq }: { seq: number }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const { reviews, editReview, totalCount } = useSelector(
    reviewModule.getReviewState,
  );
  const [selectIds, setSelectIds] = useState<number[]>([]);

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

  const checkboxSchema = () => {
    let schema: DynamicSchema = ReviewListSchema;

    for (const [key, value] of Object.entries(schema)) {
      schema[key] = Object.assign({ onClick: handleClickRecord }, value);
    }

    if (seq == 2) {
      schema = Object.assign(
        {
          check: {
            name: (
              <Fragment>
                <span>전체</span>
                <Form.Check
                  type="checkbox"
                  onChange={(e) => {
                    // 전체 선택
                    if (e.target.checked) {
                      setSelectIds(reviews.map((r) => r.id));
                    }
                  }}
                />
              </Fragment>
            ),
          },
        },
        ReviewListSchema,
      );
    }

    return schema;
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

      let checkbox = {};
      if (seq == 2) {
        checkbox = (
          <Form.Check
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                const oldIds = selectIds;
                const newIds = selectIds;
                newIds.push(r.id);
                setSelectIds(arr.merge(oldIds, newIds, true));
              } else {
                setSelectIds(arr.remove(selectIds, r.id));
              }
            }}
          />
        );
      }

      const rs = {
        no: i + 1,
        refId: r.refId,
        concepts: str.limitArray(r.concepts.map((c) => c.stem) || [''], 6),
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

      return Object.assign({ check: checkbox }, rs);
    });
  };

  const checkReadOnly = (status?: ReviewStatus) => {
    if (seq == 2) {
      return status != ReviewStatus.PASS1;
    }

    return status != 'WAITING';
  };

  useEffect(() => {
    dispatch(
      searchModule.actions.search({
        page: page,
        limit: limit,
      }),
    );
    dispatch(
      reviewModule.actions.getReviewList({
        seq: seq,
      }),
    );
  }, [page, limit]);

  return (
    <Container>
      <Row className="mt-2 ms-2">
        <Search
          onSearch={() => {
            dispatch(
              reviewModule.actions.getReviewList({
                seq: seq,
              }),
            );
          }}
        />
        <StatusCount seq={seq} all={0} pass={0} reject={0} totalReject={0} />
      </Row>
      <Row className="mt-4">
        <Col md={6} className="mt-2"></Col>
        <Col md={6}>
          <Row>
            <Col lg={6}></Col>
            <Col lg={6}>
              <LimitFilter
                selectedValue={limit}
                onChange={(e) => {
                  const option = e.target.options[e.target.selectedIndex];
                  setLimit(parseInt(option.value));
                }}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className={'mt-4'}>
        <DynamicTable
          schema={checkboxSchema()}
          records={records()}
          // onClick={handleClickRecord}
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
          totalCount={totalCount}
          limit={limit}
          onClick={(page) => {
            setPage(page);
          }}
        />
        <Col lg={4} className="mt-5">
          <SendQuestion isReply={false} div={QuestionDiv.REVIEW} />
        </Col>
      </Row>
      <ReviewForm
        readOnly={checkReadOnly(editReview?.status || ReviewStatus.WAITING)}
        seq={seq}
        show={!!editReview}
        time={'--:--:--'}
        onCreate={() =>
          dispatch(reviewModule.actions.getReviewList({ seq: seq }))
        }
      />
    </Container>
  );
};

export default ReviewListPage;
