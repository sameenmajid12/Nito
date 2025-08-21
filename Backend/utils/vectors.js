const axios = require("axios");

const getEmbeddings = async (tags) => {
  try {
    const response = await axios.post(
      process.env.EMBEDDING_LAMBDA_URL,
      { tags },
      { timeout: 30000 }
    );
    const { embeddings } = response.data;
    if (!embeddings || !embeddings.length) {
      throw new Error("No embeddings returned from Lambda");
    }
    console.log(`Generated ${embeddings.length} embeddings`);
    return embeddings;
  } catch (e) {
    console.error("Error generating embeddings:", e.message);
    return null;
  }
};

function computeAverageVector(vectorTags) {
  if (!vectorTags.length) return [];
  return vectorTags[0].embedding.map((_, i) =>
    vectorTags.reduce((sum, v) => sum + v.embedding[i], 0) / vectorTags.length
  );
}

module.exports = { getEmbeddings, computeAverageVector };
