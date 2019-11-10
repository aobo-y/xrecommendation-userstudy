const scenarios = [
  // case 0
  [
    {model: 'FMF'},
    {model: 'FacT', random: false}
  ],

  // case 1
  [
    {model: 'FacT', random: false},
    {model: 'FMF'}
  ],

  // case 2
  [
    {model: 'FMF'},
    {model: 'FacT', random: true}
  ],

  // case 3
  [
    {model: 'FacT', random: true},
    {model: 'FMF'}
  ],

  // case 4
  [
    {model: 'FacT', random: false},
    {model: 'FacT', random: true}
  ],

  // case 5
  [
    {model: 'FacT', random: true},
    {model: 'FacT', random: false}
  ],

  // case 6
  [
    {model: 'FacT', random: false}
  ],

  // case 7
  [
    {model: 'FacT', random: true}
  ],

  // case 8
  [
    {model: 'FMF'}
  ]
];

export default scenarios;
