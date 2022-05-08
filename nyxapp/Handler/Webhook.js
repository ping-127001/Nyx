const fs = require("fs");
const axios = require("axios").default;

function SendWebhook(url, content)
{
    let msg =
    {
        "content": content
    };

    axios({
      url: url,
      data: JSON.stringify(msg),
      method: "POST",
      headers:
      {
        "Content-Type": "application/json"
      }
    });
}

module.exports =
{
    SendWebhook
}

