import {
  useCallback, useEffect, useMemo, useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCurrentStep } from '../routes/utils';
import { useStoreDispatch, useStoreActions, useFlatSequence } from '../store/store';
import { WebsiteComponent } from '../parser/types';
import { PREFIX as BASE_PREFIX } from '../utils/Prefix';

const PREFIX = '@REVISIT_COMMS';

const iframeContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '73.5vh',
  overflow: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
};

const iframeStyle: React.CSSProperties = {
  position: 'absolute',
  width: '90%',
  height: '38.2rem',
};

export default function IframeController({ currentConfig }: { currentConfig: WebsiteComponent; }) {
  const { setIframeAnswers } = useStoreActions();
  const storeDispatch = useStoreDispatch();
  const dispatch = useDispatch();

  const ref = useRef<HTMLIFrameElement>(null);

  const iframeId = useMemo(() => (crypto.randomUUID ? crypto.randomUUID() : `testID-${Date.now()}`), []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const currentStep = useCurrentStep();
  const currentComponent = useFlatSequence()[currentStep];
  const navigate = useNavigate();

  const sendMessage = useCallback(
    (tag: string, message: unknown) => {
      ref.current?.contentWindow?.postMessage(
        {
          error: false,
          type: `${PREFIX}/${tag}`,
          iframeId,
          message,
        },
        '*',
      );
    },
    [ref, iframeId],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      const { data } = e;
      if (typeof data === 'object' && iframeId === data.iframeId) {
        switch (data.type) {
          case `${PREFIX}/READY`:
            if (ref.current && data.message && data.message.documentHeight) {
              ref.current.style.height = `${data.message.documentHeight}px`;
            }
            break;
          case `${PREFIX}/ANSWERS`:
            storeDispatch(setIframeAnswers(data.message.answer));
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, [storeDispatch, currentStep, dispatch, iframeId, navigate, currentConfig, sendMessage]);

  return (
    <div style={iframeContainerStyle}>
      <iframe
        ref={ref}
        src={`${BASE_PREFIX}${currentConfig.path}?trialid=${currentComponent}&id=${iframeId}`}
        style={iframeStyle}
        frameBorder="0"
      />
    </div>
  );
}
