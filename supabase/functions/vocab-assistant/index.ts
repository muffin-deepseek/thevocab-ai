
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { word, action } = await req.json();

    if (!word) {
      return new Response(
        JSON.stringify({ error: "Word is required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // This is a simple placeholder for future AI features
    // In a real implementation, this could connect to OpenAI, etc.
    let response;
    
    switch (action) {
      case "example":
        response = { 
          result: `Here's a custom example for the word "${word}": The student's diligent ${word} of vocabulary improved their GRE score.` 
        };
        break;
      case "synonym":
        response = { 
          result: `Some potential synonyms for "${word}" could include related terms from the same semantic field.` 
        };
        break;
      default:
        response = { 
          result: `You asked about the word "${word}". This is a placeholder for future AI-powered assistance.` 
        };
    }

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
