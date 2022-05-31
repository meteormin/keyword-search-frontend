import React, { Fragment, useLayoutEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export interface TimerProps {
  time: string;
}

const Timer = (props: TimerProps) => {
  const [time, setTime] = useState<string | null>();

  useLayoutEffect(() => {
    setTime(props.time);
  }, [props]);

  return (
    <Fragment>
      {time ? (
        <Button
          variant={'light'}
          className="btn bg-light border float-end w-50 align-middle"
          style={{ cursor: 'default' }}
        >
          진행 가능 시간
          <br />
          {time}
        </Button>
      ) : null}
    </Fragment>
  );
};

export default Timer;
