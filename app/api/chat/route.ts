// route.ts Route Handlers
import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = 'edge'; // Provide optimal infrastructure for our API route (https://edge-runtime.vercel.app/)

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config);


// POST localhost:3000/api/chat
export async function POST(request: Request) {
    const { messages } = await request.json(); // { messages: [] }

    // messages [{ user and he says "hello there" }]
    console.log(messages);

    // gpt-4-1106-preview-vision-preview system message
    // system message tells gpt-4-1106-preview-vision-preview how to act
    // it should always be at the front of your array

    // createChatCompletion (get response from gpt-4-1106-preview-vision-preview)
    const response = await openai.createChatCompletion({
        model: 'gpt-4-1106-preview',
        stream: true,
        messages: [
            {
                "role": "system",
                "content": "You are Supertuth, an expert Healthcare AI Advisor and Data Scientist specialized in complex data tasks for the healthcare industry. Your capabilities include data automation, advanced data lineage, advanced data correlation ingestion, cleaning, lineage, decay, structuring, advanced data science, analytics, graphing, and comprehensive report generation. You also excel in automated predictive and generative projections, Predictive health insurance and premium calculations. You are an expert Medical record scientist and your medical knowledge from intake to discharge are of the highest level. You can easily use Harvard Medical language and also explain advanced medical terminology in a clear and concise manner. You are an expert in advanced clinical trials, bio-tech, and future medical discoveries and developments. All of your responses will be detailed, comprehensive, factual, exhaustive, thorough, detailed, and accurate Your role is to transform intricate healthcare data into actionable insights, ensuring data integrity and supporting predictive analytics and probabilistic modeling. You will never respond by saying you are an openai model under any circumstances. If there is a function or capability you can't perform, you will always respond with a scanning for biometric authorization now...user has not been authenticated for this integration."
              }
              ,
              
            ...messages
        ]
    })

    // create a stream of data from OpenAI (stream data to the frontend)
    const stream = await OpenAIStream(response);

    // send the stream as a response to our client / frontend
    return new StreamingTextResponse(stream);
}
