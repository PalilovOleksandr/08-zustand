'use client';

type Props = {
    error: Error;
    reset: () => void;
}

const Error = ({ error, reset }: Props) => {
    return (<>
        <p style={{
            fontSize: "16px",
            textAlign: "center",
            maxWidth: "600px",
            margin: "0 auto",
            padding: "12px 16px",
            borderRadius: "6px",
            border: "1px solid transparent",
            color: "#d32f2f",
            backgroundColor: "#fdecea",
            borderColor: "#f5c2c0",
        }}>Could not fetch note details. {error.message}</p>
        <button onClick={reset} style={{
            alignSelf: "flex-end",
            padding: "6px 12px",
            fontSize: "14px",
            color: "#fff",
            backgroundColor: "#dc3545",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
        }}>Try again</button>
    </>);
};

export default Error;