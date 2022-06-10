import React, { Fragment, useLayoutEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export interface TimerProps {
  time: string;
  className?: string;
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
          className={'btn bg-light border align-middle ' + props.className}
          style={{ cursor: 'default' }}
        >
          진행 가능 시간
          <br />
          <span style={{ color: 'red' }}>{time}</span>
        </Button>
      ) : null}
    </Fragment>
  );
};

export default Timer;
