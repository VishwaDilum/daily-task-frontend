import React, { useState, useEffect } from "react";

function Test() {
    const [count, setCount] = useState<number>(10);
    const [isSending, setIsSending] = useState<boolean>(false);

    useEffect(() => {
        if (isSending) {
            const intervalId = setInterval(() => {
                setCount(prevCount => {
                    if (prevCount <= 1) {
                        clearInterval(intervalId);
                        setIsSending(false);
                        return 10; // Reset count to 10
                    }
                    return prevCount - 1;
                });
            }, 1000);
            console.log("Hee "+intervalId)
        }
    }, [isSending]); // Add isSending to dependency array


    const handleSendOTP = () => {
        setIsSending(true);
    };

    return (
        <div>
            <button className="btn btn-primary" onClick={handleSendOTP} disabled={isSending}>
                {isSending ? `Sending OTP in ${count}s` : "Send OTP"}
            </button>
        </div>
    );
};

export default Test;
