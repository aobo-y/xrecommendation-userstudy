const surveys = {
  amazon: [
    '',
    '',
    '',
    '',
    '',
    ''
  ],
  yelp: [
    '',
    '',
    '',
    '',
    '',
    ''
  ]
}

export const getSurvey = (dataset, scenario) => {
  return surveys[dataset][scenario];
}

export default {
  getSurvey,
  surveys
};
