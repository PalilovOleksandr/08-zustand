'use client';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <section>
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontSize: '16px',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '12px 16px',
            borderRadius: '6px',
            border: '1px solid transparent',
            color: '#d32f2f',
            backgroundColor: '#fdecea',
            borderColor: '#f5c2c0',
          }}
        >
          Could not fetch the list of notes. {error.message}
        </p>
        <button
          style={{
            alignSelf: 'flex-end',
            padding: '6px 12px',
            fontSize: '14px',
            color: '#fff',
            backgroundColor: '#dc3545',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
          }}
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </section>
  );
};

export default Error;
