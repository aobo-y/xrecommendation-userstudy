const surveys = {
  amazon: [
    'http://koudaigou.net/web/formview/5c4881f3fc918f0bcc2c2f38',
    'http://yingkebao.top/web/formview/5c488213fc918f0bcc2c2f52',
    'http://yingkebao.top/web/formview/5c488215fc918f0bcc2c2f54',
    'http://yingkebao.top/web/formview/5c488217fc918f0bcc2c2f58',
    'http://yingkebao.top/web/formview/5c48821bfc918f0bcc2c2f5a',
    'http://koudaigou.net/web/formview/5c488228fc918f0bcc2c2f66'
  ],
  yelp: [
    'http://yingkebao.top/web/formview/5c486b28fc918f0bcc2c113d',
    'http://koudaigou.net/web/formview/5c488188fc918f0bcc2c2ecf',
    'http://koudaigou.net/web/formview/5c48818bfc918f0bcc2c2ed2',
    'http://koudaigou.net/web/formview/5c48818dfc918f0bcc2c2ed8',
    'http://yingkebao.top/web/formview/5c488190fc918f0bcc2c2eda',
    'http://yingkebao.top/web/formview/5c4881a2fc918f0bcc2c2eed'
  ]
}

export const getSurvey = (dataset, scenario) => {
  return surveys[dataset][scenario];
}

export default {
  getSurvey,
  surveys
};
