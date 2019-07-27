const processMessage = require("../helpers/processMessage");

// module.exports = (req, res) => {
//   if (req.body.object === "page") {
//     req.body.entry.forEach(entry => {
//       entry.messaging.forEach(event => {
//         if (event.message && event.message.text) {
//           processMessage(event);
//         }
//       });
//     });
//     res.status(200).end();
//   }
// };

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  console.log("new message webhook");
  if (req.body.object === "page") {
    req.body.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message && event.message.text) {
          processMessage(event);
        }
      });
    });
    res.status(200).end();
  }
});

module.exports = router;
