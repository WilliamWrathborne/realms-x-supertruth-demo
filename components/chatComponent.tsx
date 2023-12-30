"use client"
import React from "react";
import { useChat, Message } from "ai/react"

export default function ChatComponent() {
    const { input, handleInputChange, handleSubmit, isLoading, messages } = useChat();

    const chatBoxStyle: React.CSSProperties = { 
        backgroundImage: 'url("/images/supertruthvector.png")',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundBlendMode: 'luminosity',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
        color: 'black',
        border: '1px solid black',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        padding: '2px',
    };

    // Function to process and render message with bold text
    const renderMessageContent = (content: string) => {
        const parts = content.split(/(\*.*?\*)/g); // Splitting by asterisks
        return parts.map((part, index) => {
            // Check if the part is wrapped in asterisks
            if (part.startsWith("*") && part.endsWith("*")) {
                return <strong key={index}>{part.slice(1, -1)}</strong>; // Remove asterisks and render bold
            } else {
                return part; // Render normal text
            }
        });
    };

    return (
        <div style={chatBoxStyle}>
            <div style={{ position: 'relative' }}>
                {messages.map((message: Message) => (
                    <div key={message.id}>
                        <h3 className="text-xl font-semibold mt-2">
                            {message.role === "assistant" ? "REALMS" : "Supertruth User"}
                        </h3>

                        {message.content.split("\n").map((currentTextBlock, index) => (
                            currentTextBlock === ""
                                ? <p key={message.id + index}>&nbsp;</p>
                                : <p key={message.id + index}>{renderMessageContent(currentTextBlock)}</p>
                        ))}
                    </div>
                ))}
            </div>

            <form className="mt-12" onSubmit={handleSubmit}>
                <p>User Message</p>
                <textarea
                    className="mt-2 w-full"
                    placeholder={"Good Morning Supertruth User."}
                    style={{ border: '1px solid black', backgroundColor: 'transparent', padding: '0', fontSize: '1rem' }}
                    value={input}
                    onChange={handleInputChange}
                />
                <button
                    className="rounded-md mt-2"
                    style={{ border: '1px solid black', backgroundColor: 'transparent', padding: '0', fontSize: '1rem' }}>
                    Send message
                </button>
            </form>
        </div>
    );
}
