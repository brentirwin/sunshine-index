export { colorMap };

const colorMap = num => {
  const colors = ['99e6cc', // 0
                  'cce6cc', // 1
                  'cce600', // 2
                  'ffff00', // 3
                  'ffcc00', // 4
                  'ff9900', // 5
                  'ff6600', // 6
                  'ff0000', // 7
                  'cc0000', // 8
                  '990000', // 9
                  '660000', // 10
                  '660066', // 11
                  '990099'  // 12
                 ];
  return '#' + colors[num];
}
