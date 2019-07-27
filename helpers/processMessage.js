const API_AI_TOKEN = "b169430af63a460a827526af3b4ab80a";
const apiAiClient = require("apiai")(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN =
  "EAAegqLNuOMwBADLS7G4nlIprvFX0DS3v3AQbgmceP1o6P8Ksa9vfoQns9TlIZCeXrGNU2gVGU3dXWVZAIW77LD0uDOyUwZCk7HoigtYCGh0UfUeYl7InXuOBbJfcnmV8ZAKzSRLuOrdMISLalFVcz6PMsUjdcnKq1Hi0FW7izEuyOYXM2hZCv";
const request = require("request");
const sendTextMessage = (senderId, text) => {
  request({
    url: "https://graph.facebook.com/v2.6/me/messages",
    qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: "POST",
    json: {
      recipient: { id: senderId },
      message: { text }
    }
  });
};
module.exports = event => {
  console.log("replying");
  const senderId = event.sender.id;
  const message = event.message.text;
  const apiaiSession = apiAiClient.textRequest(message, {
    sessionId: "crowdbotics_bot"
  });
  apiaiSession.on("response", response => {
    const result = response.result.fulfillment.speech;
    sendTextMessage(senderId, result);
  });
  apiaiSession.on("error", error => console.log(error));
  apiaiSession.end();
};
