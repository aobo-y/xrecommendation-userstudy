const scenarios = [
  // case 0
  [
    {model: 'fMf'},
    {model: 'MFCT', random: false}
  ],

  // case 1
  [
    {model: 'MFCT', random: false},
    {model: 'fMf'}
  ],

  // case 2
  [
    {model: 'fMf'},
    {model: 'MFCT', random: true}
  ],

  // case 3
  [
    {model: 'MFCT', random: true},
    {model: 'fMf'}
  ],

  // case 4
  [
    {model: 'MFCT', random: false},
    {model: 'MFCT', random: true}
  ],

  // case 5
  [
    {model: 'MFCT', random: true},
    {model: 'MFCT', random: false}
  ],

  // case 6
  [
    {model: 'MFCT', random: false}
  ],

  // case 7
  [
    {model: 'MFCT', random: true}
  ],

  // case 8
  [
    {model: 'fMf'}
  ]
];

export default scenarios;
