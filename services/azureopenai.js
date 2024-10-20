const { AzureOpenAI } = require('openai');

// Load environment variables from .env
require('dotenv').config();

// Retrieve Azure OpenAI credentials from environment variables
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = "2024-08-01-preview";
const deployment = "gpt-4o-mini";

// Initialize the OpenAIClient
const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

async function main(prompt) { // accept prompt as a function parameter
    // Create the completion request using the passed prompt
    const result = await client.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt }, // use the prompt argument here
        ],
    });

    // Return the result's choices to the caller
    return result.choices.map(choice => choice.message.content.trim());
}

// Export the main function to be used elsewhere
module.exports = { main };