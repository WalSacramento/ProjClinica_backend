"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _routes = require('./routes');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

const app = _express2.default.call(void 0, )

app.use(_cors2.default.call(void 0, ))
app.use(_express2.default.json())
app.use(_routes.router)

app.listen(3030, () => console.log('🚀 Server listening on http://localhost:3030'))
