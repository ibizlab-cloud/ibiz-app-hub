module.exports = {
  roots: ['./test', './src'],
  testRegex: 'test/(.+)\\.test\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
